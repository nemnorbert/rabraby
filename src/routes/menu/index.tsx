import { component$, useContext, useStore, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Allergy from "~/components/menu/allergy";
import Categories from "~/components/menu/categories";
import Category from "~/components/menu/category";
import Modul from "~/components/menu/modul";
import { CTX_Translate } from '~/root';
import type { Translates } from "~/types/translates";
import style from "./style.scss?inline";
import configJson from '~/config/general.json';
import type { Config } from '~/types/general_config';
import Hero from "~/components/hero/hero";
const config: Config = configJson;

export default component$(() => {
  useStylesScoped$(style);
  const translate: Translates = useContext(CTX_Translate);
  const allergies = useStore({ selected: [] })
  const isOpen = useStore({ open: "", allergy: [], price: "" });

  return (
    <>
      <section>
        <Hero title={translate.current.menu.title} image="food" bottom={true} />
        <Allergy translate={translate.current} allergies={allergies} />
        <Categories translate={translate.current} />
        <div class="menu">
          {
            config.menu.categories.map((value, key) => (
              <Category key={key} title={value} translate={translate.current} allergies={allergies} isOpen={isOpen} />
            ))
          }
        </div>
        <Modul isOpen={isOpen} />
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