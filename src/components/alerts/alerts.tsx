import { component$, useStylesScoped$ } from "@builder.io/qwik";
import config from "~/config/config";
import style from "./alerts.scss?inline";

export default component$(({ translate }) => {
    useStylesScoped$(style);
    const lang = translate?.iso ?? "en";
    const alerts = config?.alerts?.[lang] ?? [];

    if (alerts.length === 0) {
        return undefined;
    }

    return (
        <div class="alerts">
            {
                alerts.map((item, key: number) => (
                    <div key={key} class={item?.color ?? undefined}>
                        {item.message}
                    </div>
                ))
            }
        </div>
    );
});