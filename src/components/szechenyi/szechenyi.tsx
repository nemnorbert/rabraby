import szechenyi from '/szechenyi.png';
import { component$ } from "@builder.io/qwik";
import { Link } from '@builder.io/qwik-city';
import "./szechenyi.scss";

export default component$(() => {

  return (
    <Link id="szechenyi" href="/">
      <img width="250" height="175" src={szechenyi} alt="Logo of Szechenyi2020" />
    </Link>
  );
});