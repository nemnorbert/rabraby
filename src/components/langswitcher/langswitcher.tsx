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
        const data = await loadLocales(lang);
        if (data) {
            translate.current = data;
        }
    })

    return (
        <select onChange$={handleSwitchLang} name="language" id="language-selector">
            {
                Object.entries(langs).map(([key, {n}]) => (
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
