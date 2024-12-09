import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { CTX_Translate } from '~/root';
import style from "./contact.scss?inline";
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
