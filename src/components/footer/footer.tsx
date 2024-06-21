import configJson from "~/config/general.json";
import { component$, useContext } from "@builder.io/qwik";
import { Link } from '@builder.io/qwik-city';
import "./footer.scss";
import type { Config } from "~/types/general_config";
import { CTX_Translate } from '~/root';
import rabrabyLogo from "/logo/rabraby-white.webp";
import adanorLogo from "/adanor.svg";

const config: Config = configJson;

export default component$(() => {
  const translate = useContext(CTX_Translate);

  return (
    <footer>
      <div class="social">
        {
          Object.entries(config.contact).map(([key, {icon, social, blank, link}]) => (
            social &&
            <a key={key} target={blank ? '_blank' : undefined} href={link}>
              <i class={`bi bi-${icon}`}></i>
            </a>
          ))
        }
      </div>

      <div class="top">
        <div>
          <Link href='/' class="logo">
            <img width="150" height="59" src={rabrabyLogo} alt="Logo of Rab Ráby" />
          </Link>
          <div>anno 1982</div>
        </div>

        <div class="contact">
          <b>{ translate.current.navigation.contact ?? "Contact" }</b>
          {
            Object.entries(config.contact).map(([key, {icon, base, link, blank, href}]) => (
              base && 
              <a key={key} target={
                blank ? '_blank' : undefined
              } href={
                href ? `${href}:${link}` : link
              }>
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
          <div>powered by</div>
          <a href="https://adanor.eu" target="_blank">
            <img width="120" height="21" src={adanorLogo} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
});