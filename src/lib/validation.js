/**
 * Common disposable / temporary email domains list
 */
export const DISPOSABLE_DOMAINS = [
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
  "cool.fr.nf",
  "jetable.fr.nf",
  "mely.fr.nf",
  "moncourrier.fr.nf",
  "monemail.fr.nf",
  "monmel.fr.nf",
  "mailinator.com",
  "tempmail.com",
  "temp-mail.org",
  "guerrillamail.com",
  "dispostable.com",
  "getairmail.com",
  "sharklasers.com",
  "10minutemail.com",
  "trashmail.com",
  "maildrop.cc",
  "tempmailo.com",
  "generator.email",
  "disposable.com",
  "throwawaymail.com",
  "mailnesia.com",
  "mailcatch.com",
];

/**
 * Validates an email address format and checks for disposable email services.
 * @param {string} email
 * @returns {{ valid: boolean, message?: string }}
 */
export const validateEmail = (email) => {
  if (!email) {
    return { valid: false, message: "L'e-mail est obligatoire." };
  }

  const trimmed = email.trim();
  
  // Basic email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, message: "Veuillez entrer une adresse e-mail valide." };
  }

  const domain = trimmed.split("@")[1]?.toLowerCase();
  if (DISPOSABLE_DOMAINS.some((d) => domain === d || domain.endsWith("." + d))) {
    return {
      valid: false,
      message: "Les adresses e-mail jetables (temporelles) ne sont pas autorisées. Veuillez utiliser une vraie adresse e-mail.",
    };
  }

  return { valid: true };
};

/**
 * Validates a phone number length to ensure it is not too short.
 * @param {string} phone
 * @returns {{ valid: boolean, message?: string }}
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return { valid: false, message: "Le numéro de téléphone est obligatoire." };
  }

  // Strip everything except numbers/digits
  const digits = phone.replace(/\D/g, "");

  // International format needs at least 8 digits (excluding country code or including it)
  // Usually, a valid phone number including country dial code has at least 8 digits.
  if (digits.length < 8) {
    return {
      valid: false,
      message: "Veuillez entrer un numéro de téléphone valide et complet.",
    };
  }

  return { valid: true };
};
