/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import {
  renderToStream,
  type RenderToStreamOptions,
} from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";
import Root from "./root";
import { langCheck } from "./utils/langValid";

export default function (opts: RenderToStreamOptions) {
  const pathName = opts.serverData?.qwikcity?.loadedRoute?.[0] || 'en';
  const userLang = opts.serverData?.requestHeaders['accept-language'];
  const lang = langCheck(pathName, userLang);

  return renderToStream(<Root lang={lang} pathName={pathName} />, {
    manifest,
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang,
      ...opts.containerAttributes,
    },
  });
}