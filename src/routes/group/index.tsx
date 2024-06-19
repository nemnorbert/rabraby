import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { CTX_Translate } from '~/root';
import style from "./style.scss?inline";
import groupMenu from "~/config/groups.json";
import heroVideo from "~/media/groups/video.mp4";
import heroImage from "~/media/groups/head.webp";

export default component$(() => {
  useStylesScoped$(style);
  const translates = useContext(CTX_Translate);
  const allFood = groupMenu.food;
  const lang = translates.current.iso;

  return (
    <>
      <div class="container">
        <div class="hero">
          <div class="title">
            <h1>{translates.current.groups.title ?? "Groups"}</h1>
          </div>
          <div class="media">
            { false ? 
              <img src={heroImage} alt="" /> : 
              <video src={heroVideo} loop={true} autoplay={true} poster={heroImage} muted={true} playsInline={true} />
            }
          </div>
        </div>
        <div class="menu">
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
                          {allFood?.[name]?.[lang] ?? "?"}
                        </li>
                      ))
                    }
                  </ul>
                </div>
              ))
            }
          </div>
        </div>

        <div class="guide">
          <h2>{ translates.current.groups.guide }</h2>
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

export const head: DocumentHead = {
  title: "Rab Ráby",
  meta: [
    {
      name: "description",
      content: "Rab Ráby Restaurant",
    },
  ],
};