import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./contact_info.scss?inline";
import configJson from "~/config/general.json";
import type { Config } from "~/types/general_config";
import type { TranslatesCurrent } from "~/types/translates";

const config: Config = configJson;
interface Props {
    translate: TranslatesCurrent;
}

export default component$((props: Props) => {
    useStylesScoped$(styles);
    const translate = props.translate;
    const faq = props.translate.faq;
    const company = Object.entries(config.company.data);
    const contact = Object.entries(config.contact);

    return (
        <section id="info">

            <div id="contact">
                <div class="title">
                    <i class="bi bi-telephone-fill"></i>
                    <div>{translate.navigation.contact ?? "Contact"}</div>
                </div>

                {
                    contact.map(([key, {base, blank, link, icon, href}]) => (
                        base && <a key={key} 
                            target={blank ? "_blank" : undefined} 
                            href={!href ? link : `${href}:${link}`}>
                                <i key={key} class={`bi bi-${icon}`}></i> {
                                    translate.contact[key] ?? link
                                }
                        </a>
                    ))
                }
            </div>


            <div id="faq">
                <div class="title">
                    <i class="bi bi-question-circle-fill"></i>
                    <div>{faq.title ?? "Faq"}</div>
                </div>
                {faq.questions.map(({question, answer}, key) => (
                    <details key={key}>
                        <summary>{question}</summary>
                        <p>{answer}</p>
                    </details>
                ))}
            </div>


            <div id="company">
                <div class="title">
                    <i class="bi bi-buildings-fill"></i>
                    <div>{translate.company.title ?? "Company"}</div>
                </div>
                <b>{ config.company.name }</b>
                {
                    company.map(([key, value]) => (
                        <div key={ key }>
                            <b>{ translate.company[key] ?? key }</b>
                            <p>{ value }</p>
                        </div>
                    ))
                }
            </div>

        </section>
    );
});