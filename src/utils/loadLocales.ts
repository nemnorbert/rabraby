import configJson from '~/config/general.json';
import type { Config } from '~/types/general_config';
import type { TranslatesCurrent } from "~/types/translates";

const config: Config = configJson;

export default function loadTranslations(iso?: string): Promise<TranslatesCurrent | undefined> {
  return new Promise((resolve, reject) => {
    let language = iso || 'en'; 
    const supported = config.languages;
    const path = 'http://localhost:3000/';

    if (!supported?.includes(language)) {
      language = 'en';
    }

    const url = `${path}locales/${language}.json`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Nem sikerült letölteni a(z) ${language} nyelvű fordítási fájlt`);
        }
        return response.json();  // JSON formátumra alakítjuk a választ
      })
      .then(translations => {
        resolve(translations);  // Sikeres letöltés esetén visszaadjuk a fordításokat
      })
      .catch(error => {
        console.error('Hiba fordítás letöltése közben:', error);  // Hiba esetén hibakezelés
        reject(error);
      });
  });
}