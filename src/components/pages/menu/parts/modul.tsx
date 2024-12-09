import { component$, useStylesScoped$, useContext, $ } from "@builder.io/qwik";
import menuJson from "~/config/menu.json";
import { CTX_Translate } from '~/root';
import { CTX_FoodModule } from '~/root';
import style from "./modul.scss?inline";
import { buildSrcSet, buildSizes } from "~/utils/buildImages";
import type { Menu } from "~/types/menu_config";

const menuData: Menu = menuJson;

export default component$(() => {
    useStylesScoped$(style);
    const translate = useContext(CTX_Translate);
    const foodModule = useContext(CTX_FoodModule);

    const code = foodModule.code || "";
    const allergy = foodModule.allergy || [];
    const price = foodModule.price || "";
    const danger = foodModule.isDanger;
    const lang = translate.current.iso || 'en';
    const title = menuData.foods[code]?.[lang] || menuData.foods[code]?.en || "";

    const sizes = [200, 400, 800];
    const srcSet = buildSrcSet(code, sizes, ['foods']);
    const sizesAttr = buildSizes(sizes);

    const purgeClose = $(() => {
      foodModule.code = null;
      foodModule.price = "";
      foodModule.allergy = [];
      foodModule.isDanger = false;
    });

    return (
        <div class={code ? "modul open" : "modul"}>
          <div class="box">
            <div class="media">
              <div class="code">#{code}</div>
              <div class="price">{ price }</div>
              {
                danger && <div class="allergy_alert">{ translate.current.menu.allergy.one }</div>
              }
              { foodModule.code &&
                <img 
                  height={200} 
                  width={200} 
                  decoding="async"
                  loading="lazy"
                  src={`/foods/${code}-200.webp`} 
                  srcset={srcSet}
                  sizes={sizesAttr}
                  alt="" 
                />
              }
            </div>
            <div class="content">
              <div class="title">{ title }</div>
              {
                allergy.length > 0 && 
                <div class="allergy">
                  <div>{ translate.current.menu.allergy.title }:</div>
                  <div class="allergens">
                    {
                      allergy.map((item, key) => (
                        <div key={key}>{ translate.current.menu.allergy[item] }</div>
                      ))
                    }
                  </div>
                </div>
              }
            </div>
          </div>
          <i class="bi bi-x-circle-fill close" onClick$={ purgeClose }></i>
          <div class="bg" onClick$={ purgeClose }></div>
        </div>
    );
});