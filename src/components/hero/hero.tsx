import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./hero.scss?inline";
import { buildSrcSet, buildSizes } from "~/utils/buildImages";

interface Props {
    title?: string;
    image: string;
    bottom?: boolean;
    video?: boolean;
}

export default component$((props: Props) => {
    useStylesScoped$(style);
    const sizes = [200, 400, 800, 1000, 1200, 1500];
    const title = props.title || "";
    const bottom = props.bottom;
    const image = props.image;
    const video = props.video;
    const srcSet = buildSrcSet(image, sizes, ['hero']);
    const sizesAttr = buildSizes(sizes);

  return (
    <div class={ bottom ? "hero" : "hero round"}>
        <h1>{ title }</h1>
        { video ?
            <video 
                src={`/hero_video/${image}.mp4`} 
                poster={`/hero/${image}-800.webp`} 
                loop={true} 
                autoplay={true} 
                muted={true} 
                playsInline={true} 
            /> :
            <img 
                alt={`Cover photo of ${image}`} 
                src={`/hero/${image}-200.webp`} 
                srcset={srcSet}
                sizes={sizesAttr} 
                width={200}
                height={100}
            />
        }
        
    </div>
  );
});