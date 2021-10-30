import React from "react";




export default function Toolbar({children, className}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={className + " overflow-hidden border-2 px-[0.25rem]"}>
            {children}
        </div>
    );
}