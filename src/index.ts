#!/usr/bin/env node

import 'dotenv/config';
import { Command } from 'commander';
import { executeTransfer } from './transfer.js';
import { listAccounts } from './accounts.js';
import { getStatements } from './statements.js';
import { formatError, type BankOptions } from './connection.js';

const program = new Command();

program
  .name('fints-cli')
  .description('FinTS 3.0 banking CLI')
  .version('1.0.0');

function getBankOptions(): BankOptions {
  const blz = process.env.FVB_BLZ;
  const user = process.env.FVB_USER;
  const pin = process.env.FVB_PIN;
  const url = process.env.FVB_URL;
  const productId = process.env.FVB_PRODUCT_ID;

  const missing = [];
  if (!blz) missing.push('FVB_BLZ');
  if (!user) missing.push('FVB_USER');
  if (!pin) missing.push('FVB_PIN');
  if (!url) missing.push('FVB_URL');
  if (!productId) missing.push('FVB_PRODUCT_ID');

  if (missing.length > 0) {
    process.stderr.write(
      JSON.stringify({
        error: `Missing environment variables: ${missing.join(', ')}`,
      }) + '\n',
    );
    process.exit(1);
  }

  return { blz: blz!, user: user!, pin: pin!, url: url!, productId: productId! };
}

function handleError(err: any): never {
  const detail = formatError(err);
  process.stderr.write(JSON.stringify({ error: detail }, null, 2) + '\n');
  process.exit(1);
}

program
  .command('transfer')
  .description('SEPA credit transfer')
  .requiredOption('--recipient <name>', 'Recipient name')
  .requiredOption('--iban <iban>', 'Recipient IBAN')
  .option('--bic <bic>', 'Recipient BIC (optional, resolved by bank)')
  .requiredOption('--amount <amount>', 'Amount in EUR (e.g. 12.50)')
  .option('--purpose <text>', 'Payment purpose / reference')
  .option('--source-iban <iban>', 'Source account IBAN (default: first account)')
  .option('--instant', 'Use SEPA Instant Payment (Echtzeitüberweisung)')
  .action(async (opts) => {
    const bank = getBankOptions();
    await executeTransfer({
      ...bank,
      recipient: opts.recipient,
      iban: opts.iban,
      bic: opts.bic,
      amount: opts.amount,
      purpose: opts.purpose,
      sourceIban: opts.sourceIban,
      instant: opts.instant,
    });
  });

program
  .command('accounts')
  .description('List accounts and balances')
  .action(async () => {
    const bank = getBankOptions();
    await listAccounts(bank);
  });

program
  .command('statements')
  .description('Get account statements / transactions')
  .option('--account <iban>', 'Account IBAN (default: first account)')
  .option('--from <date>', 'Start date (YYYY-MM-DD)')
  .option('--to <date>', 'End date (YYYY-MM-DD)')
  .action(async (opts) => {
    const bank = getBankOptions();
    await getStatements({
      ...bank,
      account: opts.account,
      from: opts.from,
      to: opts.to,
    });
  });

program.parseAsync().catch(handleError);
