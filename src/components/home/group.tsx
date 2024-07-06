import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./group.scss?inline"

interface Props {
  translate: any;
}

export default component$((props: Props) => {
  useStylesScoped$(style);
  const translate = props.translate;

  return (
    <section class="groups">
        <h2>Csoportok</h2>
    </section>
  );
});