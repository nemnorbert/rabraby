import configJson from "../config/general.json";

interface Config {
  languages: string[];
  paths: { [key: string]: { path: string; main: boolean } };
}

const config: Config = configJson;

const routes = config.languages.map(lang => ({
  prefix: lang,
  paths: Object.keys(config.paths).reduce((acc, key) => {
    acc[key] = key;
    return acc;
  }, {} as { [key: string]: string })
}));

export default {
  rewriteRoutes: routes
};