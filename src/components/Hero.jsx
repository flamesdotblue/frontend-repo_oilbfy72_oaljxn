import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero({ onStartTest, onBrowseTracks }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-white dark:from-indigo-950/40 dark:via-neutral-900 dark:to-neutral-900 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-medium mb-4">
              <span>Government exam preparation</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
              Learn smart. Practice faster. Crack your exam.
            </h1>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 max-w-xl">
              A modern learning experience for UPSC, SSC, Banking, Railways and State PSC. Interactive practice, detailed analytics, and a clean, distraction-free interface.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onStartTest}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-sm"
              >
                Start a quick test <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onBrowseTracks}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white dark:bg-neutral-800 border border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-700"
              >
                Browse tracks
              </button>
            </div>

            <ul className="mt-8 grid sm:grid-cols-2 gap-3 text-sm text-neutral-700 dark:text-neutral-200">
              {[
                'Exam-wise curated curriculum',
                'Timed tests with instant results',
                'Progress saved automatically',
                'Works beautifully on mobile',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-indigo-500/10 via-transparent to-fuchsia-500/10 dark:from-indigo-400/10 dark:to-fuchsia-400/10 p-4">
              <div className="h-full w-full rounded-xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 p-4 grid grid-rows-[auto,1fr,auto] gap-3">
                <div className="flex items-center justify-between">
                  <div className="h-2.5 w-20 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                    <div className="h-2 w-2 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                    <div className="h-2 w-2 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-md bg-indigo-100/60 dark:bg-indigo-900/40" />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-24 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-2.5 w-10 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
