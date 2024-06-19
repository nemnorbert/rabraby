import { component$, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import "./index.scss";
import Hero from "~/components/home/hero";
import Reviews from "~/components/about/reviews";
import Szechenyi from "../components/szechenyi/szechenyi";
import { CTX_Translate } from '~/root';

export default component$(() => {
  const translates = useContext(CTX_Translate);

  return (
    <>
      <Hero translate={translates.current} />
      <Reviews pure={true} reviews={translates.current.reviews}/>
      <Szechenyi />
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