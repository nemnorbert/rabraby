import { component$, useStylesScoped$, useContext } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { CTX_Translate } from '~/root';
import style from "./style.scss?inline";

export default component$(() => {
    useStylesScoped$(style);
    const translates = useContext(CTX_Translate);

    return (
        <section class="wifi">
            <div class="welcome">
                <div class="title">
                    <h1>Rab Ráby Wifi <i class="bi bi-wifi"></i> </h1>
                    <p>{ translates.current.wifi?.title ?? 'Welcome' }</p>
                </div>
                <video src="/home/hero.mp4" loop={true} autoplay={true} muted={true} playsInline={true} />
            </div>
            <div class="box">
                <div class="menu">
                    <Link href="/menu">
                        <h2><i class="bi bi-cup-hot-fill"></i> Étlap</h2>
                    </Link>
                </div>
                <div class="about">
                    <Link href="/menu">
                        <h2><i class="bi bi-person-circle"></i> Rólunk</h2>
                    </Link>
                </div>
                <div class="about">
                    <Link href="/menu">
                        <h2><i class="bi bi-people-fill"></i> Csoport</h2>
                    </Link>
                </div>
                <div class="about">
                    <Link href="/menu">
                        <h2><i class="bi bi-telephone-fill"></i> Kapcsolat</h2>
                    </Link>
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
  title: "Rab Ráby WIFI",
  meta: [
    {
      name: "description",
      content: "Rab Ráby Restaurant",
    },
  ],
};
