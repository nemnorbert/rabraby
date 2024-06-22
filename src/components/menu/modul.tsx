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
          <div class="box">
            <div class="media">
              <i class="bi bi-x-circle-fill close" onClick$={purgeClose}></i>
              <img src={`/src/media/foods/${code}_400px.webp`} alt="Image" />
            </div>
            <div class="content">
              <div class="title">
                {menuJson.foods[code]?.hu}
              </div>

              {
                allergy.length && 
                <div class="allergy">
                  <div>ALERRGY</div>
                  <div class="allergens">
                    {
                      allergy.map((item, key) => (
                        <div key={key}>{item}</div>
                      ))
                    }
                  </div>
                </div>
              }
            </div>
          </div>
          <div class="bg" onClick$={purgeClose}></div>
        </div>
    );
});