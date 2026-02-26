import { connectAndSync, logError, promptTan, type BankOptions } from './connection.js';
import { generatePain001 } from './pain001.js';
import { validateIBAN } from './iban.js';
import type { CreditTransferResponse } from './fints-ext/interaction.js';

export interface TransferOptions extends BankOptions {
  recipient: string;
  iban: string;
  bic?: string;
  amount: string;
  purpose?: string;
  sourceIban?: string;
}

export async function executeTransfer(opts: TransferOptions): Promise<void> {
  // Validate recipient IBAN
  const ibanResult = validateIBAN(opts.iban);
  if (!ibanResult.valid) {
    logError(`Invalid recipient IBAN: ${ibanResult.error}`);
    process.exit(1);
  }

  // Validate source IBAN if provided
  if (opts.sourceIban) {
    const srcResult = validateIBAN(opts.sourceIban);
    if (!srcResult.valid) {
      logError(`Invalid source IBAN: ${srcResult.error}`);
      process.exit(1);
    }
  }

  // Validate amount
  const amountNum = parseFloat(opts.amount);
  if (isNaN(amountNum) || amountNum <= 0) {
    logError('Amount must be a positive number');
    process.exit(1);
  }
  const amount = amountNum.toFixed(2);

  const { client, accounts } = await connectAndSync(opts);

  // Find source account
  let sourceAccount;
  if (opts.sourceIban) {
    const sourceIbanClean = opts.sourceIban.replace(/\s/g, '').toUpperCase();
    sourceAccount = accounts.find((a: any) => a.iban === sourceIbanClean);
    if (!sourceAccount) {
      logError(`Source account with IBAN ${sourceIbanClean} not found`, {
        availableAccounts: accounts.map((a: any) => ({
          accountNumber: a.accountNumber,
          iban: a.iban,
        })),
      });
      process.exit(1);
    }
  } else {
    sourceAccount = accounts[0];
  }

  process.stderr.write(
    `Source account: ${sourceAccount.iban || sourceAccount.accountNumber}\n`,
  );

  // Build pain.001 XML
  const messageId = `MSG-${Date.now()}`;
  const painXml = generatePain001({
    messageId,
    debtorName: opts.user,
    debtorIBAN: sourceAccount.iban || opts.sourceIban!,
    debtorBIC: sourceAccount.bic || '',
    creditorName: opts.recipient,
    creditorIBAN: opts.iban.replace(/\s/g, '').toUpperCase(),
    creditorBIC: opts.bic,
    amount,
    purpose: opts.purpose,
  });

  // Initiate credit transfer
  process.stderr.write(
    `Initiating transfer of ${amount} EUR to ${opts.recipient}...\n`,
  );

  let transferResponse: CreditTransferResponse;
  transferResponse = await client.initiateCreditTransfer(
    sourceAccount.accountNumber,
    painXml,
  );

  // Handle TAN if required
  if (transferResponse.requiresTan) {
    const tan = await promptTan(
      transferResponse.tanChallenge || 'Please approve the transfer in your TAN app',
    );
    transferResponse = await client.initiateCreditTransferWithTan(
      transferResponse.tanReference!,
      tan,
    );
  }

  // Output result
  if (transferResponse.success) {
    const result = {
      status: 'OK',
      jobReference: transferResponse.jobReference,
      bankAnswers: transferResponse.bankAnswers,
    };
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
  } else {
    logError('Transfer failed', {
      bankAnswers: transferResponse.bankAnswers,
    });
    process.exit(1);
  }
}
