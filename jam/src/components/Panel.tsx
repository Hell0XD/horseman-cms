import React from "react";



export default function Panel({children, className, ...rest}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div 
            className={"rounded-3xl bg-[rgba(244,244,244,0.35)] shadow__panel " + className}
            {...rest}
        >
            {children}
        </div>
    );
}