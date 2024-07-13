import { component$, useStylesScoped$, useContext } from "@builder.io/qwik";
import style from "./style.scss?inline";
import { CTX_Translate } from '~/root';
import type { Translates } from "~/types/translates";

export default component$(() => {
  useStylesScoped$(style);
  const translate: Translates = useContext(CTX_Translate);

  return (
    <>
      <section>
        <h1>{translate.current.navigation.tenders}</h1>

      </section>
    </>
  );
});