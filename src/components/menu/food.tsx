import { component$, useStylesScoped$, $ } from "@builder.io/qwik";
import style from "./food.scss?inline";
import type { TranslatesCurrent } from "~/types/translates";
import menuJson from "~/config/menu.json";
import configJson from '~/config/general.json';
import type { Config } from '~/types/general_config';
import type { Menu } from "~/types/menu_config";
import type { Open } from "~/types/isOpen";
const config: Config = configJson;
const menuData: Menu = menuJson;

interface Props {
    code: string,
    translate?: TranslatesCurrent;
    allergies: {
        selected: string[];
    };
    isOpen: Open;
}

// Functions
export function generateSrcSet(imageName: string, sizes: number[], format: string = 'webp'): string {
    return sizes.map(size => `/foods/${imageName}-${size}.${format} ${size}w`).join(', ');
}

export default component$((props: Props) => {
    useStylesScoped$(style);

    const code = props.code;
    const translate = props.translate;
    const lang = translate?.iso || "en";
    const title = menuData.foods[code][lang] || menuData.foods[code].en;
    const isOpen = props.isOpen.open;
    const allergyNumbers = menuData.menu[code].allergy;
    const allergies = props.allergies.selected;
    const foodAllergy = allergyNumbers.map(item => config.menu.allergy[item-1])

    const sizes = [200, 400];
    const srcSet = generateSrcSet(code, sizes);
    
    const toHuf = $((number: number | undefined) => {
        if (!number || number < 0 || number > 30000) {
            return "-";
        }
        return new Intl.NumberFormat('hu-HU', {
            style: 'currency',
            currency: 'HUF',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    })
    const openIt = $(() => {
        if (isOpen !== code) {
            props.isOpen.open = code;
            props.isOpen.allergy = foodAllergy;
            props.isOpen.price = toHuf(menuData.menu[code].huf);
        }
    })
    const isDanger = () => {
        return allergies.some(item => foodAllergy.includes(item));
    }

    return (
        <div class={isDanger() ? "item alert" : "item"} onClick$={openIt}>
            <div class="code">#{ code }</div>
            <div class="media">
                { isDanger() && <div class="allergy">
                        <i class="bi bi-exclamation-triangle-fill"></i> { translate?.menu.allergy.one ?? "" }
                    </div> 
                }
                <img 
                    height={200} 
                    width={200} 
                    decoding="async"
                    loading="lazy"
                    src={`/foods/${code}-200.webp`} 
                    srcset={srcSet}
                    sizes="(max-width: 350px) 400px,
                    (min-width: 1024px) 400px,
                    200px"
                    alt={menuData.foods[code].en} 
                />
            </div>

            <div class="title">{ title }</div>
            <div class="buttons">
                <div class="huf">{toHuf(menuData.menu[code].huf)}</div>
            </div>
        </div>
    );
});