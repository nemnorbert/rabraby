import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import style from "./starfood.scss?inline";
import menuJson from "~/config/menu.json";
import Food from "~/components/menu/food";
import type { TranslatesCurrent } from "~/types/translates";
const menuData: any = menuJson;

interface Props {
  translate: TranslatesCurrent;
}

export default component$((props: Props) => {
  useStylesScoped$(style);
  const translate = props.translate;
  const lang = translate.iso || "en";
  const stars = menuData.stars?.[lang] || menuData.stars.en;
  const menuCount = Object.entries(menuJson.menu).length;

  return (
    <section class="menu">
        <h2>{translate.menu.food?.stars || ""}:</h2>
        <div class="row">
            {
              stars.map((item: string, key: number) => (
                <div key={key} class="food">
                  <Food code={item} translate={translate} slider={true} />
                </div>
              ))
            }
        </div>
        <Link href="/menu">
          <h3>
            <i class="bi bi-book-half"></i> {translate.menu.food?.show} 
            {menuCount && ` (${menuCount})`}
          </h3>
        </Link>
        <p>{translate.menu.food?.price || ""}</p>
    </section>
  );
});