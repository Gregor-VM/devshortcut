import LightIcon from "../icons/light";
import DarkIcon from "../icons/dark";
import { useEffect, useState } from "preact/hooks";

export default function ThemeButton() {

    const [darkMode, setDarkMode] = useState(true);

    const applyTheme = () => {

        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            return false;
        } else {
            document.documentElement.classList.remove('dark');
            return true;
        }

    }

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);

        if(darkMode) localStorage.theme = 'dark';
        else localStorage.theme = 'light';

        applyTheme();

    }

    useEffect(() => {
        const isDarkModeEnabled = applyTheme();
        setDarkMode(isDarkModeEnabled);
    }, []);

    return (
    <button 
    class="w-16 p-1 rounded-2xl dark:border-white/50 border-slate-700/50 border-2 shadow group relative overflow-hidden transition-all duration-75"
    onClick={toggleDarkMode}>

        <div class="absolute w-14 h-14 bg-gradient-to-l from-slate-50 via-slate-50/30 to-transparent translate-x-6 -translate-y-4 group-active:opacity-80 group-active:translate-x-8">
        </div>

        <div class="absolute w-14 h-14 bg-gradient-to-r from-neutral-900 via-neutral-900/30 to-transparent -translate-x-8 -translate-y-4 group-active:opacity-80 group-active:-translate-x-10">
        </div>

        {darkMode ? 
        (<div class="w-6 h-6 translate-x-7 group-active:translate-x-0 transition-all group-active:opacity-40">
            <DarkIcon />
        </div>) : 
        (<div class="w-6 h-6 group-active:translate-x-7 transition-all group-active:opacity-40">
            <LightIcon />
        </div>)
        }

    </button>
    )
  }
  