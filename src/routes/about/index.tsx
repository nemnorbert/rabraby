import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Reviews from "~/components/about/reviews";
import { CTX_Translate } from '~/root';
import AboutUs from "~/components/about/about_us";
import Gallery from "~/components/about/gallery";
import style from "./style.scss?inline";
import Hero from "~/components/hero/hero";

export default component$(() => {
  const translates = useContext(CTX_Translate);
  useStylesScoped$(style);

  return (
    <>
      <section>
        <Hero title={translates.current.navigation.about} image="about" />
        <AboutUs translate={translates.current.about} />
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
