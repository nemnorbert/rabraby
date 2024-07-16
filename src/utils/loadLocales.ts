import config from '~/config/general.json';
import type { TranslatesCurrent } from "~/types/translates";
const supportedLanguages = Object.keys(config.langs);

async function loadTranslations(iso = "en"): Promise<TranslatesCurrent | undefined> {
  try {
    const lang = supportedLanguages.includes(iso) ? iso : 'en';
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/locales/${lang}.json`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Nem sikerült letölteni a(z) ${lang} nyelvű fordítási fájlt`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error when importing lang JSON:', error);
    throw error;
  }
}

function getBaseUrl(): string {
  return process.env.NODE_ENV === 'production' ? 'https://rabraby.hu' : 'http://localhost:5173';
}

export default loadTranslations;