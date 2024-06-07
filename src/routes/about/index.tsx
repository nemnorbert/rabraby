import { component$, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Reviews from "~/components/about/reviews";
import { CTX_Translate } from '~/root';
import AboutUs from "~/components/about/about_us";
import Gallery from "~/components/about/gallery";

export default component$(() => {
  const translates = useContext(CTX_Translate);
  //console.log(translates.current)

  return (
    <>
      <h1>{translates.current.navigation.about}</h1>
      <AboutUs />
      <Gallery />
      <Reviews reviews={translates.current.reviews} />
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
