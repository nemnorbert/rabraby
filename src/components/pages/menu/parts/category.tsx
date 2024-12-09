import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./category.scss?inline";
import type { TranslatesCurrent } from "~/types/translates";
import Food from "./food";
import menuJson from "~/config/menu.json";

interface Props {
    title: string,
    translate?: TranslatesCurrent;
    allergies: {
        selected: string[];
    };
}

export default component$((props: Props) => {
    useStylesScoped$(style);

    const title = props.title;
    const translate = props.translate;
    const allergies = props.allergies;

    return (
        <div id={title} class="category">
          <div class="title">{ translate?.menu.category[title] ?? title }</div>
          <div class="content">
            {
                Object.entries(menuJson.menu).map(([key, value]) => (
                    value.category === title &&
                    <Food key={key} code={key} translate={translate} allergies={allergies} />
                ))
            }
          </div>
        </div>
    );
});