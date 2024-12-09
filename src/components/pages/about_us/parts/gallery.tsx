import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./gallery.scss?inline";

export default component$(() => {
    useStylesScoped$(style);

    return (
        <section class="gallery">
            <h2>Galéria</h2>
        </section>
    );
});