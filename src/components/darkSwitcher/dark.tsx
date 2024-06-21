import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./dark.scss?inline";
import darkMode from "~/utils/darkmode";
 
export default component$(() => {
  useStylesScoped$(styles);

  return (
    <label class="switch">
      <input
        type="checkbox"
        id="hide-checkbox"
        onClick$={() => darkMode(true)}
      />
      <span class="slider round"></span>
    </label>
  );
});