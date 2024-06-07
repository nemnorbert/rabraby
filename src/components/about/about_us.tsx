import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from "./reviews.scss?inline";

interface Props {

}

export default component$((props: Props) => {
    useStylesScoped$(style);

    return (
        <div>
            <p>Az éttermet még a vasfüggöny fennállásának idején Németh János és családja alapította 1982-ben. Nevét Jókai Mór Rab Ráby című regénye főhőséről kapta, aki Szentendrén élt és II. József idején oroszlánrészt vállalt a korrupció elleni küzdelemben.
            Az épület, amiből az étterem lett kialakítva, több, mint 100 évvel ezelőtt még kovácsműhelyként működött. Egy néprajzi tárlaton túl, ritka érdekességek is találhatóak az étteremben.</p>
        </div>
    );
});