export function validateIBAN(iban: string): { valid: boolean; error?: string } {
  const cleaned = iban.replace(/\s/g, '').toUpperCase();

  if (!/^DE\d{20}$/.test(cleaned)) {
    return { valid: false, error: 'IBAN must be DE followed by 20 digits' };
  }

  // ISO 7064 Mod 97-10: move first 4 chars to end, convert letters to numbers
  const rearranged = cleaned.slice(4) + cleaned.slice(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, (ch) =>
    (ch.charCodeAt(0) - 55).toString()
  );

  // Mod 97 on large number (process in chunks to avoid BigInt)
  let remainder = 0;
  for (const digit of numeric) {
    remainder = (remainder * 10 + parseInt(digit, 10)) % 97;
  }

  if (remainder !== 1) {
    return { valid: false, error: 'IBAN checksum invalid' };
  }

  return { valid: true };
}

export function extractBIC(blz: string): string | undefined {
  // BIC lookup is not implemented; pass BIC explicitly or let the bank resolve it
  return undefined;
}
