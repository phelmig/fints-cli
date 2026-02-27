import { CustomerMessage } from '../../lib/lib-fints/message.js';
import type { FinTSConfig } from '../../lib/lib-fints/config.js';
import { TanProcess } from '../../lib/lib-fints/codes.js';
import { HKTAN } from '../../lib/lib-fints/segments/HKTAN.js';
import { HKVPP } from './segments/HKVPP.js';
import { HKVPA } from './segments/HKVPA.js';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function parseHivppFromSegments(segments: any[]): { vopId?: string; pollingId?: string; waitForSeconds?: number } | undefined {
  for (const seg of segments) {
    if (seg.header?.segId === 'HIVPP') {
      return { vopId: seg.vopId, pollingId: seg.pollingId, waitForSeconds: seg.waitForSeconds };
    }
  }
  for (const seg of segments) {
    if (seg.originalId === 'HIVPP' && seg.rawData) {
      return parseHivppRaw(seg.rawData);
    }
  }
  return undefined;
}

function parseHivppRaw(raw: string): { vopId?: string; pollingId?: string; waitForSeconds?: number } {
  const parts = raw.split('+');
  const result: { vopId?: string; pollingId?: string; waitForSeconds?: number } = {};
  const extractBinary = (s: string): string | undefined => {
    if (!s) return undefined;
    const match = s.match(/^@(\d+)@(.+)$/s);
    return match ? match[2] : undefined;
  };
  if (parts.length > 0 && parts[0]) result.vopId = extractBinary(parts[0]);
  if (parts.length > 3 && parts[3]) result.pollingId = extractBinary(parts[3]);
  if (parts.length > 9 && parts[9]) result.waitForSeconds = parseInt(parts[9], 10);
  return result;
}

export function extractVopFromResponse(response: any, bankAnswers: any[]): { needsVop: boolean; hivpp?: any; scrollRef?: string } {
  const needsVop = bankAnswers.some((a: any) => a.code === 3945 || a.code === 9076);
  if (!needsVop) return { needsVop: false };

  const hivpp = parseHivppFromSegments(response.segments);
  const scrollRefParams = bankAnswers.find((a: any) => a.code === 3040)?.params;
  const scrollRef = Array.isArray(scrollRefParams) ? scrollRefParams[0] : scrollRefParams;
  return { needsVop: true, hivpp, scrollRef };
}

export interface VopFlowParams {
  dialog: any;
  config: FinTSConfig;
  initialHivpp: any;
  scrollRef?: string;
  vopDescriptor: string;
  orderSegId: string;
  createResubmissionSegment: () => any;
}

export async function executeVopFlow(params: VopFlowParams): Promise<any> {
  const { dialog, config, initialHivpp, vopDescriptor, createResubmissionSegment } = params;
  let pollingId = initialHivpp?.pollingId;
  let waitSeconds = initialHivpp?.waitForSeconds || 2;
  let vopId = initialHivpp?.vopId;
  let aufsetzpunkt = params.scrollRef;

  const maxPolls = 15;
  for (let i = 0; !vopId && i < maxPolls; i++) {
    await sleep(waitSeconds * 1000);
    process.stderr.write(`VoP check (${i + 1}/${maxPolls})...\n`);

    dialog.lastMessageNumber++;
    const msg = new CustomerMessage(dialog.dialogId, dialog.lastMessageNumber);
    if (config.userId && config.pin) {
      msg.sign(
        config.countryCode,
        config.bankId,
        config.userId,
        config.pin,
        (config as any).bankingInformation?.systemId,
        config.tanMethodId,
      );
    }

    const pollSeg: any = {
      header: { segId: HKVPP.Id, segNr: 0, version: HKVPP.Version },
      supportedReports: [vopDescriptor],
    };
    if (pollingId) pollSeg.pollingId = pollingId;
    if (aufsetzpunkt) pollSeg.aufsetzpunkt = aufsetzpunkt;
    msg.addSegment(pollSeg);

    const responseMessage = await dialog.httpClient.sendMessage(msg);
    const bankAnswers = responseMessage.getBankAnswers();

    if (bankAnswers.some((a: any) => a.code >= 9000)) {
      await endDialog(dialog, config);
      return {
        dialogId: dialog.dialogId,
        success: false,
        bankingInformationUpdated: false,
        bankAnswers,
        requiresTan: false,
      };
    }

    const hivpp = parseHivppFromSegments(responseMessage.segments);
    const newScrollRefP = bankAnswers.find((a: any) => a.code === 3040)?.params;
    const newScrollRef = Array.isArray(newScrollRefP) ? newScrollRefP[0] : newScrollRefP;
    if (newScrollRef) aufsetzpunkt = newScrollRef;

    if (hivpp?.vopId) {
      vopId = hivpp.vopId;
      process.stderr.write('VoP verified.\n');
    } else {
      if (hivpp?.pollingId) pollingId = hivpp.pollingId;
      if (hivpp?.waitForSeconds) waitSeconds = hivpp.waitForSeconds;
    }
  }

  if (!vopId) {
    await endDialog(dialog, config);
    return {
      dialogId: dialog.dialogId,
      success: false,
      bankingInformationUpdated: false,
      bankAnswers: [{ code: 9999, text: 'VoP polling timed out' }],
      requiresTan: false,
    };
  }

  // Resubmit payment + HKVPA with vopId
  process.stderr.write('Confirming payment with VoP...\n');
  dialog.lastMessageNumber++;
  const confirmMsg = new CustomerMessage(dialog.dialogId, dialog.lastMessageNumber);
  if (config.userId && config.pin) {
    confirmMsg.sign(
      config.countryCode,
      config.bankId,
      config.userId,
      config.pin,
      (config as any).bankingInformation?.systemId,
      config.tanMethodId,
    );
  }

  confirmMsg.addSegment(createResubmissionSegment());

  const vpaSeg = {
    header: { segId: HKVPA.Id, segNr: 0, version: HKVPA.Version },
    vopId,
  };
  confirmMsg.addSegment(vpaSeg);

  // Request TAN for the order
  const tanMethod = config.selectedTanMethod;
  if (config.userId && config.pin && tanMethod && tanMethod.version >= 6) {
    const hktan = {
      header: { segId: HKTAN.Id, segNr: 0, version: tanMethod.version ?? 0 },
      tanProcess: TanProcess.Process4,
      segId: params.orderSegId,
    };
    confirmMsg.addSegment(hktan);
  }

  const vpaResponse = await dialog.httpClient.sendMessage(confirmMsg);
  const vpaBankAnswers = vpaResponse.getBankAnswers();

  const hitan = vpaResponse.findSegment('HITAN');
  if (hitan) {
    return {
      dialogId: dialog.dialogId,
      success: true,
      bankingInformationUpdated: false,
      bankAnswers: vpaBankAnswers,
      requiresTan: true,
      tanReference: (hitan as any).orderReference,
      tanChallenge: (hitan as any).challenge || 'Please approve the transfer in your TAN app',
    };
  }

  await endDialog(dialog, config);

  return {
    dialogId: dialog.dialogId,
    success: vpaResponse.getHighestReturnCode() < 9000,
    bankingInformationUpdated: false,
    bankAnswers: vpaBankAnswers,
    requiresTan: false,
  };
}

export async function endDialog(dialog: any, config: FinTSConfig): Promise<void> {
  try {
    dialog.lastMessageNumber++;
    const endMsg = new CustomerMessage(dialog.dialogId, dialog.lastMessageNumber);
    if (config.userId && config.pin) {
      endMsg.sign(
        config.countryCode,
        config.bankId,
        config.userId,
        config.pin,
        (config as any).bankingInformation?.systemId,
        config.tanMethodId,
      );
    }
    const hkendSeg = {
      header: { segId: 'HKEND', segNr: 0, version: 1 },
      dialogId: dialog.dialogId,
    };
    endMsg.addSegment(hkendSeg);
    await dialog.httpClient.sendMessage(endMsg);
  } catch {
    // Best effort dialog close
  }
}
