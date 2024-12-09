import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Contact from "~/components/pages/contact/contact";

export default component$(() => {

  return (
    <Contact />
  );
});

export const head: DocumentHead = {
  title: "Rab Ráby"
};
