import { component$, useStylesScoped$, $ } from "@builder.io/qwik";
import menuJson from "~/config/menu.json";
import style from "./modul.scss?inline";

interface Props {
  isOpen: {
    open?: string;
    allergy?: string[];
  };
}

export default component$((props: Props) => {
    useStylesScoped$(style);
    const code = props.isOpen.open ?? "";
    const allergy = props.isOpen.allergy ?? [];

    const purgeClose = $(() => {
      props.isOpen.open = "";
      props.isOpen.allergy = [];
    })

    return (
        code && <div class={code ? "modul open" : "modul"}>
          <div class="close" onClick$={purgeClose}>Kilépés</div>
          <div class="media">
            <img src={`/src/media/foods/${code}_400px.webp`} alt="Image" />
          </div>
          <div class="title">
            {menuJson.foods[code]?.hu}

            {
              allergy.length && 
              <div class="allergens">
                {
                  allergy.map((item, key) => (
                    <div key={key}>{item}</div>
                  ))
                }
              </div>
            }
          </div>
        </div>
    );
});