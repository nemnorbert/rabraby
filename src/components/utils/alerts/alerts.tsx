import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./alerts.scss?inline";

interface Props {
    alerts?: any;
}

export default component$((props: Props) => {
    useStylesScoped$(style);
    const {alerts} = props;
    if (alerts.length === 0) return undefined;

    return (
        <div class="alerts">
            {
                alerts.map((item: any, key: number) => (
                    (item.color && item.message) &&
                    <div key={key} class={item.color}>
                        <i class={`bi bi-${item.icon ?? 'chat-dots-fill'}`}></i> {item.message}
                    </div>
                ))
            }
        </div>
    );
});