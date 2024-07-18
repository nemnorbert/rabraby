import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import style from "./404/style.scss?inline";

export default component$(() => {
    useStylesScoped$(style);

    return (
        <section class="wifi">
            <h1>404</h1>
            <div class="content">
                <h2>Page not found</h2>
                <h3>Az oldal nem található</h3>
            </div>
            <div class="buttons">
                <Link class="btn" href="/"> <i class="bi bi-house-fill"></i> Home | Főoldal</Link>
                <Link class="btn" href="/menu"> <i class="bi bi-book-half"></i> Menu | Étlap</Link>
                <Link class="btn" href="/about"> <i class="bi bi-person-circle"></i> About Us | Rólunk</Link>
                <Link class="btn" href="/group"> <i class="bi bi-people-fill"></i> Group | Csoport</Link>
            </div>
        </section>
    );
});