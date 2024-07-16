import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const item_slug = useLocation();
  return (
    <>
      <h1>Items</h1>
      <h2>{ item_slug.params.id }</h2>
    </>
  );
});

export const head: DocumentHead = {
  title: "Rab Ráby"
};