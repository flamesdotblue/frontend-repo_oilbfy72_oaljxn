import { useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Tracks from './components/Tracks';
import Quiz from './components/Quiz';

export default function App() {
  const tracksRef = useRef(null);
  const quizRef = useRef(null);

  const scrollTo = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Header onStartTest={() => scrollTo(quizRef)} />

      <div>
        <Hero onStartTest={() => scrollTo(quizRef)} onBrowseTracks={() => scrollTo(tracksRef)} />

        <div ref={tracksRef}>
          <Tracks onSelect={() => scrollTo(quizRef)} />
        </div>

        <div ref={quizRef}>
          <Quiz />
        </div>

        <section id="benefits" className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-900">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Built for a smooth experience</h3>
              <ul className="grid sm:grid-cols-2 gap-2 text-neutral-700 dark:text-neutral-300">
                <li>• Clean, distraction-free UI</li>
                <li>• Fast interactions with autosave</li>
                <li>• Works great on mobile and desktop</li>
                <li>• Dark mode for late-night study</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className="py-10 border-t border-black/5 dark:border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-sm text-neutral-600 dark:text-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>© {new Date().getFullYear()} EDTCH Prep. All rights reserved.</p>
            <p>Made to help you crack government exams with confidence.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
