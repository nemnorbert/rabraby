import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./reviews.scss?inline";
import type { TranslatesCurrent } from "~/types/translates";
import configJson from "~/config/general.json"

interface Props {
    pure?: boolean;
    translate: TranslatesCurrent;
}

export default component$((props: Props) => {
    useStylesScoped$(style);
    const pure = props.pure;
    const title = props.translate.reviews.title;
    const reviews = props.translate.reviews.people;

    return (
        <div id="reviews" class={pure ? 'pure' : undefined}>
            <h2>{title}</h2>
            <div class="row">
                { reviews &&
                    reviews.map(({name, title, text}, index) => (
                        <div key={`pure-${index}`} class="card">
                            <div class="content">{ text }</div>
                            <div class="name">{ name }</div>
                            <div class="title">{ title }</div>
                        </div>
                    ))
                }
                { reviews && !pure &&
                    reviews.map(({name, title, text}, index) => (
                        <div key={`not-pure-${index}`} class="card">
                            <div class="content">{ text }</div>
                            <div class="name">{ name }</div>
                            <div class="title">{ title }</div>
                        </div>
                    ))
                }
            </div>
            <div class="rating">
                <a href={configJson.contact.map.link} target="_blank">Google <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-half"></i>
                </a>
            </div>
        </div>
    );
});