import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./hero.scss?inline"
import Alerts from "../alerts/alerts";
import OpenHours from "./open_hours";
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

  const heroImage = "/home/hero.webp";
  const heroVideo = "/home/hero.mp4";

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
            {  
              <video src={heroVideo} loop={true} autoplay={true} poster={heroImage} muted={true} playsInline={true} />
            }
          </div>
        </div>

        <div class="opentime">
          <OpenHours />
        </div>

        <div class="reservation">
          <h2>{ translate.reservation.title }</h2>
          <a class="phone" href={ "tel:" + config.contact.phone.link }>
            <i class="bi bi-telephone-fill"></i>
            { config.contact.phone.link }
          </a>
          <p>{translate.reservation.online || "Online"}:</p>
          <div class="social">
            {
              Object.entries(config.contact).map(([key, value]) => (
                value.reservation && 
                <a 
                  key={key} 
                  href={value.href ? `${value.href}:${value.link}` : value.link}
                  target={value.href ? undefined : "_blank"}
                  rel={value.href ? undefined : "noreferrer"}
                >
                  <i class={`bi bi-${value.icon}`}></i>
                </a>
              ))
            }
          </div>
        </div>
    </section>
  );
});