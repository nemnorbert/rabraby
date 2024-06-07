import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./hero.scss?inline"
import config from '~/config';

import heroImage from "/home/hero.webp";
import heroVideo from "/home/hero.mp4";
import Alerts from "../alerts/alerts";

export default component$((props) => {
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
                    onClick$={() => console.log("gomb:", key)}>{value}</button>
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
          <p>{ translate.reservation.phone }:</p>
          <a class="phone" href={ "tel:" + config.contact.phone.link }>
            { config.contact.phone.link }
          </a>
          <p>{ translate.reservation.online }:</p>
        </div>
    </section>
  );
});