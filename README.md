# fints-cli

[![npm version](https://img.shields.io/npm/v/@phelmig/fints-cli.svg)](https://www.npmjs.com/package/@phelmig/fints-cli)

CLI for German online banking via FinTS 3.0. Supports SEPA transfers, account listing, and statement retrieval.

## Installation

```bash
npm install -g @phelmig/fints-cli
```

Then create a `.env` file (or export the variables) with your bank credentials — see below.

### From source

```bash
git clone https://github.com/phelmig/fints-cli.git
cd fints-cli
npm install
cp .env.example .env   # fill in your bank credentials
npm run build
```

### Environment variables

| Variable | Description |
|---|---|
| `FVB_BLZ` | Bank code (Bankleitzahl) |
| `FVB_USER` | Online banking user ID |
| `FVB_PIN` | Online banking PIN |
| `FVB_URL` | FinTS/HBCI endpoint URL |
| `FVB_PRODUCT_ID` | FinTS product registration ID |
| `FINTS_DEBUG` | Set to `1` for verbose debug output (optional) |

## Usage

### List accounts and balances

```bash
fints-cli accounts
```

Outputs JSON array with account numbers, IBANs, and balances.

### Get account statements

```bash
fints-cli statements [--account <iban>] [--from YYYY-MM-DD] [--to YYYY-MM-DD]
```

Options:
- `--account` — filter by IBAN (default: first account)
- `--from` / `--to` — date range

Outputs JSON array of transactions.

### SEPA credit transfer

```bash
fints-cli transfer --recipient "Max Mustermann" --iban DE89370400440532013000 --amount 12.50 [--bic COBADEFFXXX] [--purpose "Invoice 123"] [--source-iban DE...] [--instant]
```

Options:
- `--recipient` — recipient name (required)
- `--iban` — recipient IBAN (required)
- `--amount` — amount in EUR (required)
- `--bic` — recipient BIC (optional, resolved by bank)
- `--purpose` — payment reference (optional)
- `--source-iban` — source account IBAN (default: first account)
- `--instant` — use SEPA Instant Payment (Echtzeitüberweisung) via HKIPZ

Both regular (HKCCS) and instant (HKIPZ) transfers support Verification of Payee (VoP/Namensabgleich). The VoP flow is handled automatically: the CLI polls for name verification and resubmits the payment once confirmed.

## TAN handling

All commands that require a TAN will prompt interactively on stderr. Status messages go to stderr, data output goes to stdout — so you can pipe the JSON output safely.

## Acknowledgements

Built on [lib-fints](https://github.com/robocode13/lib-fints) by robocode13 — a TypeScript FinTS 3.0 client library.

## License

LGPL-2.1 — see [LICENSE](LICENSE).
