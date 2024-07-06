import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./about_us.scss?inline";

interface Props {
    translate: {
        text?: string
    }
}

export default component$((props: Props) => {
    useStylesScoped$(style);
    const translates = props.translate;

    return (
        <div class="about">
            <div class="text">
                <h2>Rólunk</h2>
                <p>{translates.text}</p>
            </div>
            <div class="media">
                <video src="/promo_video/promo_1.mp4" poster="/hero/contact-800.webp" controls playsInline preload="none" />
            </div>
        </div>
    );
});