import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import style from "./reviews.scss?inline";
import type { Review } from "~/types/translates";

interface Props {
    pure?: boolean;
    reviews?: Review[];
}

export default component$((props: Props) => {
    useStylesScoped$(style);
    const pure = props.pure;
    const reviews = props.reviews;

    return (
        <div id="reviews" class={pure ? 'pure' : undefined}>
            <h2>Vélemények</h2>
            <div class="row">
                { reviews &&
                    reviews.map(({name, title, text}, key) => (
                        <div key={key} class="card">
                            <div class="name">{ name }</div>
                            <div class="title">{ title }</div>
                            <div class="content">{ text }</div>
                        </div>
                    ))
                }
                { reviews && !pure &&
                    reviews.map(({name, title, text}, key) => (
                        <div key={key} class="card">
                            <div class="name">{ name }</div>
                            <div class="title">{ title }</div>
                            <div class="content">{ text }</div>
                        </div>
                    ))
                }
            </div>
            <div class="rating">
                <div>Google: 4+</div>
            </div>
        </div>
    );
});