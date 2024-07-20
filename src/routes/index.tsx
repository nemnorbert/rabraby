import { component$, useContext } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import "./index.scss";
import FoodModul from "~/components/menu/modul";
import Hero from "~/components/home/hero";
import Reviews from "~/components/about/reviews";
import Szechenyi from "../components/szechenyi/szechenyi";
import AboutUs from "~/components/about/about_us";
import Foods from "~/components/home/starfood";
import { CTX_Translate } from '~/root';

export default component$(() => {
  const translates = useContext(CTX_Translate);

  return (
    <>
      <Hero translate={translates.current} />
      <div class="parking">
        <Link class="btn" href="/parking">
          <i class="bi bi-car-front-fill"></i> {translates.current.navigation.parking || 'P'}
        </Link>
      </div>
      <Foods translate={translates.current} />
      <AboutUs translate={translates.current} />
      <Reviews pure={true} translate={translates.current} />
      <Szechenyi />
      <FoodModul />
    </>
  );
});

export const head: DocumentHead = {
  title: "Rab Ráby"
};