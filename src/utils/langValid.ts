import configJson from "~/config/general.json";

type Lang = {
    n: string;
    active?: boolean;
};
type Config = {
    langs: Record<string, Lang>;
};
const config: Config = configJson;

function langsAll() {
    try {
        const supported = Object.entries(config.langs);
        const filtered = supported.filter(([, value]) => value.active);
        const result =  filtered.map(([key]) => key);
        return result;
    } catch (error) {
        console.error('Error in langsAll:', error);
        return ['en'];
    }
}

function langValid (iso = 'en') {
    if (iso === 'en') { return 'en' }
    const lang = langsAll().includes(iso) ? iso : 'en';
    if (lang === 'en') { return 'en' }
    return lang;
}

function langCheck (pathname = '', userLang = '') {
    if (!pathname || !userLang) { return 'en' }
    const langs = langsAll();
    
    // URL Lang Check
    const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
    const locale = path.split('/')[1] || '';
    if (langs.includes(locale)) {
        return locale;
    }

    // Browser Lang Check
    const userLangShort = userLang.substring(0, 2) || '';
    if (langs.includes(userLangShort)) {
        return userLangShort;
    }

    return 'en';
}

export { langsAll, langValid, langCheck }