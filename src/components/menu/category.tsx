import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./category.scss?inline";
import type { TranslatesCurrent } from "~/types/translates";
import Food from "./food";
import menuJson from "~/config/menu.json";
//import configJson from '~/config/general.json';
//import type { Config } from '~/types/general_config';
//const config: Config = configJson;

interface Props {
    title: string,
    translate?: TranslatesCurrent;
}

export default component$((props: Props) => {
    useStylesScoped$(style);

    const title = props.title;
    const translate = props.translate;

    return (
        <div class="category">
          <div class="title">{ translate?.menu.category[title] ?? title }</div>
          <div class="content">
            {
                Object.entries(menuJson.menu).map(([key, value]) => (
                    value.category === title &&
                    <Food key={key} code={key} translate={translate}/>
                ))
            }
          </div>
        </div>
    );
});