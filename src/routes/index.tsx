import { component$, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import "./index.scss";
import Hero from "~/components/home/hero";
import Reviews from "~/components/about/reviews";
import Szechenyi from "../components/szechenyi/szechenyi";
import AboutUs from "~/components/about/about_us";
import FoodMenu from "~/components/home/menu";
import Groups from "~/components/home/group";
import { CTX_Translate } from '~/root';

export default component$(() => {
  const translates = useContext(CTX_Translate);

  return (
    <>
      <Hero translate={translates.current} />
      <FoodMenu />
      <AboutUs translate={translates.current.about} />
      <Groups />
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