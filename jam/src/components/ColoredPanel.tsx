import React, { CSSProperties } from "react";



interface CustomCSS extends CSSProperties {
    "--color-1": string;
    "--color-2": string;
}

interface ColoredPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    color1: string;
    color2: string;
}


export default function ColoredPanel({color1, color2, children, className, ...rest}: ColoredPanelProps) {
    return (
        <div 
            style={{
                "--color-1": color1,
                "--color-2": color2,
            } as CustomCSS}
            className={"gradient__panel rounded-3xl shadow__panel " + className}
            {...rest}
        >
            {children}
        </div>
    );
}