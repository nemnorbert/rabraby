import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./category.scss?inline";
import config from "~/config/menu.json"

export default component$((props) => {
    useStylesScoped$(style);
    const translate = props.translate;

    return (
        <div class="category">
          {
            config.categories.map((value, key) => (
              <button key={key} class="btn">
                { translate.menu.category[value] }
              </button>
            ))
          }
        </div>
    );
});