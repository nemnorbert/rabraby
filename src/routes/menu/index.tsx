import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Menu from "~/components/pages/menu/menu";

export default component$(() => {
  return (
    <Menu />
  );
});

export const head: DocumentHead = {
  title: "Rab Ráby Étlap"
};