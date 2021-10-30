import React, { useState } from "react";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { apiIsLoged, apiLogin } from "../api/lib";
import ColoredPanel from "../components/ColoredPanel";
import Input from "../components/Input";
import Panel from "../components/Panel";

import { ReactComponent as Github } from "../icons/Github.svg";
import { jwt_state } from "../state";

export default function Home() {

    const [jwt, setJwt] = useRecoilState(jwt_state);

    const history = useHistory();

    const [isLoginOpen, setLoginOpen] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <Modal className="absolute inset-[35%] outline-none" isOpen={isLoginOpen}>
                <Panel className="p-[1.5rem]">
                    <div className="flex flex-col space-y-4 mb-[1rem]">
                        <Input onChange={(e) => setEmail((e.target as any).value)} placeholder="email" />
                        <Input onChange={(e) => setPassword((e.target as any).value)} placeholder="password" type="password" />
                    </div>

                    <ColoredPanel className="cursor-pointer text-white py-[0.45rem] text-[1.5rem] text-center" onClick={() => {
                        apiLogin({
                            email,
                            password
                        }).then((jwt) => {
                            if (jwt == null) 
                                toast.error("Invalid credentials");
                            else {
                                setJwt(jwt);
                                history.push("/cms");
                                toast.success("Successfully loged in");
                            }
                        }).catch(() => {
                            toast.error("Invalid credentials");
                        });   
                    }} color1="#FFD166" color2="#FFC02E">
                        Log in
                    </ColoredPanel>
                </Panel>
            </Modal>

            <a href="https://github.com"><Github className="float-right mt-[0.5rem] mr-[0.75rem]" /></a>
            <h1 className="ml-[1rem] mt-[0.5rem] text-eagle-green font-bold text-[2rem]">Horseman CMS</h1>

            <div className="flex">
                <div className="flex-1">
                    <Panel className="p-[0.5rem] px-[1rem] mt-[10%] ml-[40%] text-[1.5rem] w-[16rem] leading-snug">
                        <a href="/" className="font-bold text-green">Horseman CMS</a> is easy to setup Headless CMS with great UX.
                    </Panel>
                    <Panel className="p-[0.5rem] px-[1rem] mt-[8%] ml-[37%] text-[1.5rem] w-[20.5rem] leading-snug">
                        Written in 
                        <a href="https://reactjs.org/" className="font-bold text-blue"> React</a>, <br />
                        <a href="https://tailwindcss.com/" className="font-bold text-green"> Tailwind</a> and 
                        <a href="https://www.typescriptlang.org/" className="font-bold text-eagle-green"> TypeScript</a>.
                    </Panel>
                </div>
                <div className="flex-1">
                    <Panel className="p-[0.5rem] px-[1rem] mt-[30%] text-[1.5rem] w-[15rem] leading-snug">
                        Developed on <a href="https://www.cloudflare.com/" className="font-bold text-blue">Cloudflare</a> edge network.
                    </Panel>
                </div>
            </div>

            <ColoredPanel onClick={async () => apiIsLoged(jwt)
                .then(b => b ? history.push("/cms") : setLoginOpen(true))
                .catch(() => setLoginOpen(true))
            } className="cursor-pointer w-[9rem] text-[1.5rem] text-white text-center mx-auto mt-[5%] p-[0.5rem] px-[1rem]" color1="#FF6A8E" color2="#EF476F">
                Let&apos;s Go
            </ColoredPanel>

            <a href="https://github.com/Hell0XD" className="text-[0.75rem] absolute bottom-1 right-10 text-white">©2021 Max Műller</a>
        </>
    );
}