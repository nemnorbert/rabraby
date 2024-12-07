import type { TranslatesCurrent } from "~/types/translates";
import { langValid } from '~/utils/langValid';

function getBaseUrl(path?: string): string {
  if (path) { return path; }
  return process.env.NODE_ENV === 'production' ? 'https://rabraby.hu' : 'http://localhost:5174';
}

async function loadTranslations(iso = "en", path?: string): Promise<TranslatesCurrent | undefined> {
  try {
    const lang = langValid(iso);
    const baseUrl = getBaseUrl(path);
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

export default loadTranslations;