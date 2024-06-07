import { component$, Slot, useContext } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Szechenyi from "../components/szechenyi/szechenyi";
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
      <Szechenyi />
    </>
  );
});