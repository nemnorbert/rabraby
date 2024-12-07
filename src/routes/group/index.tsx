import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { CTX_Translate } from '~/root';
import style from "./style.scss?inline";
import groupMenu from "~/config/groups.json";
import Hero from "~/components/hero/hero";

export default component$(() => {
  useStylesScoped$(style);
  const translates = useContext(CTX_Translate);
  const allFood: any = groupMenu.food;
  const lang = translates.current.iso || 'en';
  const isSupported = ['hu','en'].includes(lang);
  const thisYear = "2025";

  return (
    <>
      <Hero title={`${translates.current.groups.title} ${thisYear}`} video={true} bottom={true} image="group" />
      <div class="container">
        <div class="menu">

          <div class="info">
            {
              /*
                <a href="/pdf/group.pdf" target="_blank" rel="noreferrer" class="pdf">
                  <i class="bi bi-arrow-down-circle-fill"></i> PDF
                </a>
              */
            }
            {!isSupported && (
              <div class="alert">
                <i class="bi bi-translate"></i> This part of the site is not translated into this language
              </div>
            )}
          </div>

          <div class="content">
            {
              Object.entries(groupMenu.menu).map(([key, {price, food}]) => (
                <div key={key} class="item">
                  <div class="top">
                    <div class="name">Menu-{key}</div>
                    <div class="price">{price}€</div>
                  </div>
                  <ul class="details">
                    {
                      Object.entries(food).map(([key, {name}]) => (
                        <li key={key}>
                          {allFood?.[name]?.[lang] ?? allFood?.[name]?.['en'] ?? "?"}
                        </li>
                      ))
                    }
                  </ul>
                </div>
              ))
            }
          </div>
          <div>
            <b><i class="bi bi-cloud-upload"></i> 2025v1 - 2024.12.06.</b>
          </div>
        </div>

        <div class="guide">
          <h2><i class="bi bi-person-raised-hand"></i> { translates.current.groups.guide }</h2>
          {
            translates.current.groups.faq.map(({q, a}, key) => (
              <details key={key}>
                <summary>{ q }</summary>
                <p>{ a }</p>
              </details>
            ))
          }
        </div>
      </div>
    </>
  );
});