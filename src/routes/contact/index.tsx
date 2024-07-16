import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { CTX_Translate } from '~/root';
import style from "./style.scss?inline";
import Hero from "~/components/hero/hero";

export default component$(() => {
  useStylesScoped$(style);
  const translate = useContext(CTX_Translate);

  return (
    <>
      <Hero title={translate.current.navigation.contact} image="contact" />
    </>
  );
});

export const head: DocumentHead = {
  title: "Rab Ráby"
};
