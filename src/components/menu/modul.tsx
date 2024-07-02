import { component$, useStylesScoped$, useContext, $ } from "@builder.io/qwik";
import menuJson from "~/config/menu.json";
import { CTX_Translate } from '~/root';
import style from "./modul.scss?inline";
import type { Menu } from "~/types/menu_config";
import type { Open } from "~/types/isOpen";

const menuData: Menu = menuJson;

interface Props {
  isOpen: Open;
}

// Functions
export function generateSrcSet(imageName: string, sizes: number[], format: string = 'webp'): string {
  return sizes.map(size => `/foods/${imageName}-${size}.${format} ${size}w`).join(', ');
}

function generateSizes(sizes: number[]): string {
  return sizes.map(size => `(max-width: ${size}px) ${size}px`).join(', ') + ', 100vw';
}

export default component$((props: Props) => {
    useStylesScoped$(style);
    const translate = useContext(CTX_Translate);
    const code = props.isOpen.open ?? "";
    const allergy = props.isOpen.allergy ?? [];
    const price = props.isOpen.price || "";
    const lang = translate.current.iso;
    const title = menuData.foods[code]?.[lang] || menuData.foods[code]?.en || "";

    const sizes = [200, 400, 800];
    const srcSet = generateSrcSet(code, sizes);
    const sizesAttr = generateSizes(sizes);

    const purgeClose = $(() => {
      props.isOpen.open = "";
      props.isOpen.allergy = [];
      props.isOpen.price = "";
    });

    return (
        <div class={code ? "modul open" : "modul"}>
          <div class="box">
            <div class="media">
              <div class="price">{ price }</div>
              { props.isOpen.open &&
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