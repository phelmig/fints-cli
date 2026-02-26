import { connectAndSync, logError, promptTan, type BankOptions } from './connection.js';

export async function listAccounts(opts: BankOptions): Promise<void> {
  const { client, accounts } = await connectAndSync(opts);

  const results: any[] = [];

  for (const acct of accounts) {
    const entry: any = {
      accountNumber: acct.accountNumber,
      iban: acct.iban || null,
      bic: acct.bic || null,
      type: acct.accountType || null,
      holder: acct.accountHolder || null,
    };

    if (client.canGetAccountBalance(acct.accountNumber)) {
      let balanceResponse = await client.getAccountBalance(acct.accountNumber);

      if (balanceResponse.requiresTan) {
        const tan = await promptTan(
          balanceResponse.tanChallenge || 'Please approve in your TAN app',
        );
        balanceResponse = await client.getAccountBalanceWithTan(
          balanceResponse.tanReference!,
          tan,
        );
      }

      if (balanceResponse.success && balanceResponse.balance) {
        entry.currency = balanceResponse.balance.currency || 'EUR';
        entry.balance = balanceResponse.balance.balance;
      }
    }

    results.push(entry);
  }

  process.stdout.write(JSON.stringify(results, null, 2) + '\n');
}
