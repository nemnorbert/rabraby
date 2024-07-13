import { component$, Slot, useContext, useTask$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { isServer } from '@builder.io/qwik/build';
import type { RequestHandler, DocumentHead } from "@builder.io/qwik-city";

import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Contact from "~/components/contact/contact";
import { CTX_Translate } from '~/root';
import loadLocales from '~/utils/loadLocales';
import checkLang from "~/utils/checkLang";

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
  const pathname = requestEvent.pathname;
  const userLang = requestEvent.request.headers.get('accept-language')?.substring(0, 2) || '';
  const lang = checkLang(pathname, userLang);
  const translateData = await loadLocales(lang);
  const metaData = {
    title: translateData?.home.title || 'Rab Ráby', 
    description: translateData?.home.title || ''
  }

  return { lang, translateData, metaData };
});

export default component$(() => {
  const translates = useContext(CTX_Translate);
  const { lang, translateData } = useTranslationLoader().value;

  useTask$(async () => {
    if (lang !== translates.current.iso && translateData) {
      translates.current = translateData;
    }
  });
  
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