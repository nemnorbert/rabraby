import { component$, useStylesScoped$, useContext, $ } from '@builder.io/qwik';
import style from "./langswitcher.scss?inline";
import { CTX_Translate } from '~/root';
import loadLocales from '~/utils/loadLocales';
import config from '~/config/general.json';
import type { Translates } from "~/types/translates";

export default component$(() => {
    useStylesScoped$(style);
    const translate: Translates = useContext(CTX_Translate);
    const langs = config.langs;
    const handleSwitchLang = $(async (e: Event) => {
        const target = e.target as HTMLSelectElement;
        const lang = target.value;
        const origin = window.location.origin;
        const data = await loadLocales(lang, origin);
        if (data) {
            translate.current = data;
            document.documentElement.lang = data.iso || 'en';
            document.title = data.home.title || 'Rab Ráby';
        }
    })

    return (
        <select onChange$={handleSwitchLang} name="language" id="language-selector">
            {
                Object.entries(langs).map(([key, {n, active}]) => (
                    active && 
                    <option
                        key={key} 
                        value={key} 
                        title={n}
                        selected={translate.current.iso === key}
                    >
                        {key.toUpperCase()}
                    </option>
                ))
            }
        </select>
    )
});
