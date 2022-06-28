module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                logo: ["Pacifico", "cursive"],
            },
            colors: {
                primary: "#6153CC",
                primaryDisabled: "#B7B0E8",
                primaryDark: "#5341C8",
                secondary: "#F3F3F4",
                textPrimary: "#34312D",
                textSecondary: "#14110F",
            },
        },
        fontFamily: {
            sans: ["Open Sans", "sans-serif"],
        },
    },
    plugins: [],
};
