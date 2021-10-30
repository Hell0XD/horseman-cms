import React, { useEffect, useState } from "react";
import ColoredPanel from "../components/ColoredPanel";
import Input from "../components/Input";
import DarkPanel from "../components/DarkPanel";
import Panel from "../components/Panel";
import Modal from "react-modal";

import {ReactComponent as Search} from "../icons/Search.svg";
import {ReactComponent as New} from "../icons/New.svg";
import {ReactComponent as Arrow} from "../icons/Arrow.svg";
import { ReactComponent as Close } from "../icons/Close.svg";
import { EditorModal } from "../components/EditorModal";
import { apiDeletePost, apiGetPosts, apiGetPostsBody, Posts as PostsType } from "../api/lib";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { jwt_state } from "../state";


interface PostProps {
    name: string;
    onDelete: (name: string) => void
}

function Post({name, onDelete}: PostProps) {
    return (
        <Panel className="flex items-center justify-between  mx-[1rem] mt-[1rem] text-[1.125rem] py-[0.5rem] px-[0.75rem]">
            <p className="ml-[0.5rem]">{name}</p>
            <div className="flex space-x-2">
                <ColoredPanel onClick={() => onDelete(name)} className="cursor-pointer flex items-center py-[0.5rem] px-[1.5rem]" color1="#FF6A8E" color2="#EF476F">
                    <Close />
                </ColoredPanel>
            </div>
        </Panel>
    );
}

export default function Posts() {
    const [isEditorOpen, setEditorOpen] = useState(false);

    const [postName, setPostName] = useState("");
    const [page, setPage] = useState(0);
    const [jwt] = useRecoilState(jwt_state);
    
    const [posts, setPosts] = useState<Array<PostsType>>([]);

    function fetchData() {
        const options: apiGetPostsBody = {};
        if (postName.trim() !== "") options.name = postName;
        options.limit = 5;
        options.offset = options.limit * page;

        apiGetPosts(options).then(newPosts => setPosts(newPosts)).catch(() => toast.error("Failed to load posts"));
    }

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <div className="flex h-full">
            <Modal className="absolute inset-[20%] p-[1rem] bg-white outline-none flex flex-col" isOpen={isEditorOpen}>
                <EditorModal closeModal={() => setEditorOpen(false)}  />
            </Modal>


            <div className="flex-1 flex flex-col ml-[2rem] my-[3rem] mr-[3rem]">
                <div className="flex">
                    <Input onChange={(e) => setPostName((e.target as any).value)} className="flex-1 mr-[1rem]" placeholder="search" />
                    <ColoredPanel onClick={fetchData} className="cursor-pointer flex items-center px-[2.5rem]" color1="#17AFE1" color2="#118AB2">
                        <Search />
                    </ColoredPanel>

                    <ColoredPanel onClick={() => setEditorOpen(true)} className="ml-[1rem] cursor-pointer flex items-center px-[2.5rem]" color1="#0FFABD" color2="#06D9A2">
                        <New />
                    </ColoredPanel>
                </div>

                <DarkPanel className="flex-1 flex flex-col justify-between mt-[1rem] pb-[1rem] w-full bg">
                    {posts.map((post) => <Post onDelete={(name) => {
                        apiDeletePost(name, jwt).then(() => {
                            posts.splice(posts.indexOf(post), 1);

                            setPosts(posts);
                            toast.success("Succesfully deleted post");
                        }).catch(() => toast.error("Failed to delete post"));
                    }} key={post.name} name={post.name}/>)}
                </DarkPanel>

                <div className="flex justify-end space-x-2 mt-[1rem]">
                    <ColoredPanel onClick={() => {
                        if (page <= 0) return; 
                        setPage(page - 1);
                    }} className="flex items-center p-[0.45rem] cursor-pointer" color1="#17AFE1" color2="#118AB2">
                        <Arrow className="rotate-180" />
                    </ColoredPanel>
                    <Panel className="flex justify-between py-[0.5rem] w-[3rem] px-[1rem] text-white text-[1.125rem]">
                        <div className="select-none flex-1 text-center">
                            {page}
                        </div>
                    </Panel>
                    <ColoredPanel onClick={() => setPage(page + 1)} className="flex items-center p-[0.45rem] cursor-pointer" color1="#17AFE1" color2="#118AB2">
                        <Arrow />
                    </ColoredPanel>
                </div>
            </div>
        </div>
    );
}