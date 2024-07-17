import { component$, createContextId, useContextProvider, useStore, useTask$, $ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.scss";
import loadLocales from "~/utils/loadLocales"
import type { Translates } from "~/types/translates";
import type { FoodModuleType } from "~/types/food_module";
//import langBase from "../locales/en.json";
export const CTX_Translate = createContextId<Translates>('CTX_Translate');
export const CTX_FoodModule = createContextId<FoodModuleType>('CTX_FoodModule');

type Props = {
  lang?: string;
  pathName?: string;
}

export default component$((props: Props) => {
  const lang = props.lang || 'en';
  const pathName = props.pathName || '?';
  const translate: any = useStore({ current: {} });

  const loadData = $(async () => {
    const data = await loadLocales(lang);
    translate.current = data;
  });

  useTask$(async () => {
    await loadData();
  });

  useContextProvider(CTX_Translate, translate);

  // Food Module CTX
  const foodModule = useStore({ code: null, allergy: [], price: "", isDanger: false })
  useContextProvider(CTX_FoodModule, foodModule);

  return (
    <QwikCityProvider>
      <head lang={pathName}>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
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