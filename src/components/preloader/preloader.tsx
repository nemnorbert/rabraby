
import { component$, useStylesScoped$ } from '@builder.io/qwik';

import style from "./preloader.scss?inline";

const menuItems = {
    home: {hu: "Főoldal", link: "/"},
    menu: {hu: "Étlap", link: "/menu"},
    about: {hu: "Rólunk", link: "/about"},
    group: {hu: "Csoport", link: "/group"},
    contact: {hu: "Kapcsolat", link: "/contact"}
}
const menuItemsArray = Object.entries(menuItems);

export default component$(() => {
    useStylesScoped$(style);

    return (<>

    </>)
    });