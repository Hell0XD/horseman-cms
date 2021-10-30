import React from "react";



export default function DarkPanel({children, className, ...rest}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div 
            className={"rounded-3xl bg-[rgba(244,244,244,0.75)] shadow__panel " + className}
            {...rest}
        >
            {children}
        </div>
    );
}