import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./mobilemenu.scss?inline"

export default component$((props) => {
  useStylesScoped$(style);

  return (
    <div id="mobile-menu" class={props.isOpen.value ? 'active' : undefined}>
        
        <nav>
            <div>Főoldal</div>
            <div>Teszt</div>
        </nav>

        <div onClick$={() => props.isOpen.value = false}>Close</div>
    </div>
  );
});