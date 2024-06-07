import config from '~/config';

interface Translations {
  iso: string;
  [key: string]: any;
}

export default async function loadTranslations(iso: string): Promise<Translations | undefined> {
  let language = iso;
  const supported = config.languages;

  try {
    if (!supported.includes(language)) {
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