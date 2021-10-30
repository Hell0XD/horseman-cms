import React from "react";



interface InputProps {
    type?: string;
}


export default function Input({type, className, ...rest}: InputProps & React.HTMLAttributes<HTMLInputElement>) {
    return (
        <input type={type || "text"} className={"text-[1.125rem] outline-none px-[1.25rem] py-[0.75rem] text-[#737373] rounded-3xl bg-[rgba(244,244,244,0.75)] shadow__panel " + className}{...rest} />
    );
}