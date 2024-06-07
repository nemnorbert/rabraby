import { component$, useStylesScoped$, useContext, $ } from '@builder.io/qwik';
import style from "./langswitcher.scss?inline";
import config from '~/config';
import { CTX_Translate } from '~/root';
import loadTranslations from '~/utils/loadTranslations';

interface TranslateInterface {
    current: {
        iso: string
    };
}

export default component$(() => {
    useStylesScoped$(style);
    const translate: TranslateInterface = useContext(CTX_Translate);
    const allLangs = config?.languages ?? [];

    const handleSwitchLang = $(async (e) => {
        const lang = e.target.value;
        const data = await loadTranslations(lang);
        translate.current = data;
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
