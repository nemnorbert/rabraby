import { component$, useStylesScoped$, useContext, $ } from "@builder.io/qwik";

import style from "./food.scss?inline";
import menuJson from "~/config/menu.json";
import configJson from '~/config/general.json';
import toHuf from '~/utils/convertToForint';
import { buildSrcSet } from "~/utils/buildImages";
import { CTX_FoodModule } from "~/root";

import type { TranslatesCurrent } from "~/types/translates";
import type { Config } from '~/types/general_config';
import type { Menu } from "~/types/menu_config";

const config: Config = configJson;
const menuData: Menu = menuJson;

interface Props {
    code: string,
    translate?: TranslatesCurrent;
    allergies?: { selected: string[]; };
    slider?: boolean;
}

export default component$((props: Props) => {
    useStylesScoped$(style);
    const foodModule = useContext(CTX_FoodModule);
    
    const code = props.code;
    const lang = props.translate?.iso || "en";
    const title = menuData.foods[code][lang] || menuData.foods[code].en;
    const slider = props.slider;
    const isOpen = foodModule.code;
    const allergyNumbers = menuData.menu[code].allergy;
    const allergies = props.allergies?.selected || [];
    const foodAllergy = allergyNumbers.map(item => config.menu.allergy[item-1])
    const danger = allergies.length > 0 && allergies.some(item => foodAllergy.includes(item));
    
    const sizes = [200, 400];
    const srcSet = buildSrcSet(code, sizes, ['foods']);
    
    const openIt = $(() => {
        if (isOpen !== code) {
            const danger = allergies.some(item => foodAllergy.includes(item));
            foodModule.code = code;
            foodModule.allergy = foodAllergy;
            foodModule.price = toHuf(menuData.menu[code].huf);
            foodModule.isDanger = danger;
        }
    })
    
    return (
        <div class={danger ? "item alert" : "item"} onClick$={openIt}>
            <div class="media">
                <div class="code">#{ code }</div>
                { danger && <div class="allergy">
                        <i class="bi bi-exclamation-triangle-fill"></i> { props.translate?.menu.allergy.one ?? "" }
                    </div> 
                }
                <img 
                    height={200} 
                    width={200} 
                    decoding="async"
                    loading="lazy"
                    src={`/foods/${code}-200.webp`} 
                    srcset={srcSet}
                    sizes={slider ? '200px' : `(max-width: 350px) 400px,
                    (min-width: 1024px) 400px,
                    200px`}
                    alt={menuData.foods[code].en} 
                />
            </div>

            <div class="title">{ title }</div>
            <div class="buttons">
                <div class="huf">
                    {toHuf(menuData.menu[code].huf)}
                </div>
            </div>
        </div>
    );
});