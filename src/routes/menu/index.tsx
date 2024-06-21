import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Allergy from "~/components/menu/allergy";
import Categories from "~/components/menu/categories";
import Category from "~/components/menu/category";
import { CTX_Translate } from '~/root';
import type { Translates } from "~/types/translates";
import style from "./style.scss?inline";
import configJson from '~/config/general.json';
import type { Config } from '~/types/general_config';
const config: Config = configJson;

export default component$(() => {
  useStylesScoped$(style);
  const translate: Translates = useContext(CTX_Translate);

  return (
    <>
      <section>
        <div class="hero">
          <div class="food">
            <h1>Étlap</h1>
          </div>
          <div class="drink">
            <h2>Itallap</h2>
          </div>
        </div>

        <Categories translate={translate.current} />
        <Allergy translate={translate.current} />
        <div class="menu">
          {
            config.menu.categories.map((value, key) => (
              <Category key={key} title={value} translate={translate.current} />
            ))
          }
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Rab Ráby Étlap",
  meta: [
    {
      name: "description",
      content: "Rab Ráby Restaurant",
    },
  ],
};