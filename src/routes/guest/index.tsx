import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
//import Reviews from "~/components/about/reviews";
//import { CTX_Translate } from '~/root';

export default component$(() => {
  //const translates = useContext(CTX_Translate);
  //console.log(translates.current)

  return (
    <>
      <h1>Vendégkönyv</h1>
    </>
  );
});

export const head: DocumentHead = {
  title: "Rab Ráby"
};
