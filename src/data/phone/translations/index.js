import { en } from "./en";
import { ja } from "./ja";

export const phoneTranslations = { en, ja };

export function getPhoneText(language) {
  return phoneTranslations[language];
}
