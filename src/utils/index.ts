export function getInitials(fullName: string) {
  if (!fullName || typeof fullName !== "string") {
    throw new Error("Please provide a valid full name as a string.");
  }

  const nameParts = fullName.trim().split(" ");
  if (nameParts.length < 2) {
    throw new Error("Please provide both first name and last name.");
  }

  const firstNameInitials = nameParts[0].substring(0, 1).toUpperCase();
  const lastNameInitials = nameParts[1].substring(0, 1).toUpperCase();

  return firstNameInitials + lastNameInitials;
}


export function isValidIBAN(iban: string): boolean {
  iban = iban.replace(/\s+/g, "").toUpperCase();

  const ibanPattern = /^[A-Z0-9]+$/;
  if (!ibanPattern.test(iban)) {
    return false;
  }

  const ibanLengths: { [countryCode: string]: number } = {
    AD: 24,
    AE: 23,
    AL: 28,
    AT: 20,
    AZ: 28,
    BA: 20,
    BE: 16,
    BG: 22,
    BH: 22,
    BR: 29,
    CY: 28,
    CZ: 24,
    DE: 22,
    DK: 18,
    DO: 28,
    EE: 20,
    ES: 24,
    FI: 18,
    FO: 18,
    FR: 27,
    GB: 22,
    GE: 22,
    GL: 18,
    GR: 27,
    HR: 21,
    HU: 28,
    IE: 22,
    IL: 23,
    IS: 26,
    IT: 27,
    LB: 28,
    LI: 21,
    LT: 20,
    LU: 20,
    LV: 21,
    MC: 27,
    MD: 24,
    ME: 22,
    MK: 19,
    MT: 31,
    MU: 30,
    NL: 18,
    NO: 15,
    PL: 28,
    PT: 25,
    RO: 24,
    RS: 22,
    SE: 24,
    SI: 19,
    SK: 24,
    SM: 27,
    TR: 26,
    VA: 22,
    ZA: 24,
  };

  const countryCode = iban.slice(0, 2);
  if (
    !(countryCode in ibanLengths) ||
    iban.length !== ibanLengths[countryCode]
  ) {
    return false;
  }

  const rearrangedIBAN = iban.slice(4) + iban.slice(0, 4);

  const numericIBAN = rearrangedIBAN.replace(/[A-Z]/g, (char) =>
    (char.charCodeAt(0) - 55).toString()
  );

  const numericValue = BigInt(numericIBAN);
  const moduloResult = numericValue % BigInt(97);

  return moduloResult === BigInt(1);
}
