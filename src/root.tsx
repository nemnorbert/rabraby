import { component$, createContextId, useContextProvider, useStore } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
  useLocation
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.scss";
import loadLocales from "./utils/loadLocales";
import config from "~/config/general.json";
import type { Translates } from "~/types/translates";
import type { FoodModuleType } from "~/types/food_module";
export const CTX_Translate = createContextId<Translates>('CTX_Translate');
export const CTX_FoodModule = createContextId<FoodModuleType>('CTX_FoodModule');

// Import Translation Data
const language = "en";
const importedTranslation = await loadLocales(language);

export default component$(() => {

  /*
  const loc = useLocation();
  const locale = loc.url.pathname.split('/')[1] || '';
  const isLang = config.languages.includes(locale)
  console.log(isLang ? `nyelv kiválasztva: ${locale}` : null);
  */

  // Translate CTX
  const translate = useStore({
    current: importedTranslation,
  });
  useContextProvider(CTX_Translate, translate);

  // Food Module CTX
  const foodModule = useStore({
    code: null,
    allergy: [],
    price: "",
    isDanger: false
  })
  useContextProvider(CTX_FoodModule, foodModule);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body lang={translate.current?.iso}>
        <RouterOutlet />
        <InnerComponent />
      </body>
    </QwikCityProvider>
  );
});

const InnerComponent = component$(() => {
  const loc = useLocation();
  const locale = loc.url.pathname.split('/')[1] || '';
  const isLang = config.languages.includes(locale);
  console.log(isLang ? `nyelv kiválasztva: ${locale}` : null);

  return (
    // A tartalom ami a helyhez kapcsolódik
  );
});