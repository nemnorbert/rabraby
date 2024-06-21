import { component$, useStylesScoped$ } from "@builder.io/qwik";
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
                            <div class="content">{ text }</div>
                            <div class="name">{ name }</div>
                            <div class="title">{ title }</div>
                        </div>
                    ))
                }
                { reviews && !pure &&
                    reviews.map(({name, title, text}, key) => (
                        <div key={key} class="card">
                            <div class="content">{ text }</div>
                            <div class="name">{ name }</div>
                            <div class="title">{ title }</div>
                        </div>
                    ))
                }
            </div>
            <div class="rating">
                <div>Google <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-half"></i>
                </div>
            </div>
        </div>
    );
});