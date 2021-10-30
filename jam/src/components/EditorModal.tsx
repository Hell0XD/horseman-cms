
import React, { useState } from "react";
import { toast } from "react-toastify";
import Editor from "./RichTextEditor/RichTextEditor";
import ColoredPanel from "./ColoredPanel";
import Input from "./Input";

import { ReactComponent as Close } from "../icons/Close.svg";
import { ReactComponent as Publish } from "../icons/Publish.svg";
import { apiNewPost } from "../api/lib";
import { useRecoilState } from "recoil";
import { jwt_state } from "../state";

interface EditorModalProps {
    closeModal: () => void;
}


export function EditorModal({closeModal}: EditorModalProps) {
    let getContent = () => "";

    const [postName, setPostName] = useState("");
    const [postCategory, setPostCategory] = useState("");

    const [jwt] = useRecoilState(jwt_state);

    return (
        <>
            <div className="flex justify-between">
                <div className="flex space-x-3 mb-[0.5rem]">
                    <Input onChange={(e) => setPostName((e.target as any).value)} placeholder="Name of post" />
                    <Input onChange={(e) => setPostCategory((e.target as any).value)}  placeholder="Category" />
                </div>
                <div className="flex justify-end space-x-2 mb-[0.5rem]">
                    <ColoredPanel onClick={() => closeModal()} className="flex py-[0.25rem] px-[1rem] items-center cursor-pointer" color1="#FF6A8E" color2="#EF476F">
                        <Close />
                    </ColoredPanel>
                    <ColoredPanel onClick={() => {
                        apiNewPost({
                            name: postName,
                            category: postCategory,
                            content: getContent(),
                            date: Math.round(Date.now() / 1000).toString(),
                        }, jwt).then(() => {
                            toast.success("Post has beed published");
                            closeModal();
                        }).catch(() => toast.error("Failed to publish post"));
                    }} className="flex px-[1rem] items-center cursor-pointer" color1="#0FFABD" color2="#06D9A2">
                        <Publish />
                    </ColoredPanel>
                </div>
            </div>
            <Editor setGetter={(f) => getContent = f} />
        </>
    );
}