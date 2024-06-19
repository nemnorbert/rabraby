import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./allergy.scss?inline";
import config from "~/config/menu.json"

export default component$((props) => {
    useStylesScoped$(style);
    const translate = props.translate;

    return (
        <details class="allergy">
            <summary>
                {translate.menu.allergy.title}
            </summary>
            <div class="content">
                {
                    config.allergy.map((value, key) => (
                        <button key={key} class="item" data-allergen={value}>
                            {translate.menu.allergy[value]}
                        </button>
                    ))
                }
            </div>
        </details>
    );
});