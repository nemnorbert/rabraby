import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import style from "./style.scss?inline";

export default component$(() => {
    useStylesScoped$(style);

    return (
        <section class="wifi">
            <div class="welcome">
                <h1>Rab Ráby WiFi</h1>
                <p>Üdvözlünk ingyenes WIFI hállózatunkon!</p>
            </div>
        </section>
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
