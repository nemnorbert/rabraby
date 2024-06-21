import { component$, useStylesScoped$, $ } from "@builder.io/qwik";
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

    const goToFood = $((category: string) => {
      console.log(category);
      const headerOffset = 110 - 1; // Height of your header
      const targetElement = document.getElementById(category);
      if (!targetElement) {
        console.error(`Element not found for selector: ${category}`);
        return;
      }
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    })

    return (
        <div class="categories">
          {
            config.menu.categories.map((value, key) => (
              <button key={key} class="btn" onClick$={() => goToFood(value)}>
                { translate.menu.category[value] }
              </button>
            ))
          }
        </div>
    );
});