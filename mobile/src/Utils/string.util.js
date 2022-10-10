/**
 *  String Utils
 *
 */

// ===============================================

export function unCapitalize(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

// ===============================================

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// ===============================================
export const onlyNumbersCheck = (str) => /^[0-9]+$/.test(str);

export const capitalFirstLetter = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const toReadableText = (text) => {
  const formatted = text
    .replace(/([A-Z]+)/g, " $1")
    .replace(/([A-Z][a-z])/g, " $1")
    .toLowerCase();
  return capitalFirstLetter(formatted);
};
