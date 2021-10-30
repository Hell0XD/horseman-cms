import { Descendant, Editor, Element as SlateElement, Transforms, Text } from "slate";
import { ElementTypes, TextModifiers } from "./RichTextEditor.types";
import escapeHtml from "escape-html";

export const isBlock = (editor: Editor, block: ElementTypes) => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === block,
    });

    return !!match;
};

export const modifyBlock = (editor: Editor, block: ElementTypes) => {
    Transforms.setNodes(editor, {
        type: isBlock(editor, block) ? ElementTypes.paragraph : block,
    });
};

export const hasModificator = (editor: Editor, modifier: TextModifiers) => {
    const marks = Editor.marks(editor);
    return marks && marks[modifier];
};

export const modifyText = (editor: Editor, modifier: TextModifiers) => {
    const marks = Editor.marks(editor);
    marks && marks[modifier] ? Editor.removeMark(editor, modifier) : Editor.addMark(editor, modifier, true);
};


function _serialize(node: Descendant): string {
    if (Text.isText(node)) {
        let string = escapeHtml(node.text);
        if (node.bold) 
            string = `<strong>${string}</strong>`;
        if (node.italic) 
            string = `<i>${string}</i>`;
        
        return string;
    }
    const children = node.children.map(n => _serialize(n)).join("");

    switch (node.type) {
    case ElementTypes.paragraph:
        return `<p>${children}</p>`;
    case ElementTypes.heading1:
        return `<h1>${children}</h1>`;
    case ElementTypes.heading2:
        return `<h2>${children}</h2>`;
    case ElementTypes.heading3:
        return `<h3>${children}</h3>`;
    }
}

export const serialize = (nodes: Array<Descendant>): string => 
    nodes.reduce((s, node) => s + _serialize(node), "").replaceAll(/<[^/>][^>]*><\/[^>]+>/gm, "");
