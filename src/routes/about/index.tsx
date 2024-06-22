import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Reviews from "~/components/about/reviews";
import { CTX_Translate } from '~/root';
import AboutUs from "~/components/about/about_us";
import Gallery from "~/components/about/gallery";
import HeroImage from "~/media/hero/about.jpg?jsx";
import style from "./style.scss?inline";

export default component$(() => {
  const translates = useContext(CTX_Translate);
  useStylesScoped$(style);

  return (
    <>
      <section>
        <div class="hero">
          <h1>{translates.current.navigation.about}</h1>
          <HeroImage />
        </div>
        <AboutUs />
        <Gallery />
        <Reviews reviews={translates.current.reviews} />
      </section>
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
