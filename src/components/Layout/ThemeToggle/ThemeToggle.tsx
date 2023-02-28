import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Switch } from '@headlessui/react';

type ThemeToggleProps = {
    className: string;
    toggle: boolean;
    setToggle: Dispatch<SetStateAction<boolean>>;
};

const ThemeToggle: FC<ThemeToggleProps> = ({
    className,
    toggle,
    setToggle,
}) => (
    <div className={className}>
        <Switch
            checked={toggle}
            onChange={setToggle}
            className={`${toggle ? 'bg-slate-700' : 'bg-slate-300'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
            <span className="sr-only">Toggle theme</span>
            <span
                aria-hidden="true"
                className={`${toggle ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block transform rounded-full bg-transparent text-2xl shadow-lg ring-0 transition duration-700 ease-in-out`}
            >
                {toggle ? '🌑' : '☀️'}
            </span>
        </Switch>
    </div>
);

export default ThemeToggle;
