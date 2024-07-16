import configJson from '~/config/general.json';
import type { Config } from '~/types/general_config';
import type { TranslatesCurrent } from "~/types/translates";

const config: Config = configJson;

export default function loadTranslations(iso?: string): Promise<TranslatesCurrent | undefined> {
  return new Promise((resolve, reject) => {
    let language = iso || 'en'; 
    const supported = config.languages;
    //const baseUrl = process.env.NODE_ENV === 'production' ? 'https://test.adanor.eu/' : 'http://localhost:5173/';
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://rabraby.hu/' : 'http://localhost:5173/';

    if (!supported?.includes(language)) {
      language = 'en';
    }

    const url = `${baseUrl}locales/${language}.json`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Nem sikerült letölteni a(z) ${language} nyelvű fordítási fájlt`);
        }
        return response.json();
      })
      .then(translations => {
        resolve(translations);
      })
      .catch(error => {
        console.error('Hiba fordítás letöltése közben:', error);
        reject(error);
      });
  });
}