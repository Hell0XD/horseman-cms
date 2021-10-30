import React, { useState, useMemo, useCallback } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from "slate-react";
import { withHistory } from "slate-history";

import "./RichTextEditor.scss";
import isHotkey from "is-hotkey";
import { ElementTypes, TextModifiers } from "./RichTextEditor.types";
import { modifyText, serialize } from "./RichTextEditor.lib";
import Button from "./Button";
import Toolbar from "./Toolbar";
import BlockButton from "./BlockButton";


const initialValue: Descendant[] = [
    {
        type: ElementTypes.paragraph,
        children: [
            { text: "" },
        ],
    },
];

const HOTKEYS: Array<[(e: any) => boolean, TextModifiers]> = Object.entries<TextModifiers>({
    "mod+b": "bold",
    "mod+i": "italic"
}).map(([hotkey, value]) => [isHotkey(hotkey), value]);


interface RichTextEditorProps {
    setGetter: (f: () => string) => void;
}

// @refresh reset
export default function RichTextEditor({ setGetter }: RichTextEditorProps) {
    const [value, setValue] = useState<Descendant[]>(initialValue);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);
    const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);

    setGetter(() => serialize(value));

    return (
        <Slate editor={editor} value={value} onChange={setValue}>
            <Toolbar className="flex">
                <Button modifier="bold"/>
                <Button modifier="italic"/>

                <BlockButton block={ElementTypes.heading1} />
                <BlockButton block={ElementTypes.heading2} />
                <BlockButton block={ElementTypes.heading3} />
            </Toolbar>

            <Editable

                id="RichTextEditor__editor"
                className="border-b-2 border-l-2 border-r-2 flex-1 p-[0.75rem]" 
                placeholder="Start writing your creative blog..."
                
                renderElement={renderElement}
                renderLeaf={renderLeaf}

                onKeyDown={(event) => {
                    const hotkey = HOTKEYS.find(([check]) => check(event));

                    if (!hotkey) return;
                    event.preventDefault();

                    modifyText(editor, hotkey[1]);
                }}
            />
        </Slate>
    );
}


const Element = ({ attributes, children, element }: RenderElementProps) => {
    switch (element.type) {
    case ElementTypes.paragraph:
        return <p {...attributes}>{children}</p>;
    case ElementTypes.heading1:
        return <h1 {...attributes}>{children}</h1>;
    case ElementTypes.heading2:
        return <h2 {...attributes}>{children}</h2>;
    case ElementTypes.heading3:
        return <h3 {...attributes}>{children}</h3>;
    }
};
    


const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    if (leaf.bold) children = <strong>{children}</strong>;
    if (leaf.italic) children = <i>{children}</i>;

    return <span {...attributes}>{children}</span>;
};



