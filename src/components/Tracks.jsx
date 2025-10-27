import { Layers, BookOpenCheck, Target, Shield, Landmark } from 'lucide-react';

const tracks = [
  {
    key: 'upsc',
    title: 'UPSC CSE',
    description: 'Comprehensive coverage of GS, CSAT, and Current Affairs with practice sets and analysis.',
    icon: Landmark,
    color: 'from-amber-500/15 to-rose-500/15',
  },
  {
    key: 'ssc',
    title: 'SSC CGL/CHSL',
    description: 'Quantitative aptitude, reasoning, English, and general awareness tailored for SSC exams.',
    icon: Target,
    color: 'from-indigo-500/15 to-sky-500/15',
  },
  {
    key: 'bank',
    title: 'Banking (IBPS/SBI)',
    description: 'Speed-focused tests for prelims and mains with DI, puzzles, and GA.',
    icon: Shield,
    color: 'from-emerald-500/15 to-teal-500/15',
  },
  {
    key: 'rail',
    title: 'Railways (RRB)',
    description: 'Math, reasoning, and science practice designed for RRB NTPC and Group D.',
    icon: Layers,
    color: 'from-fuchsia-500/15 to-violet-500/15',
  },
  {
    key: 'state',
    title: 'State PSC',
    description: 'State-specific GK and GS with question banks and previous year papers.',
    icon: BookOpenCheck,
    color: 'from-cyan-500/15 to-blue-500/15',
  },
];

export default function Tracks({ onSelect }) {
  return (
    <section id="tracks" className="py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">Choose your track</h2>
            <p className="text-neutral-600 dark:text-neutral-300">Curated learning paths for popular government exams.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks.map(({ key, title, description, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => onSelect?.(key)}
              className={`group text-left rounded-xl border border-black/10 dark:border-white/10 bg-gradient-to-br ${color} p-4 hover:shadow-md transition`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/70 dark:bg-neutral-900/70 backdrop-blur border border-black/5 dark:border-white/10 text-indigo-600 dark:text-indigo-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">{title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">{description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
