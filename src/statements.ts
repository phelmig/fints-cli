import { connectAndSync, logError, promptTan, type BankOptions } from './connection.js';

export interface StatementsOptions extends BankOptions {
  account?: string;
  from?: string;
  to?: string;
}

export async function getStatements(opts: StatementsOptions): Promise<void> {
  const { client, accounts } = await connectAndSync(opts);

  // Find account by IBAN or use first
  let account;
  if (opts.account) {
    const ibanClean = opts.account.replace(/\s/g, '').toUpperCase();
    account = accounts.find((a: any) => a.iban === ibanClean);
    if (!account) {
      logError(`Account with IBAN ${ibanClean} not found`, {
        availableAccounts: accounts.map((a: any) => ({
          accountNumber: a.accountNumber,
          iban: a.iban,
        })),
      });
      process.exit(1);
    }
  } else {
    account = accounts[0];
  }

  process.stderr.write(
    `Fetching statements for ${account.iban || account.accountNumber}...\n`,
  );

  if (!client.canGetAccountStatements(account.accountNumber)) {
    logError('Account statements not supported for this account');
    process.exit(1);
  }

  const from = opts.from ? new Date(opts.from) : undefined;
  const to = opts.to ? new Date(opts.to) : undefined;

  let response = await client.getAccountStatements(account.accountNumber, from, to);

  if (response.requiresTan) {
    const tan = await promptTan(
      response.tanChallenge || 'Please approve in your TAN app',
    );
    response = await client.getAccountStatementsWithTan(
      response.tanReference!,
      tan,
    );
  }

  if (!response.success) {
    logError('Failed to fetch statements', {
      bankAnswers: response.bankAnswers,
    });
    process.exit(1);
  }

  const transactions = (response.statements ?? []).flatMap((stmt: any) =>
    (stmt.transactions ?? []).map((tx: any) => ({
      date: tx.valueDate || tx.bookingDate || null,
      amount: tx.amount || null,
      remoteName: tx.remoteName || null,
      purpose: tx.purpose || null,
      remoteIban: tx.remoteIban || null,
      bookingText: tx.bookingText || null,
    })),
  );

  process.stdout.write(JSON.stringify(transactions, null, 2) + '\n');
}
