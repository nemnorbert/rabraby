import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import AboutUs from "~/components/pages/about_us/about_us";

export default component$(() => {

  return (
    <AboutUs />
  );
});

export const head: DocumentHead = {
  title: "Rab Ráby"
};
