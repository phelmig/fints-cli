// IBAN lengths for SEPA scheme countries (SWIFT IBAN Registry): EU/EEA plus
// AD, AL, CH, GB, GI, MC, MD, ME, MK, RS, SM, VA. Territories without their own
// IBAN prefix (French overseas departments, Åland, Channel Islands, ...) use the
// parent country's code. The bank remains the final authority on reachability.
const SEPA_IBAN_LENGTHS: Record<string, number> = {
  AD: 24, AL: 28, AT: 20, BE: 16, BG: 22, CH: 21, CY: 28, CZ: 24, DE: 22, DK: 18,
  EE: 20, ES: 24, FI: 18, FR: 27, GB: 22, GI: 23, GR: 27, HR: 21, HU: 28, IE: 22,
  IS: 26, IT: 27, LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19,
  MT: 31, NL: 18, NO: 15, PL: 28, PT: 25, RO: 24, RS: 22, SE: 24, SI: 19, SK: 24,
  SM: 27, VA: 22,
};

export function validateIBAN(iban: string): { valid: boolean; error?: string } {
  const cleaned = iban.replace(/\s/g, '').toUpperCase();

  if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(cleaned)) {
    return {
      valid: false,
      error: 'IBAN must be a 2-letter country code, 2 check digits and an alphanumeric account number',
    };
  }

  const country = cleaned.slice(0, 2);
  const expectedLength = SEPA_IBAN_LENGTHS[country];
  if (!expectedLength) {
    return { valid: false, error: `Country ${country} is not part of the SEPA area` };
  }
  if (cleaned.length !== expectedLength) {
    return {
      valid: false,
      error: `${country} IBAN must be ${expectedLength} characters (got ${cleaned.length})`,
    };
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
