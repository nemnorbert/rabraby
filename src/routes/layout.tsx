import { component$, Slot, useContext } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler, DocumentHead } from "@builder.io/qwik-city";

import loadLocales from '~/utils/loadLocales';
import { langCheck } from "~/utils/langValid";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Contact from "~/components/contact/contact";
import { CTX_Translate } from '~/root';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export const useTranslationLoader = routeLoader$(async (requestEvent) => {
  const pathname = requestEvent.pathname || '/';
  const userLang = requestEvent.request.headers.get('accept-language') || '';
  const lang = langCheck(pathname, userLang);
  const translates = await loadLocales(lang);

  const metaData = {
    title: translates?.home.title, 
    description: translates?.home.description || ''
  }
  
  return { metaData };
});

export default component$(() => {
  const translates = useContext(CTX_Translate);
  
  return (
    <>
      <Header />
      <main>
        <Slot />
        <Contact  translate={translates.current} />
      </main>
      <Footer />
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const { metaData } = resolveValue(useTranslationLoader);

  return {
    title: metaData.title,
    meta: [
      {
        name: "description",
        content: metaData.description,
      },
    ],
  };
};