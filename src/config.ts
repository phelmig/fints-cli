import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { createInterface } from 'node:readline/promises';
import dotenv from 'dotenv';

export function getConfigPath(): string {
  const base = process.env.XDG_CONFIG_HOME || join(homedir(), '.config');
  return join(base, 'fints-cli', 'config.env');
}

export function loadConfig(): void {
  const path = getConfigPath();
  if (existsSync(path)) {
    dotenv.config({ path });
  }
}

const CONFIG_KEYS = [
  { key: 'FVB_BLZ', label: 'Bank code (BLZ)', default: '50190000' },
  { key: 'FVB_USER', label: 'Online banking user ID' },
  { key: 'FVB_PIN', label: 'Online banking PIN' },
  { key: 'FVB_URL', label: 'FinTS endpoint URL', default: 'https://hbci11.fiducia.de/cgi-bin/hbciservlet' },
  { key: 'FVB_PRODUCT_ID', label: 'FinTS product ID', default: '9FA6681DEC0CF3046BFC2F8A6' },
] as const;

export async function initConfig(): Promise<void> {
  const rl = createInterface({ input: process.stdin, output: process.stderr });
  const values: Record<string, string> = {};

  try {
    process.stderr.write('fints-cli configuration\n\n');
    for (const entry of CONFIG_KEYS) {
      const def = 'default' in entry ? entry.default : undefined;
      const prompt = def ? `${entry.label} [${def}]: ` : `${entry.label}: `;
      const answer = await rl.question(prompt);
      values[entry.key] = answer || (def ?? '');
    }
  } finally {
    rl.close();
  }

  const missing = CONFIG_KEYS.filter(k => !('default' in k) && !values[k.key]);
  if (missing.length > 0) {
    process.stderr.write(`\nMissing required values: ${missing.map(k => k.label).join(', ')}\n`);
    process.exit(1);
  }

  const configPath = getConfigPath();
  const configDir = join(configPath, '..');
  mkdirSync(configDir, { recursive: true, mode: 0o700 });

  const content = CONFIG_KEYS.map(({ key }) => `${key}=${values[key]}`).join('\n') + '\n';
  writeFileSync(configPath, content, { mode: 0o600 });

  process.stderr.write(`\nConfig written to ${configPath}\n`);
}
