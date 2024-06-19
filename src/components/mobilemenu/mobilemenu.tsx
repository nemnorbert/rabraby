import { component$, useStylesScoped$, useContext } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import style from "./mobilemenu.scss?inline";
import config from '~/config/config';
import { CTX_Translate } from '~/root';
const menuItems = Object.entries(config.navigation);

export default component$((props) => {
  useStylesScoped$(style);
  const translate = useContext(CTX_Translate);
  const location = useLocation();

  return (
    <div id="mobile-menu" class={props.isOpen.value ? 'active' : undefined}>
        
        <nav>
            {
              menuItems.map(([key, value]) => (
                <button key={key} onClick$={() => props.isOpen.value = false}>
                    <Link 
                        class={location.url.pathname === value.link ? 'current' : undefined}
                        href={value.link}
                    >
                        {translate?.current?.navigation?.[key] ?? key}
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