import { component$, useContext, useStore, useStylesScoped$ } from "@builder.io/qwik";
import { CTX_Translate } from '~/root';
import style from "./menu.scss?inline";
import Allergy from "~/components/pages/menu/parts/allergy";
import Categories from "~/components/pages/menu/parts/categories";
import Category from "~/components/pages/menu/parts/category";
import FoodModul from "~/components/pages/menu/parts/modul";
import configJson from '~/config/general.json';
import Hero from "~/components/hero/hero";
const config: Config = configJson;

import type { Translates } from "~/types/translates";
import type { Config } from '~/types/general_config';

export default component$(() => {
  useStylesScoped$(style);
  const translate: Translates = useContext(CTX_Translate);
  const allergies = useStore({ selected: [] })

  return (
    <section>
        <Hero title={translate.current.menu.food?.title} image="food" />
        <Allergy translate={translate.current} allergies={allergies} />
        <Categories translate={translate.current} />
        <div class="price_alert">
            <i class="bi bi-info-circle"></i> {translate.current.menu.food?.price || ""}
        </div>
        <div class="menu">
            {
            config.menu.categories.map((value, key) => (
                <Category key={key} title={value} translate={translate.current} allergies={allergies} />
            ))
            }
        </div>
        <FoodModul />
    </section>
  );
});