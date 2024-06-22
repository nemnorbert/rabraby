import { component$, useStylesScoped$, $ } from "@builder.io/qwik";
import style from "./food.scss?inline";
import type { TranslatesCurrent } from "~/types/translates";
import menuJson from "~/config/menu.json";
import configJson from '~/config/general.json';
import type { Config } from '~/types/general_config';
const config: Config = configJson;

interface Props {
    code: string,
    translate?: TranslatesCurrent;
    allergies: {
        selected: string[];
    };
    isOpen: {
        open?: string;
        allergy?: string[];
    };
}

export default component$((props: Props) => {
    useStylesScoped$(style);

    const code = props.code;
    const translate = props.translate;
    const iso = translate?.iso;
    const isOpen = props.isOpen.open;
    const allergyNumbers = menuJson.menu[code].allergy;
    const allergies = props.allergies.selected;
    const foodAllergy = allergyNumbers.map(item => config.menu.allergy[item-1])

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
                        <i class="bi bi-exclamation-triangle-fill"></i> { translate?.menu.allergy?.one ?? "" }
                    </div> 
                }
                <img 
                    height={400} 
                    width={400} 
                    decoding="async"
                    loading="lazy"
                    src={`/src/media/foods/${code}_400px.webp`} 
                    alt={menuJson.foods?.[code].en} />
            </div>

            <div class="title">{ menuJson.foods?.[code]?.[iso] ?? menuJson.foods?.[code].en }</div>
            <div class="buttons">
                <div class="huf">{toHuf(menuJson.menu[code].huf)}</div>
            </div>
        </div>
    );
});