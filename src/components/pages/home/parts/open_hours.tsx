import { component$, useStylesScoped$, useContext } from "@builder.io/qwik";
import style from "./open_hours.scss?inline";
import openData from "~/config/open_hours.json";
import { CTX_Translate } from "~/root";

export default component$(() => {
  useStylesScoped$(style);
  const translate = useContext(CTX_Translate);
  const days = openData.days;

  return (
    <div class="open_hours">
        <div class="title">{translate.current.open.title}</div>
        <div class="content">
            <div class="info">
                <i class="bi bi-clock-history"></i>
            </div>

            {
                Object.entries(openData.default).map(([key, {open, close}], index) => (
                    <div key={`${key}-${index}`} class={!open && 'closed'}>
                        <div class="d">
                            {translate.current.open.days[index] || days[index]}
                        </div>
                        <div class="time">
                            { !open && '-' }
                            {open && <div>{open}</div>}
                            {close && <div>{close}</div>}
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  );
});