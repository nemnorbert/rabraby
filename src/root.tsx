import { component$, createContextId, useContextProvider, useStore } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.scss";
import type { Translates } from "~/types/translates";
import type { FoodModuleType } from "~/types/food_module";
import langBase from "../locales/en.json";
export const CTX_Translate = createContextId<Translates>('CTX_Translate');
export const CTX_FoodModule = createContextId<FoodModuleType>('CTX_FoodModule');


// Component
export default component$(() => {

  // Translate CTX
  const translate: any = useStore({current: langBase});
  useContextProvider(CTX_Translate, translate);

  // Food Module CTX
  const foodModule = useStore({code: null, allergy: [], price: "", isDanger: false})
  useContextProvider(CTX_FoodModule, foodModule);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body lang={translate.current.iso || 'en'}>
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});