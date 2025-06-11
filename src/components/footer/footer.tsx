import configJson from "~/config/general.json";
import { component$, useContext } from "@builder.io/qwik";
import { Link } from '@builder.io/qwik-city';
import "./footer.scss";
import type { Config } from "~/types/general_config";
import { CTX_Translate } from '~/root';
import logo from "~/media/assets/logo.svg?raw";

const config: Config = configJson;

export default component$(() => {
  const translate = useContext(CTX_Translate);

  return (
    <footer>
      <div class="social">
        {
          Object.entries(config.contact).map(([key, {icon, social, blank, link}]) => (
            social &&
            <a 
              key={key} 
              target={blank ? '_blank' : undefined} 
              rel={blank ? 'noreferrer' : undefined}
              href={link}
            >
              <i class={`bi bi-${icon}`}></i>
            </a>
          ))
        }
      </div>

      <div class="top">
        <div class="logo">
          <Link href='/' class="logo" style={`fill: white`}>
            <div dangerouslySetInnerHTML={logo}></div>
          </Link>
          <div>anno 1982</div>
        </div>

        <div class="contact">
          <b>{ translate.current.navigation.contact ?? "Contact" }</b>
          {
            Object.entries(config.contact).map(([key, {icon, base, link, blank, href}]) => (
              base && 
              <a 
                key={key} 
                target={blank ? '_blank' : undefined}
                rel={blank ? 'noreferrer' : undefined}
                href={href ? `${href}:${link}` : link}
              >
                <i key={key} class={`bi bi-${icon}`}></i> {
                  translate.current.contact[key] ?? link
                }
              </a>
            ))
          }
        </div>

        <div>
          
        </div>
      </div>

      <div class="bottom">
        <div class="creator">
        </div>
      </div>
    </footer>
  );
});