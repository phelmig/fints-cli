import * as readline from 'node:readline';
import { ExtendedFinTSClient, FinTSConfig } from './fints-ext/client.js';

export interface BankOptions {
  blz: string;
  user: string;
  pin: string;
  url: string;
  productId: string;
}

export function formatError(err: unknown): Record<string, unknown> {
  if (!(err instanceof Error)) return { message: String(err) };

  const info: Record<string, unknown> = { message: err.message };
  if (err.stack) info.stack = err.stack;

  // Include Node.js system error properties (ECONNREFUSED, ENOTFOUND, etc.)
  const sysErr = err as any;
  if (sysErr.code) info.code = sysErr.code;
  if (sysErr.syscall) info.syscall = sysErr.syscall;
  if (sysErr.hostname) info.hostname = sysErr.hostname;
  if (sysErr.address) info.address = sysErr.address;
  if (sysErr.port) info.port = sysErr.port;
  if (sysErr.errno) info.errno = sysErr.errno;

  // Unwrap cause chain (fetch errors nest the real error in .cause)
  if (sysErr.cause) {
    info.cause = formatError(sysErr.cause);
  }

  return info;
}

export function logError(message: string, details?: Record<string, unknown>): void {
  const err: Record<string, unknown> = { error: message, ...details };
  process.stderr.write(JSON.stringify(err, null, 2) + '\n');
}

export function promptTan(challenge: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stderr,
    });
    process.stderr.write(`\nTAN Challenge: ${challenge}\n`);
    rl.question('Enter TAN: ', (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

export async function connectAndSync(opts: BankOptions): Promise<{
  client: ExtendedFinTSClient;
  config: FinTSConfig;
  accounts: any[];
}> {
  process.stderr.write('Connecting to bank...\n');
  const config = FinTSConfig.forFirstTimeUse(
    opts.productId,
    '1.0',
    opts.url,
    opts.blz,
    opts.user,
    opts.pin,
  );
  config.debugEnabled = !!process.env.FINTS_DEBUG;

  const client = new ExtendedFinTSClient(config);

  let syncResponse = await client.synchronize();
  if (!syncResponse.success) {
    logError('Initial synchronization failed', {
      bankAnswers: syncResponse.bankAnswers,
    });
    process.exit(1);
  }

  // Select first available TAN method
  const tanMethods = config.availableTanMethods;
  if (tanMethods.length === 0) {
    logError('No TAN methods available');
    process.exit(1);
  }
  const tanMethod = client.selectTanMethod(tanMethods[0].id);
  process.stderr.write(`Using TAN method: ${tanMethod.name}\n`);

  // If TAN media is required, select first available
  if (tanMethod.activeTanMedia && tanMethod.activeTanMedia.length > 0) {
    client.selectTanMedia(tanMethod.activeTanMedia[0]);
  }

  // Synchronize again to get accounts (UPD)
  syncResponse = await client.synchronize();
  if (syncResponse.requiresTan) {
    const tan = await promptTan(syncResponse.tanChallenge || 'Please approve in your TAN app');
    syncResponse = await client.synchronizeWithTan(syncResponse.tanReference!, tan);
  }
  if (!syncResponse.success) {
    logError('Second synchronization failed', {
      bankAnswers: syncResponse.bankAnswers,
    });
    process.exit(1);
  }

  const accounts = config.bankingInformation.upd?.bankAccounts ?? [];
  if (accounts.length === 0) {
    logError('No bank accounts found in UPD');
    process.exit(1);
  }

  return { client, config, accounts };
}
