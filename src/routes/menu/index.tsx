import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
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

        <div class="category">
          
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