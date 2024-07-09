import { component$, useStylesScoped$, useContext, $ } from '@builder.io/qwik';
import style from "./langswitcher.scss?inline";
import { CTX_Translate } from '~/root';
import loadTranslations from '~/utils/loadLocales';
import configJson from '~/config/general.json';
import type { Config } from '~/types/general_config';
const config: Config = configJson;
import type { Translates } from "~/types/translates";

export default component$(() => {
    useStylesScoped$(style);
    const translate: Translates = useContext(CTX_Translate);
    const allLangs = config.languages ?? [];

    const handleSwitchLang = $(async (e: Event) => {
        const target = e.target as HTMLSelectElement;
        const lang = target.value;
        const data = await loadTranslations(lang);
        if (data) {
            translate.current = data;
          } else {
            console.error('Failed to load translations');
          }
    })

    return (
        <select onChange$={handleSwitchLang} name="language" id="language-selector">
            {
                allLangs.map((item, key) => (
                    <option
                    key={key} value={item} selected={translate.current.iso === item}>
                        {item.toUpperCase()}
                    </option>
                ))
            }
        </select>
    )
});
