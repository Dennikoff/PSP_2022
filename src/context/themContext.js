import React from "react";


export const ThemeContext = React.createContext({
    theme: true,
    changeTheme: () => {},
});

export const themes = {
    dark: 'dark',
    light: 'light',
}
