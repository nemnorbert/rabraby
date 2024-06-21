
import { component$, useStylesScoped$, useSignal, useContext } from '@builder.io/qwik';
import { Link, useLocation } from "@builder.io/qwik-city";
import { CTX_Translate } from '~/root';
import { BsTelephoneFill } from "@qwikest/icons/bootstrap";

import ImgRabrabyBlack from '~/media/logo/rabraby-black.webp?jsx';
import LangSwitcher from '~/components/langswitcher/langswitcher';
import style from "./header.scss?inline";
import MobileMenu from '../mobilemenu/mobilemenu';
import configJson from '~/config/general.json';
import type { Config } from '~/types/general_config';
const config: Config = configJson;
const menuItems = Object.entries(config.navigation);

export default component$(() => {
    useStylesScoped$(style);
    const mobileIsOpen = useSignal(false);
    const translate = useContext(CTX_Translate);
    const location = useLocation();

    return (<>
        <div class="topbar">
            { config.contact.phone.link ?
                <a href={ "tel:" + config.contact.phone.link }>
                    <BsTelephoneFill /> { config.contact.phone.link }
                </a> : ''
            }
        </div>
        <header>
            <div class="menu">
                <Link href='/' class="logo">
                    <ImgRabrabyBlack alt="Rab Ráby Logo" />
                </Link>

                <div class="right">
                    <nav class="desktop-menu">
                        <ul>
                            {
                                menuItems.map(([key, value]) => (
                                    <li key={key}>
                                        <Link 
                                            class={location.url.pathname === value.link ? 'current' : undefined}
                                            href={value.link}
                                        >
                                            {translate.current.navigation[key] ?? key}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                    <LangSwitcher />
                    <div class="mobile-toggle" onClick$={() => mobileIsOpen.value = true}>
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>
        </header>
        <MobileMenu isOpen={mobileIsOpen} />
    </>)
    });