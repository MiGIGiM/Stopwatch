import React, { FC, ReactNode, useState } from 'react';
import useThemeDetector from '../../hooks/useThemeDetector';
import ThemeToggle from './ThemeToggle/ThemeToggle';

type ThemeLayoutProps = {
    children: ReactNode;
};

const ThemeLayout: FC<ThemeLayoutProps> = ({ children }) => {
    const isDarkTheme = useThemeDetector();
    const [useDarkTheme, setUseDarkTheme] = useState<boolean>(isDarkTheme);

    return (
        <main
            data-theme={useDarkTheme ? 'dracula' : 'cmyk'}
            className="relative h-screen overflow-y-hidden"
        >
            <div className=" flex h-full flex-col items-center justify-center space-y-6 md:flex-row md:items-center md:space-x-28 md:space-y-0">
                {children}
            </div>
            <div className="absolute bottom-[5%] left-[5%] rounded-full drop-shadow-lg">
                <ThemeToggle
                    className=""
                    toggle={useDarkTheme}
                    setToggle={setUseDarkTheme}
                />
            </div>
        </main>
    );
};

export default ThemeLayout;
