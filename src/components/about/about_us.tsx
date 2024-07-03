import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./about_us.scss?inline";

interface Props {
    translate: {
        text?: string
    }
}

export default component$((props: Props) => {
    useStylesScoped$(style);
    const translates = props.translate;

    return (
        <div class="about">
            <div class="text">
                <h2>Rólunk</h2>
                <p>{translates.text}</p>
            </div>
            <div class="media">
                <video src="/hero_video/group.mp4" 
                    loop={true} 
                    autoplay={true} 
                    muted={true} 
                    playsInline={true} 
                />
            </div>
        </div>
    );
});