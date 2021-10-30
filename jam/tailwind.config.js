module.exports = {
    mode: "jit",
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                pink: "#EF476F",
                "light-pink": "#FF6A8E",
                yellow: "#FFC02E",
                "light-yellow": "#FFD166",
                green: "#06D9A2",
                "light-green": "#0FFABD",
                blue: "#118AB2",
                "light-blue": "#17AFE1",
                "eagle-green": "#073B4C",
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
