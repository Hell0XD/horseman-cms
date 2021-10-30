
import React from "react";
import { useSlate } from "slate-react";
import { hasModificator, modifyText } from "./RichTextEditor.lib";
import { TextModifiers } from "./RichTextEditor.types";

import { ReactComponent as FormatBold } from "../../icons/FormatBold.svg";
import { ReactComponent as FormatBoldLight } from "../../icons/FormatBoldLight.svg";
import { ReactComponent as FormatItalic } from "../../icons/FormatItalic.svg";
import { ReactComponent as FormatItalicLight } from "../../icons/FormatItalicLight.svg";


interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    modifier: TextModifiers;
}

export default function Button({modifier, ...rest}: ButtonProps) {
    const editor = useSlate();

    const {activeIcon, lightIcon} = ({
        "bold": {
            activeIcon: <FormatBold width="20" height="20"/>, 
            lightIcon: <FormatBoldLight width="20" height="20" />
        },
        "italic": {
            activeIcon: <FormatItalic width="20" height="20" />, 
            lightIcon: <FormatItalicLight width="20" height="20" />
        }
    })[modifier];

    return (
        <button 
            className="py-[0.5rem] px-[0.25rem] h-full"
            {...rest}
            onMouseDown={(e) => {
                e.preventDefault();
                modifyText(editor, modifier);
            }}
        >
            {hasModificator(editor, modifier) ? activeIcon : lightIcon}
        </button>
    );
}