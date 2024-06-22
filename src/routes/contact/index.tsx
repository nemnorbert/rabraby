import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { CTX_Translate } from '~/root';
import style from "./style.scss?inline";
import HeroImage from "~/media/hero/contact.jpg?jsx";

export default component$(() => {
  useStylesScoped$(style);
  const translate = useContext(CTX_Translate);
  console.log(translate.current.navigation.contact);

  return (
    <>
      <div class="hero">
        <div class="title">
          <h1>{ translate.current.navigation.contact ?? "Contact" }</h1>
        </div>
        <HeroImage />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Rab Ráby",
  meta: [
    {
      name: "description",
      content: "Rab Ráby Restaurant",
    },
  ],
};
