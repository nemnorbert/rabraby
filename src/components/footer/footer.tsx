import config from "~/config";
import { component$, useContext } from "@builder.io/qwik";
import { Link } from '@builder.io/qwik-city';
import { BsPersonBadgeFill, BsTelephoneFill, BsGeoAltFill, BsEnvelopeFill } from "@qwikest/icons/bootstrap";
import "./footer.scss";
import { CTX_Translate } from '~/root';

import rabrabyLogo from "/logo/rabraby-white.webp";
import adanorLogo from "/adanor.svg";

export default component$(() => {
  const translate = useContext(CTX_Translate);

  return (
    <footer>
      <div class="social">
        
      </div>

      <div class="top">
        <div>
          <Link href='/' class="logo">
            <img width="150" height="59" src={rabrabyLogo} alt="Logo of Rab Ráby" />
          </Link>
          <div>anno 1982</div>
        </div>

        <div class="contact">
          <b>{ translate?.current?.navigation?.contact ?? "Contact" }</b>

          <a target="_blank" href={ config.contact.map.link }>
              <BsGeoAltFill /> { translate?.current?.contact?.map ?? "Map" }
          </a>
          <a href={`tel:${config.contact.phone.link}`}>
              <BsTelephoneFill /> { config?.contact?.phone?.link }
          </a>
          <a href={`mailto:${config.contact.email.link}`}>
              <BsEnvelopeFill /> { config?.contact?.email?.link }
          </a>
          <a target="_blank" href={ config.contact.card.link }>
              <BsPersonBadgeFill /> { translate?.current?.contact?.card ?? "Card" }
          </a>
        </div>

        <div>
          
        </div>
      </div>

      <div class="bottom">
        <div class="creator">
          <div>powered by</div>
          <a href="https://adanor.eu" target="_blank">
            <img width="120" height="21" src={adanorLogo} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
});