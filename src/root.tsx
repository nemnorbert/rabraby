import { component$, createContextId, useContextProvider, useStore } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import "./global.scss";
import type { Translates } from "~/types/translates";
export const CTX_Translate = createContextId<Translates>('CTX_Translate');
import loadTranslations from "./utils/loadLocales";

// Import Translation Data
const language = "hu";
const importedTranslation = await loadTranslations(language);

export default component$(() => {
  const translate = useStore({
    current: importedTranslation,
  });
  useContextProvider(CTX_Translate, translate);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body lang={translate.current?.iso ?? "en"}>
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});