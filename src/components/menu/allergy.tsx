import { component$, useStylesScoped$, $ } from "@builder.io/qwik";
import style from "./allergy.scss?inline";
import configJson from '~/config/general.json';
import type { Config } from '~/types/general_config';
const config: Config = configJson;
import type { TranslatesCurrent } from "~/types/translates";

interface Props {
    translate: TranslatesCurrent;
    allergies: {
        selected: string[];
    };
}

export default component$((props: Props) => {
    useStylesScoped$(style);
    const translate = props.translate;
    const allergies = props.allergies.selected;

    const controllAllergy = $((value?: string) => {
        if (!allergies.includes(value)) {
            allergies.push(value)
        } else {
            props.allergies.selected = allergies.filter(item => item !== value);
        }
    })

    return (
        <details class="allergy">
            <summary>
                <span>{translate.menu.allergy.title}</span>
                <p>{translate.menu.allergy?.text}</p>
            </summary>
            <div class="content">
                {
                    config.menu.allergy.map((value, key) => (
                        <button key={key} data-allergen={value} title={`${key+1} - ${translate.menu.allergy[value]}`}
                            class={allergies.includes(value) ? "item active" : "item"}
                            onClick$={() => controllAllergy(value)}
                        >
                            {translate.menu.allergy[value]}
                        </button>
                    ))
                }
            </div>
        </details>
    );
});