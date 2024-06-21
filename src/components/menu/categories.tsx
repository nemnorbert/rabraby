import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./categories.scss?inline";
import configJson from '~/config/general.json';
import type { Config } from '~/types/general_config';
import type { TranslatesCurrent } from "~/types/translates";
const config: Config = configJson;

interface Props {
  translate: TranslatesCurrent;
}

export default component$((props: Props) => {
    useStylesScoped$(style);
    const translate = props.translate;

    return (
        <div class="categories">
          {
            config.menu.categories.map((value, key) => (
              <button key={key} class="btn">
                { translate.menu.category[value] }
              </button>
            ))
          }
        </div>
    );
});