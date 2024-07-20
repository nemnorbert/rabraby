import { component$, useStylesScoped$, useContext } from "@builder.io/qwik";
import style from "./style.scss?inline";
import { CTX_Translate } from '~/root';
import type { Translates } from "~/types/translates";
import Hero from "~/components/hero/hero";
import ParkingMap from "~/media/parking/parking.webp?jsx";

export default component$(() => {
  useStylesScoped$(style);
  const translate: Translates = useContext(CTX_Translate);

  return (
    <>
      <section>
        <Hero title={translate.current.navigation.parking} image="about" />
        <div class="navi">
            <a class="btn" href="https://maps.app.goo.gl/Bfzmif5M4CMMA8268" target="_blank" rel="noreferrer">
                <i class="bi bi-geo-alt-fill"></i> Google Maps
            </a>
            <a class="btn" href="https://www.waze.com/en/live-map/directions?latlng=47.66694080139258%2C19.074432849884037" target="_blank" rel="noreferrer">
                <i class="bi bi-car-front-fill"></i> Waze
            </a>
        </div>
        <div class="container">
            <div class="map">
                <ParkingMap />
            </div>
            <div class="description">
                <p>
                {
                   translate.current.parking?.text || ''
                }
                </p>
            </div>
        </div>
      </section>
    </>
  );
});