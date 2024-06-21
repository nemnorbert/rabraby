import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./allergy.scss?inline";
import configJson from '~/config/general.json';
import type { Config } from '~/types/general_config';
const config: Config = configJson;
import type { TranslatesCurrent } from "~/types/translates";

interface Props {
    translate: TranslatesCurrent;
}

export default component$((props: Props) => {
    useStylesScoped$(style);
    const translate = props.translate;

    return (
        <details class="allergy">
            <summary>
                {translate.menu.allergy.title}
            </summary>
            <div class="content">
                {
                    config.menu.allergy.map((value, key) => (
                        <button key={key} class="item" data-allergen={value}>
                            {translate.menu.allergy[value]}
                        </button>
                    ))
                }
            </div>
        </details>
    );
});