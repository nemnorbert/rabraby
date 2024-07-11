import { component$, useStylesScoped$, useContext } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import style from "./mobilemenu.scss?inline";
import configJson from '~/config/general.json';
import type { Config } from '~/types/general_config';
import { CTX_Translate } from '~/root';

const config: Config = configJson;
const menuItems = Object.entries(config.paths);
interface Props {
  isOpen: {
    value?: boolean
  };
}

export default component$((props: Props) => {
  useStylesScoped$(style);
  const translate = useContext(CTX_Translate);
  const location = useLocation();

  return (
    <div id="mobile-menu" class={props.isOpen.value ? 'active' : undefined}>
        
        <nav>
            {
              menuItems.map(([key, value]) => (
                value.main && <button key={key} onClick$={() => props.isOpen.value = false}>
                    <Link 
                        class={location.url.pathname === value.path ? 'current' : undefined}
                        href={value.path}
                    >
                        {translate.current.navigation[key] ?? key}
                    </Link>
                </button>
              ))
            }  
        </nav>

        <div class="exit" onClick$={() => props.isOpen.value = false}>
          <i class="bi bi-x-lg"></i>
        </div>
    </div>
  );
});