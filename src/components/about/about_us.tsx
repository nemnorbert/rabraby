import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./about_us.scss?inline";
import type { TranslatesCurrent } from "~/types/translates";

interface Props {
    translate: TranslatesCurrent
}

export default component$((props: Props) => {
    useStylesScoped$(style);
    const translate = props.translate;

    return (
        <div class="about">
            <div class="text">
                <h2>{translate.navigation.about}</h2>
                <p>{translate.about?.text}</p>
            </div>
            <div class="media">
                <video src="/promo_video/promo_1.mp4" poster="/hero/contact-800.webp" controls playsInline preload="none" />
            </div>
        </div>
    );
});