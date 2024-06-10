import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./allergy.scss?inline";

export default component$(() => {
    useStylesScoped$(style);

    return (
        <details class="allergy">
            <summary>Allergének</summary>
            <div class="content">
                <div class="item" data-allergen="1">
                    Glutén
                </div>
                <div class="item" data-allergen="2">
                    Rákfélék
                </div>
            </div>
        </details>
    );
});