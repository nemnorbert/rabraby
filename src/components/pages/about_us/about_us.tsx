import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import Reviews from "~/components/pages/about_us/parts/reviews";
import { CTX_Translate } from '~/root';
import AboutUs from "~/components/pages/about_us/parts/about";
import styles from "./about_us.scss?inline";
import Hero from "~/components/hero/hero";

export default component$(() => {
    const translates = useContext(CTX_Translate);
    useStylesScoped$(styles);

    return (
        <section>
            <Hero title={translates.current.navigation.about} image="about" />
            <AboutUs translate={translates.current} />
            <Reviews translate={translates.current} />
        </section>
    );
});