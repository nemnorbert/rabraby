import type { Config } from "~/types/general_config";
import type { TranslatesCurrent } from "~/types/translates";
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import configJson from "~/config/general.json";
import style from "./alerts.scss?inline";

const config: Config = configJson;
interface Props {
    translate?: TranslatesCurrent;
}

export default component$((props: Props) => {
    const translate = props.translate;
    useStylesScoped$(style);
    const lang = translate?.iso ?? "en";
    const alerts = config.alerts?.[lang] ?? [];

    if (alerts.length === 0) {
        return undefined;
    }

    return (
        <div class="alerts">
            {
                alerts.map((item, key: number) => (
                    (item.color && item.message) &&
                    <div key={key} class={item.color}>
                        {item.message}
                    </div>
                ))
            }
        </div>
    );
});