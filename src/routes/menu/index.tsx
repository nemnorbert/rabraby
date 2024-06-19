import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Allergy from "~/components/menu/allergy";
import Category from "~/components/menu/category";
import { CTX_Translate } from '~/root';
import style from "./style.scss?inline";

export default component$(() => {
  useStylesScoped$(style);
  const translate = useContext(CTX_Translate);

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

        <Category translate={translate.current} />
        <Allergy translate={translate.current} />
        <div class="content">

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