
import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

export type TextModifiers = "bold" | "italic";

export enum ElementTypes {
    paragraph,
    heading1,
    heading2,
    heading3
}

type CustomText = { 
    [key in TextModifiers]?: boolean;
} & {
    text: string;
}

interface ParagraphElement { 
    type: ElementTypes.paragraph; 
    children: CustomText[] 
}

interface HeadingElement {
    type: ElementTypes.heading1;
    children: CustomText[]
}

interface Heading2Element {
    type: ElementTypes.heading2;
    children: CustomText[]
}

interface Heading3Element {
    type: ElementTypes.heading3;
    children: CustomText[]
}

type CustomElement = ParagraphElement | HeadingElement | Heading2Element | Heading3Element;

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor
        Element: CustomElement
        Text: CustomText
    }
}