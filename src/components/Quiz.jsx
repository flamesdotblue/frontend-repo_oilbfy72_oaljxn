import { useEffect, useMemo, useState } from 'react';
import { Clock, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';

const sampleQuestions = [
  {
    id: 'q1',
    subject: 'Polity',
    text: 'Which of the following is NOT a Fundamental Right under the Indian Constitution?',
    options: [
      'Right to Equality',
      'Right to Property',
      'Right to Freedom',
      'Right against Exploitation',
    ],
    answerIndex: 1,
    explanation: 'Right to Property is now a legal right (Article 300A), not a Fundamental Right after the 44th Amendment.',
  },
  {
    id: 'q2',
    subject: 'Economy',
    text: 'The term “Fiscal Deficit” refers to:',
    options: [
      'Total borrowing of the government',
      'Excess of total expenditure over total receipts excluding borrowings',
      'Excess of total receipts over total expenditure',
      'Difference between revenue receipts and revenue expenditure',
    ],
    answerIndex: 1,
    explanation: 'Fiscal deficit = Total expenditure – (Revenue receipts + Non-debt capital receipts).',
  },
  {
    id: 'q3',
    subject: 'Geography',
    text: 'El Niño is associated with:',
    options: [
      'Unusual cooling of the central and eastern Pacific Ocean',
      'Unusual warming of the central and eastern Pacific Ocean',
      'Strengthening of trade winds',
      'Increase in upwelling near the Peruvian coast',
    ],
    answerIndex: 1,
    explanation: 'El Niño is the warming phase of the El Niño–Southern Oscillation in the Pacific.',
  },
  {
    id: 'q4',
    subject: 'Maths',
    text: 'If simple interest on a sum for 3 years at 8% per annum is ₹480, the principal is:',
    options: [
      '₹1,800',
      '₹2,000',
      '₹2,200',
      '₹2,400',
    ],
    answerIndex: 1,
    explanation: 'SI = PRT/100 → 480 = P×8×3/100 → P = 2000.',
  },
  {
    id: 'q5',
    subject: 'Science',
    text: 'Which gas is used in the Haber process to produce ammonia along with nitrogen?',
    options: ['Hydrogen', 'Oxygen', 'Carbon dioxide', 'Methane'],
    answerIndex: 0,
    explanation: 'Nitrogen reacts with hydrogen in the presence of a catalyst to form ammonia (NH3).',
  },
  {
    id: 'q6',
    subject: 'History',
    text: 'Who was the first Governor-General of independent India?',
    options: ['Lord Mountbatten', 'C. Rajagopalachari', 'Dr. Rajendra Prasad', 'Jawaharlal Nehru'],
    answerIndex: 0,
    explanation: 'Lord Mountbatten served as the first Governor-General after independence (1947–48).',
  },
];

const QUIZ_STORAGE_KEY = 'edtch_quiz_progress_v1';

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(10 * 60); // 10 minutes

  // Restore/save progress
  useEffect(() => {
    const saved = localStorage.getItem(QUIZ_STORAGE_KEY);
    if (saved) {
      try {
        const state = JSON.parse(saved);
        setCurrent(state.current ?? 0);
        setAnswers(state.answers ?? {});
        setSubmitted(state.submitted ?? false);
        setSecondsLeft(state.secondsLeft ?? 10 * 60);
      } catch {}
    }
  }, []);

  useEffect(() => {
    const state = { current, answers, submitted, secondsLeft };
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(state));
  }, [current, answers, submitted, secondsLeft]);

  useEffect(() => {
    if (submitted) return;
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [submitted]);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  const onSelect = (idx) => {
    const q = sampleQuestions[current];
    setAnswers((prev) => ({ ...prev, [q.id]: idx }));
  };

  const onSubmit = () => setSubmitted(true);

  const score = useMemo(() => {
    if (!submitted) return 0;
    return sampleQuestions.reduce((acc, q) => acc + ((answers[q.id] ?? -1) === q.answerIndex ? 1 : 0), 0);
  }, [submitted, answers]);

  const resetQuiz = () => {
    setCurrent(0);
    setAnswers({});
    setSubmitted(false);
    setSecondsLeft(10 * 60);
    localStorage.removeItem(QUIZ_STORAGE_KEY);
  };

  const mins = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
  const secs = (secondsLeft % 60).toString().padStart(2, '0');

  const q = sampleQuestions[current];

  return (
    <section id="quiz" className="py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">Practice test</h2>
            <p className="text-neutral-600 dark:text-neutral-300">Answer questions across subjects. Your progress is autosaved.</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100">
              <Clock className="w-4 h-4" />
              <span>{mins}:{secs}</span>
            </div>
            <div className="hidden sm:inline text-neutral-500">•</div>
            <div className="hidden sm:inline text-neutral-600 dark:text-neutral-300">{answeredCount}/{sampleQuestions.length} answered</div>
          </div>
        </div>

        {!submitted ? (
          <div className="grid lg:grid-cols-[1fr,280px] gap-6">
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-neutral-900">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium px-2 py-1 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">{q.subject}</span>
                <span className="text-xs text-neutral-500">Question {current + 1} of {sampleQuestions.length}</span>
              </div>
              <p className="text-lg text-neutral-900 dark:text-white font-medium">{q.text}</p>

              <div className="mt-4 grid gap-2">
                {q.options.map((opt, idx) => {
                  const selected = answers[q.id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => onSelect(idx)}
                      className={`w-full text-left px-3 py-2 rounded-lg border transition ${
                        selected
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-neutral-900 dark:text-neutral-100'
                          : 'border-black/10 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-100'
                      }`}
                    >
                      <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {opt}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                    disabled={current === 0}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-200 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <button
                    onClick={() => setCurrent((c) => Math.min(sampleQuestions.length - 1, c + 1))}
                    disabled={current === sampleQuestions.length - 1}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-200 disabled:opacity-50"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={onSubmit}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
                >
                  Submit
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-black/10 dark:border-white/10 p-3 bg-white dark:bg-neutral-900">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2">Question palette</p>
                <div className="grid grid-cols-8 gap-2">
                  {sampleQuestions.map((item, idx) => {
                    const selected = idx === current;
                    const answered = answers[item.id] !== undefined;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setCurrent(idx)}
                        className={`aspect-square rounded-md text-xs font-medium border ${selected ? 'border-indigo-500' : 'border-black/10 dark:border-white/10'} ${answered ? 'bg-green-100 dark:bg-green-900/40' : 'bg-neutral-50 dark:bg-neutral-800'} text-neutral-800 dark:text-neutral-100`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-xl border border-black/10 dark:border-white/10 p-3 bg-white dark:bg-neutral-900">
                <div className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                  <AlertCircle className="w-4 h-4 mt-0.5" />
                  <p>Tip: You can jump directly to any question from the palette. Your answers are saved automatically.</p>
                </div>
              </div>

              <button onClick={resetQuiz} className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-100">
                <RotateCcw className="w-4 h-4" /> Reset test
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr,280px] gap-6">
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-neutral-900">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="text-xl font-semibold">Your result</h3>
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                You scored <span className="font-semibold text-neutral-900 dark:text-white">{score}</span> out of {sampleQuestions.length}.
              </p>
              <div className="space-y-3">
                {sampleQuestions.map((item, idx) => {
                  const selected = answers[item.id];
                  const correct = item.answerIndex;
                  const isRight = selected === correct;
                  return (
                    <div key={item.id} className={`rounded-lg border p-3 ${isRight ? 'border-emerald-300/60 bg-emerald-50 dark:bg-emerald-900/20' : 'border-rose-300/60 bg-rose-50 dark:bg-rose-900/20'}`}>
                      <div className="text-sm text-neutral-600 dark:text-neutral-300 mb-1">Q{idx + 1}. {item.subject}</div>
                      <div className="font-medium text-neutral-900 dark:text-white">{item.text}</div>
                      <div className="mt-2 text-sm">
                        <div>
                          <span className="text-neutral-600 dark:text-neutral-300">Your answer: </span>
                          <span className={`${isRight ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>{selected !== undefined ? item.options[selected] : 'Not answered'}</span>
                        </div>
                        <div>
                          <span className="text-neutral-600 dark:text-neutral-300">Correct answer: </span>
                          <span className="text-neutral-900 dark:text-white">{item.options[correct]}</span>
                        </div>
                        <div className="mt-1 text-neutral-600 dark:text-neutral-300">{item.explanation}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button onClick={resetQuiz} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-100">
                  <RotateCcw className="w-4 h-4" /> Retake test
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-black/10 dark:border-white/10 p-3 bg-white dark:bg-neutral-900">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2">Summary</p>
                <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                  <li>Total questions: {sampleQuestions.length}</li>
                  <li>Answered: {answeredCount}</li>
                  <li>Time taken: {10 * 60 - secondsLeft}s</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
