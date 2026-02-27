export interface TransferParams {
  messageId: string;
  debtorName: string;
  debtorIBAN: string;
  debtorBIC: string;
  creditorName: string;
  creditorIBAN: string;
  creditorBIC?: string;
  amount: string; // e.g. "12.50"
  currency?: string;
  purpose?: string;
  endToEndId?: string;
  executionDate?: string; // YYYY-MM-DD
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generates pain.001.001.09 XML for SEPA Instant Payments (HKIPZ).
 */
export function generatePain001Instant(params: TransferParams): string {
  const now = new Date();
  const creationDateTime = now.toISOString().replace(/\.\d{3}Z$/, '');
  const msgId = params.messageId;
  const pmtInfId = `PMT-${msgId}`;
  const e2eId = params.endToEndId || 'NOTPROVIDED';
  const currency = params.currency || 'EUR';
  const execDate = params.executionDate || '1999-01-01';

  const creditorBicBlock = params.creditorBIC
    ? `
          <CdtrAgt>
            <FinInstnId>
              <BICFI>${escapeXml(params.creditorBIC)}</BICFI>
            </FinInstnId>
          </CdtrAgt>`
    : '';

  const debtorBicBlock = params.debtorBIC
    ? `
      <DbtrAgt>
        <FinInstnId>
          <BICFI>${escapeXml(params.debtorBIC)}</BICFI>
        </FinInstnId>
      </DbtrAgt>`
    : `
      <DbtrAgt>
        <FinInstnId>
          <Othr>
            <Id>NOTPROVIDED</Id>
          </Othr>
        </FinInstnId>
      </DbtrAgt>`;

  const purposeBlock = params.purpose
    ? `
          <RmtInf>
            <Ustrd>${escapeXml(params.purpose)}</Ustrd>
          </RmtInf>`
    : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.09" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:iso:std:iso:20022:tech:xsd:pain.001.001.09 pain.001.001.09.xsd">
  <CstmrCdtTrfInitn>
    <GrpHdr>
      <MsgId>${escapeXml(msgId)}</MsgId>
      <CreDtTm>${creationDateTime}</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <CtrlSum>${params.amount}</CtrlSum>
      <InitgPty>
        <Nm>${escapeXml(params.debtorName)}</Nm>
      </InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>${escapeXml(pmtInfId)}</PmtInfId>
      <PmtMtd>TRF</PmtMtd>
      <BtchBookg>false</BtchBookg>
      <NbOfTxs>1</NbOfTxs>
      <CtrlSum>${params.amount}</CtrlSum>
      <PmtTpInf>
        <SvcLvl>
          <Cd>SEPA</Cd>
        </SvcLvl>
        <LclInstrm>
          <Cd>INST</Cd>
        </LclInstrm>
      </PmtTpInf>
      <ReqdExctnDt>
        <Dt>${execDate}</Dt>
      </ReqdExctnDt>
      <Dbtr>
        <Nm>${escapeXml(params.debtorName)}</Nm>
      </Dbtr>
      <DbtrAcct>
        <Id>
          <IBAN>${escapeXml(params.debtorIBAN)}</IBAN>
        </Id>
      </DbtrAcct>${debtorBicBlock}
      <ChrgBr>SLEV</ChrgBr>
      <CdtTrfTxInf>
        <PmtId>
          <EndToEndId>${escapeXml(e2eId)}</EndToEndId>
        </PmtId>
        <Amt>
          <InstdAmt Ccy="${escapeXml(currency)}">${params.amount}</InstdAmt>
        </Amt>${creditorBicBlock}
        <Cdtr>
          <Nm>${escapeXml(params.creditorName)}</Nm>
        </Cdtr>
        <CdtrAcct>
          <Id>
            <IBAN>${escapeXml(params.creditorIBAN)}</IBAN>
          </Id>
        </CdtrAcct>${purposeBlock}
      </CdtTrfTxInf>
    </PmtInf>
  </CstmrCdtTrfInitn>
</Document>`;
}

export function generatePain001(params: TransferParams): string {
  const now = new Date();
  const creationDateTime = now.toISOString().replace(/\.\d{3}Z$/, '');
  const msgId = params.messageId;
  const pmtInfId = `PMT-${msgId}`;
  const e2eId = params.endToEndId || 'NOTPROVIDED';
  const currency = params.currency || 'EUR';
  const execDate = params.executionDate || '1999-01-01';

  const creditorBicBlock = params.creditorBIC
    ? `
          <CdtrAgt>
            <FinInstnId>
              <BICFI>${escapeXml(params.creditorBIC)}</BICFI>
            </FinInstnId>
          </CdtrAgt>`
    : '';

  const debtorBicBlock = params.debtorBIC
    ? `
      <DbtrAgt>
        <FinInstnId>
          <BICFI>${escapeXml(params.debtorBIC)}</BICFI>
        </FinInstnId>
      </DbtrAgt>`
    : `
      <DbtrAgt>
        <FinInstnId>
          <Othr>
            <Id>NOTPROVIDED</Id>
          </Othr>
        </FinInstnId>
      </DbtrAgt>`;

  const purposeBlock = params.purpose
    ? `
          <RmtInf>
            <Ustrd>${escapeXml(params.purpose)}</Ustrd>
          </RmtInf>`
    : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.09" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:iso:std:iso:20022:tech:xsd:pain.001.001.09 pain.001.001.09.xsd">
  <CstmrCdtTrfInitn>
    <GrpHdr>
      <MsgId>${escapeXml(msgId)}</MsgId>
      <CreDtTm>${creationDateTime}</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <CtrlSum>${params.amount}</CtrlSum>
      <InitgPty>
        <Nm>${escapeXml(params.debtorName)}</Nm>
      </InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>${escapeXml(pmtInfId)}</PmtInfId>
      <PmtMtd>TRF</PmtMtd>
      <BtchBookg>false</BtchBookg>
      <NbOfTxs>1</NbOfTxs>
      <CtrlSum>${params.amount}</CtrlSum>
      <PmtTpInf>
        <SvcLvl>
          <Cd>SEPA</Cd>
        </SvcLvl>
      </PmtTpInf>
      <ReqdExctnDt>
        <Dt>${execDate}</Dt>
      </ReqdExctnDt>
      <Dbtr>
        <Nm>${escapeXml(params.debtorName)}</Nm>
      </Dbtr>
      <DbtrAcct>
        <Id>
          <IBAN>${escapeXml(params.debtorIBAN)}</IBAN>
        </Id>
      </DbtrAcct>${debtorBicBlock}
      <ChrgBr>SLEV</ChrgBr>
      <CdtTrfTxInf>
        <PmtId>
          <EndToEndId>${escapeXml(e2eId)}</EndToEndId>
        </PmtId>
        <Amt>
          <InstdAmt Ccy="${escapeXml(currency)}">${params.amount}</InstdAmt>
        </Amt>${creditorBicBlock}
        <Cdtr>
          <Nm>${escapeXml(params.creditorName)}</Nm>
        </Cdtr>
        <CdtrAcct>
          <Id>
            <IBAN>${escapeXml(params.creditorIBAN)}</IBAN>
          </Id>
        </CdtrAcct>${purposeBlock}
      </CdtTrfTxInf>
    </PmtInf>
  </CstmrCdtTrfInitn>
</Document>`;
}
