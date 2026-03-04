import { connectAndSync, logError, promptTan, type BankOptions } from './connection.js';

export interface StatementsOptions extends BankOptions {
  account?: string;
  from?: string;
  to?: string;
}

export async function getStatements(opts: StatementsOptions): Promise<void> {
  const { client, accounts } = await connectAndSync(opts);

  // Find account by IBAN or account number, or use first
  let account;
  if (opts.account) {
    const needle = opts.account.replace(/\s/g, '').toUpperCase();
    account = accounts.find(
      (a: any) => a.iban === needle || a.accountNumber === needle,
    );
    if (!account) {
      logError(`Account ${needle} not found`, {
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

  const isCreditCard = client.canGetCreditCardStatements(account.accountNumber);
  const isRegular = client.canGetAccountStatements(account.accountNumber);
  // Prefer DKKKU for credit card accounts even if HKCAZ/HKKAZ is also advertised
  const useCreditCardPath = isCreditCard && account.accountType === 'CreditCardAccount';

  if (!isRegular && !isCreditCard) {
    logError('Account statements not supported for this account');
    process.exit(1);
  }

  process.stderr.write(
    `Fetching ${useCreditCardPath ? 'credit card ' : ''}statements for ${account.iban || account.accountNumber}...\n`,
  );

  const from = opts.from ? new Date(opts.from) : undefined;
  const to = opts.to ? new Date(opts.to) : undefined;

  if (useCreditCardPath) {
    // Credit card account — use DKKKU/DIKKU
    let response = await client.getCreditCardStatements(account.accountNumber, from);

    if (response.requiresTan) {
      const tan = await promptTan(
        response.tanChallenge || 'Please approve in your TAN app',
      );
      response = await client.getCreditCardStatementsWithTan(
        response.tanReference!,
        tan,
      );
    }

    if (!response.success) {
      logError('Failed to fetch credit card statements', {
        bankAnswers: response.bankAnswers,
      });
      process.exit(1);
    }

    const transactions = (response.statements ?? []).map((tx: any) => ({
      date: tx.valueDate || tx.transactionDate || null,
      amount: tx.amount || null,
      currency: tx.currency || null,
      purpose: tx.purpose || null,
      originalAmount: tx.originalAmount || null,
      originalCurrency: tx.originalCurrency || null,
      exchangeRate: tx.exchangeRate !== 1 ? tx.exchangeRate : undefined,
    }));

    process.stdout.write(JSON.stringify(transactions, null, 2) + '\n');
  } else {
    // Regular account — use HKKAZ/HKCAZ
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
}
