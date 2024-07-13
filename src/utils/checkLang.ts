import config from "~/config/general.json";

export default function (pathname: any, userLang: any) {

    if (!pathname || !userLang) { return 'en' }

    const locale = pathname.split('/')[1] || '';
    const isUrlValid = config.languages.includes(locale);
    const isUserValid = config.languages.includes(userLang);

    if (isUrlValid) {
        return locale;
    }
    if (isUserValid) {
        return userLang;
    }
    return 'en';
}