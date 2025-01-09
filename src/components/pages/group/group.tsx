import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { CTX_Translate } from '~/root';
import style from "./group.scss?inline";
import groupMenu from "~/config/group_2025.json";
import Hero from "~/components/hero/hero";

export default component$(() => {
  useStylesScoped$(style);
  const translates = useContext(CTX_Translate);
  const lang = translates.current.iso || 'en';
  const isSupported = ['hu','en'].includes(lang);
  const thisYear = "2025";

  return (
    <>
      <Hero title={`${translates.current.groups.title} ${thisYear}`} video={true} image="group" />
      <div class="container">
        <div class="menu">

          <div class="info">
            {
              <a href={`/pdf/group_2025_${lang}.pdf`} target="_blank" rel="noreferrer" class="pdf">
                <i class="bi bi-file-pdf-fill"></i> PDF
              </a>
            }
            {
              <a href={`/pdf/group_2025_${lang}.xml`} target="_blank" rel="noreferrer" class="word">
                <i class="bi bi-file-earmark-word-fill"></i> Word
              </a>
            }
            {!isSupported && (
              <div class="alert">
                <i class="bi bi-translate"></i> This part of the site is not translated into this language
              </div>
            )}
          </div>

          <div class="content">
            {
              Object.entries(groupMenu.menus).map(([key, {id, items, price}]) => (
                <div key={key} class="item">
                  <div class="top">
                    <div class="name">Menu-{id}</div>
                    <div class="price">{price}€</div>
                  </div>
                  <ul class="details">
                  {
                    items.map((itemId: number) => {
                      const dish = groupMenu.dishes.find((dish: any) => dish.id == itemId); // Az ételt a `id` alapján keresem
                      const dishName = dish ? (dish[lang as 'hu' | 'en'] || dish['en'] || '?') : '?'; // Ha nem találjuk, akkor kérdőjelet jelenítünk meg
                      return <li key={itemId}>{dishName}</li>;
                    })
                  }
                  </ul>
                </div>
              ))
            }
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