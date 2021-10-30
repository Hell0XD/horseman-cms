
import React from "react";

import "./Background.scss";

export default function Background({height, width, ...rest}: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...rest}
            xmlns="http://www.w3.org/2000/svg"
            width={width || "1152"}
            height={height || "700"}
            fill="none"
            viewBox="0 0 1152 700"
        >
            <g clipPath="url(#clip0_6:48)">
                <path fill="#118AB2" d="M1152-68H0v768h1152V-68z"></path>
                <g filter="url(#filter0_f_6:48)">
                    <path
                        fill="#06D6A0"
                        d="M638.72 1098.08c252.372 0 456.96-204.588 456.96-456.96 0-252.372-204.588-456.96-456.96-456.96-252.372 0-456.96 204.588-456.96 456.96 0 252.372 204.588 456.96 456.96 456.96z"
                    ></path>
                    <path
                        fill="#118AB2"
                        d="M953.6 629.6c252.37 0 456.96-204.588 456.96-456.96 0-252.372-204.59-456.96-456.96-456.96-252.372 0-456.96 204.588-456.96 456.96 0 252.372 204.588 456.96 456.96 456.96z"
                    ></path>
                    <path
                        fill="#06D6A0"
                        d="M510.72 423.52c252.372 0 456.96-204.588 456.96-456.96 0-252.372-204.588-456.96-456.96-456.96-252.372 0-456.96 204.588-456.96 456.96 0 252.372 204.588 456.96 456.96 456.96z"
                    ></path>
                    <path
                        fill="#06D6A0"
                        d="M368.64 1022.56c252.372 0 456.96-204.588 456.96-456.96 0-252.372-204.588-456.96-456.96-456.96-252.372 0-456.96 204.588-456.96 456.96 0 252.372 204.588 456.96 456.96 456.96z"
                    ></path>
                    <path
                        fill="#118AB2"
                        d="M861.44 865.12c252.37 0 456.96-204.588 456.96-456.96 0-252.372-204.59-456.96-456.96-456.96-252.372 0-456.96 204.588-456.96 456.96 0 252.372 204.588 456.96 456.96 456.96z"
                    ></path>
                    <path
                        fill="#06D6A0"
                        d="M879.36 397.92c252.37 0 456.96-204.588 456.96-456.96 0-252.372-204.59-456.96-456.96-456.96C626.988-516 422.4-311.412 422.4-59.04c0 252.372 204.588 456.96 456.96 456.96z"
                    ></path>
                </g>
            </g>
            <defs>
                <filter
                    id="filter0_f_6:48"
                    width="2142.88"
                    height="2258.08"
                    x="-410.32"
                    y="-838"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    ></feBlend>
                    <feGaussianBlur
                        result="effect1_foregroundBlur_6:48"
                        stdDeviation="161"
                    ></feGaussianBlur>
                </filter>
                <clipPath id="clip0_6:48">
                    <path
                        fill="#fff"
                        d="M0 0H1152V768H0z"
                        transform="translate(0 -68)"
                    ></path>
                </clipPath>
            </defs>
        </svg>
    );
}