import { component$, Slot, useContext, useTask$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

//import loadLocales from '~/utils/loadLocales';
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Contact from "~/components/contact/contact";
import { CTX_Translate } from '~/root';
//import config from "~/config/general.json";

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

export default component$(() => {
  const translates = useContext(CTX_Translate);

  /*
  const loc = useLocation();
  const locale = loc.url.pathname.split('/')[1] || '';
  const isLang = config.languages.includes(locale)
  console.log(isLang ? `nyelv kiválasztva: ${locale}` : null);
  
  useTask$(async () => {
    if (isLang) {
      const data = await loadLocales(locale);
      if (data) {
        translates.current = data;
      }
    }
  });
  */
  
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