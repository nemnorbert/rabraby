import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./menu.scss?inline"

interface Props {
  translate: any;
}

export default component$((props: Props) => {
  useStylesScoped$(style);
  const translate = props.translate;

  return (
    <section class="menu">
        <h2>Kiemelt ételeink:</h2>
        <div>
            <div>Étel1</div>
            <div>Étel2</div>
        </div>
    </section>
  );
});