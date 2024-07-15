import { component$, useStylesScoped$, useContext } from "@builder.io/qwik";
import style from "./style.scss?inline";
import { CTX_Translate } from '~/root';
import type { Translates } from "~/types/translates";
import Hero from "~/components/hero/hero";

export default component$(() => {
  useStylesScoped$(style);
  const translate: Translates = useContext(CTX_Translate);

  return (
    <>
      <section>
        <Hero title={translate.current.navigation.tenders} image="food" />
      </section>
    </>
  );
});