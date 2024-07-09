import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./starfood.scss?inline";
import menuJson from "~/config/menu.json";
import Food from "~/components/menu/food";
import type { TranslatesCurrent } from "~/types/translates";

interface Props {
  translate: TranslatesCurrent;
}

export default component$((props: Props) => {
  useStylesScoped$(style);
  const translate = props.translate;

  return (
    <section class="menu">
        <h2>Kiemelt ételeink:</h2>
        <div class="row">
            {
              menuJson.stars.map((item, key) => (
                <Food key={key} code={item} translate={translate} allergies={false} isOpen={null} />
              ))
            }
        </div>
    </section>
  );
});