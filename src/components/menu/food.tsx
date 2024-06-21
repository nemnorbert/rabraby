import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./food.scss?inline";
import type { TranslatesCurrent } from "~/types/translates";
import menuJson from "~/config/menu.json";
//import configJson from '~/config/general.json';
//import type { Config } from '~/types/general_config';
//const config: Config = configJson;

interface Props {
    code: string,
    translate?: TranslatesCurrent;
}

export default component$((props: Props) => {
    useStylesScoped$(style);

    const code = props.code;
    const translate = props.translate;
    const iso = translate?.iso;

    return (
        <div class="item">
            <div class="media">
                <div class="code">#{ code }</div>
                <img src={`/src/media/foods/${code}_400px.webp`} alt="Image" />
            </div>
            <div class="title">{ menuJson.foods?.[code]?.[iso] ?? menuJson.foods?.[code].en }</div>
            <div class="buttons">
                <div class="huf">{menuJson.menu[code].huf} HUF</div>
            </div>
        </div>
    );
});