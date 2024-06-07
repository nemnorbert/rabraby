import { Slot, component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./modul.scss?inline"

export default component$(() => {
  useStylesScoped$(style);
  return (
    <div>
        <div class="top">
            <div class="title">
                <Slot name="title" />
            </div>
            <div class="close">Bezárás</div>
        </div>
        <div class="content">
            <Slot />
        </div>
    </div>
  );
});