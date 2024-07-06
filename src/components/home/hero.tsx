import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./hero.scss?inline"
import heroImage from "/home/hero.webp";
import heroVideo from "/home/hero.mp4";
import Alerts from "../alerts/alerts";
import type { TranslatesCurrent } from "~/types/translates";
import configJson from '~/config/general.json';
import type { Config } from '~/types/general_config';
const config: Config = configJson;

interface Props {
  translate: TranslatesCurrent;
}

export default component$((props: Props) => {
  useStylesScoped$(style);
  const translate = props.translate;
  const welcomeArray = Object.entries(translate.home.buttons);

  return (
    <section id="home">
        <div class="welcome">
          <Alerts translate={translate} />
          <div class="title">
              <h1>{ translate.home.title }</h1>
              <p>{ translate.home.description }</p>
              <div class="btns">
                {
                  welcomeArray.map(([key, value]) => (
                    <button class="btn" key={key} 
                      onClick$={() => console.log("gomb:", key)}>
                        <i class={`bi bi-${config.home.btns[key]}`}></i> {value}
                    </button>
                  ))
                }
              </div>
          </div>
          <div class="media">
            { false ? 
              <img src={heroImage} alt="" /> : 
              <video src={heroVideo} loop={true} autoplay={true} poster={heroImage} muted={true} playsInline={true} />
            }
          </div>
        </div>

        <div class="important">
          Étlap
        </div>

        <div class="opentime">
          Nyitvatartás
        </div>

        <div class="reservation">
          <h2>{ translate.reservation.title }</h2>
          <a class="phone" href={ "tel:" + config.contact.phone.link }>
            <i class="bi bi-telephone-fill"></i>
            { config.contact.phone.link }
          </a>
          <p>Online:</p>
          <div class="social">
            {
              Object.entries(config.contact).map(([key, value]) => (
                value.social && 
                <a key={key} href={value.link} target="_blank">
                  <i class={`bi bi-${value.icon}`}></i>
                </a>
              ))
            }
          </div>
        </div>
    </section>
  );
});