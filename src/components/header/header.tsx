
import { component$, useStylesScoped$, useSignal, useContext } from '@builder.io/qwik';
import { Link, useLocation } from "@builder.io/qwik-city";
import { CTX_Translate } from '~/root';
import logo from '~/media/assets/logo.svg?raw';

import LangSwitcher from '~/components/langswitcher/langswitcher';
import style from "./header.scss?inline";
import MobileMenu from '../mobilemenu/mobilemenu';
import DarkMode from '~/components/darkmode/darkmode';
import configJson from '~/config/general.json';
import type { Config } from '~/types/general_config';

const config: Config = configJson;
const menuItems = Object.entries(config.paths);

export default component$(() => {
    useStylesScoped$(style);
    const mobileIsOpen = useSignal(false);
    const translate = useContext(CTX_Translate);
    const location = useLocation();

    const langPath = location.url.pathname.split('/')[1] || '';
    const isUrlLang = config.languages?.includes(langPath);
    const pathname = location.url.pathname;
    const pathResult = !isUrlLang ? pathname : pathname.slice(3);

    return (<>
        <div class="topbar">
            { config.contact.phone.link ?
                <a href={`tel:${config.contact.phone.link}`}>
                    <i class="bi bi-telephone-fill"></i> { config.contact.phone.link }
                </a> : ''
            }
        </div>
        <header>
            <div class="menu">
                <Link href='/' class="logo" style={`fill: var(--text-color)`}>
                    <div dangerouslySetInnerHTML={logo}></div>
                </Link>

                <div class="right">
                    <nav class="desktop-menu">
                        <ul>
                            {
                                menuItems.map(([key, value]) => (
                                    value.main && <li key={key}>
                                        <Link 
                                            class={pathResult === value.path ? 'current' : undefined}
                                            href={value.path}
                                        >
                                            {translate.current.navigation[key] ?? key}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                    <div class="dark">
                        <DarkMode />
                    </div>
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