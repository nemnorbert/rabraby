import { component$ } from "@builder.io/qwik";
import { Link } from '@builder.io/qwik-city';
import "./szechenyi.scss";
const szechenyi = '/szechenyi.png';

export default component$(() => {

  return (
    <Link id="szechenyi" href="/tenders">
      <img width="250" height="175" src={szechenyi} alt="Logo of Szechenyi2020" />
    </Link>
  );
});