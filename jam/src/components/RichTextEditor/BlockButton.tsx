
import React from "react";
import { useSlate } from "slate-react";
import {isBlock, modifyBlock } from "./RichTextEditor.lib";
import { ElementTypes,} from "./RichTextEditor.types";

import { ReactComponent as  FormatH1} from "../../icons/FormatH1.svg";
import { ReactComponent as  FormatH1Light} from "../../icons/FormatH1Light.svg";
import { ReactComponent as  FormatH2} from "../../icons/FormatH2.svg";
import { ReactComponent as  FormatH2Light} from "../../icons/FormatH2Light.svg";
import { ReactComponent as  FormatH3} from "../../icons/FormatH3.svg";
import { ReactComponent as  FormatH3Light} from "../../icons/FormatH3Light.svg";


interface BlockButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    block: ElementTypes;
}

export default function BlockButton({block, ...rest}: BlockButtonProps) {
    const editor = useSlate();

    let activeIcon, lightIcon;
    switch (block) {
    case ElementTypes.heading1:
        activeIcon = <FormatH1 width="20" height="20"/>, 
        lightIcon = <FormatH1Light width="20" height="20" />;
        break;
    case ElementTypes.heading2:
        activeIcon = <FormatH2 width="20" height="20"/>, 
        lightIcon = <FormatH2Light width="20" height="20" />;
        break;
    case ElementTypes.heading3:
        activeIcon = <FormatH3 width="20" height="20"/>, 
        lightIcon = <FormatH3Light width="20" height="20" />;
        break;
    }

    return (
        <button 
            className="py-[0.5rem] px-[0.25rem] h-full"
            {...rest}
            onMouseDown={(e) => {
                e.preventDefault();
                modifyBlock(editor, block);
            }}
        >
            {isBlock(editor, block) ? activeIcon : lightIcon}
        </button>
    );
}