import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { CTX_Translate } from '~/root';
import style from "./style.scss?inline";

export default component$(() => {
  useStylesScoped$(style);
  const translate = useContext(CTX_Translate);
  
  return (
    <>
      <div class="hero">
        <div class="title">
          <h1>{ translate?.current?.navigation?.gallery ?? "Gallery" }</h1>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Rab Ráby Gallery",
  meta: [
    {
      name: "description",
      content: "Rab Ráby Restaurant",
    },
  ],
};
