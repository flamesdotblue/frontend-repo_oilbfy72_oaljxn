import { useEffect, useState } from 'react';
import { GraduationCap, Sun, Moon, Trophy } from 'lucide-react';

export default function Header({ onStartTest }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-neutral-900/70 border-b border-black/5 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-bold tracking-tight text-xl text-neutral-900 dark:text-white">EDTCH Prep</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-300">
          <a href="#tracks" className="hover:text-neutral-900 dark:hover:text-white transition">Tracks</a>
          <a href="#quiz" className="hover:text-neutral-900 dark:hover:text-white transition">Practice</a>
          <a href="#benefits" className="hover:text-neutral-900 dark:hover:text-white transition">Why us</a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={onStartTest}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium shadow-sm"
          >
            <Trophy className="w-4 h-4" /> Quick Test
          </button>
        </div>
      </div>
    </header>
  );
}
