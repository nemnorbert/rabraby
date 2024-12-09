import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import FoodModul from "~/components/pages/menu/parts/modul";
import Hero from "~/components/pages/home/parts/hero";
import Reviews from "~/components/pages/about_us/parts/reviews";
import Szechenyi from "~/components/utils/szechenyi/szechenyi";
import AboutUs from "~/components/pages/about_us/parts/about";
import Foods from "~/components/pages/home/parts/starfood";
import { CTX_Translate } from '~/root';
import styles from "./home.scss?inline";

export default component$(() => {
  const translates = useContext(CTX_Translate);
  useStylesScoped$(styles);

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