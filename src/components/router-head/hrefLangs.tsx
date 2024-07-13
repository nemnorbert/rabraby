import { component$ } from "@builder.io/qwik";
import config from '~/config/general.json';

export default component$((props: any) => {
    const urlData = props.url;
    const langs = config.languages;
    if (!urlData) {
        return null;
    }

    const pathName = urlData.pathname.split('/').slice(1, -1);
    const isUrlLang = config.languages.includes(pathName[0]);
    const endpath = isUrlLang ? pathName[1] : pathName[0];
    
    return (
    <>
        {
            langs.map((lang, key) => 
                <link 
            key={key} 
            rel="alternate" 
            hreflang={lang} 
            href={`https://rabraby.hu/${lang}/${endpath}`} 
            />)
        }
        <link rel="alternate" hreflang="x-default" href={`https://rabraby.hu/en/${endpath}`} />
    </>
    )
})