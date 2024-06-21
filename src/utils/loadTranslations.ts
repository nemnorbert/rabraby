import configJson from '~/config/general.json';
import type { Config } from '~/types/general_config';
const config: Config = configJson;
import type { TranslatesCurrent } from "~/types/translates";

export default async function loadTranslations(iso: string): Promise<TranslatesCurrent | undefined> {
  let language = iso;
  const supported = config.languages;

  try {
    if (!supported?.includes(language)) {
      language = 'en';
    }

    const translations = await import(/* @vite-ignore */ `../translations/${language}.json`);

    if (!translations || !translations.default || !translations.default.iso) {
      throw new Error(`Translation file for ${language} is missing or invalid`);
    }

    return translations.default;
  } catch (error) {
    console.error('Error with language import:', error);
    return undefined;
  }
}