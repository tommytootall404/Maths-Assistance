# Maths for Engineering

A calm, step-by-step maths web app built for a two-year Engineering T Level, covering calculus, vectors,
matrices, and logarithms/exponentials. No login, no backend — everything runs in the browser and progress is
saved to `localStorage`.

Built with Vite + React + TypeScript, [KaTeX](https://katex.org/) for maths rendering, [Mafs](https://mafs.dev/)
for interactive graphs, and [mathjs](https://mathjs.org/) for checking answers.

## Status

The **Logarithms and Exponentials** module is complete end-to-end (5 lessons, practice engine, progress
tracking) as a working proof of the approach. Calculus, Vectors, and Matrices modules follow the same data
format and are added the same way (see below) but aren't written yet.

## Running locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

Other scripts:

```bash
npm run build     # type-checks and builds a production bundle into dist/
npm run preview   # serves the production build locally
npm run lint       # runs oxlint
```

## How the app is structured

```
src/
├── types/lesson.ts          # the Lesson data contract - see below
├── types/progress.ts        # localStorage progress shape
├── data/
│   ├── modules.ts           # registry of all modules + lessons
│   ├── modules/<module>/    # one folder per module, one file per lesson
│   ├── formulaSheet is derived automatically from each lesson's keyFormulas
│   ├── glossary.ts          # glossary terms shown on the Glossary page
│   └── diagnosticQuiz.ts    # questions for the "where should I start" quiz
├── lib/
│   ├── answerChecking.ts    # mathjs-based equivalence checking (numeric, algebraic, vector)
│   ├── random.ts            # seeded RNG so practice questions can regenerate with new numbers
│   ├── progressStore.ts     # localStorage read/write/reset
│   └── math/Math.tsx        # <InlineMath>, <BlockMath>, and <RichText> (renders plain text
│                             # containing $inline$ / $$block$$ maths and **bold**)
├── components/
│   ├── lesson/               # the lesson flow: WhyThisMatters, PrerequisiteCheck, Explanation,
│   │                          # WorkedExample(s), PracticeQuestion(s), HintPanel, LessonSummary
│   ├── visuals/               # interactive graphs (Mafs), one component per VisualComponentId
│   ├── diagnostic/, formulaSheet/, glossary/, progress/
│   └── layout/                # NavBar, PageShell
└── pages/                     # route-level components
```

## Adding a new lesson

Lessons are plain data files conforming to the `Lesson` type in `src/types/lesson.ts`. Components never
hardcode content — they just render whatever a `Lesson` object gives them. To add a lesson:

1. Create a new file in the relevant module folder, e.g. `src/data/modules/calculus/chain-rule.ts`, exporting a
   `const chainRule: Lesson = { ... }`.
2. Add it to that module's `index.ts` (the `<module>Lessons` array, in the order it should appear).
3. If it's a brand-new module, add a `ModuleMeta` for it in `src/data/modules.ts`.

### The shape of a lesson

```ts
interface Lesson {
  id: string;                 // used in the URL: /lessons/:id
  moduleId: ModuleId;
  title: string;
  estMinutes: number;
  whyThisMatters: { scenario: string };        // a short real engineering scenario
  prerequisites: Prerequisite[];                // GCSE skills this lesson depends on
  explanation: ExplanationBlock[];              // plain English -> notation -> optional visual
  workedExamples: WorkedExample[];              // 2-3, revealed one step at a time
  practiceQuestions: PracticeQuestion[];        // easy -> hard, randomised, tiered hints
  summary: string;
  keyFormulas: KeyFormula[];
}
```

A few things worth knowing:

- **Text fields** (`whyThisMatters.scenario`, `explanation[].content`, `refresher.summary`,
  `workedExamples[].steps[].explanationWhy`, practice `prompt`/`workingNotes`/mistake `feedback`, `summary`,
  `keyFormulas[].notes`) are rendered through `<RichText>`, so they can contain `$inline math$`, `$$block
  math$$`, `**bold**`, and blank-line-separated paragraphs, mixed with plain English.
- **`mathLine` and `finalAnswer`** fields (inside worked examples) are rendered directly through KaTeX and
  should be *pure LaTeX with no `$` delimiters*.
- **Practice questions are randomised.** Each `PracticeQuestion.generate(seed)` returns a fresh
  `GeneratedQuestion` (prompt, answer, optional working notes and common mistakes) built from numbers derived
  from a seeded RNG (`src/lib/random.ts`), so "Try new numbers" produces a genuinely different question of the
  same type.
- **`commonMistakes`** are checked against the student's answer using the same equivalence logic as the real
  answer, so a predictable wrong answer (e.g. dividing instead of taking a log, a sign error, mixing up which
  quantity is which) gets a specific explanation instead of a generic "incorrect".
- **`AnswerSpec`** supports `numeric`, `fraction-or-decimal`, `expression` (checked via mathjs symbolic
  simplification, falling back to numeric sampling across random points so equivalent forms like `2x` and
  `x+x` are both accepted), `multiple-choice`, and `vector` (accepts bracket/comma form, plain comma form, or
  `i`/`j`/`k` form).
- **`VisualComponentId`** in an `explanation` block with `kind: 'visual'` renders an interactive component from
  `src/components/visuals/VisualRenderer.tsx`. Add a new visual by building the component, then registering it
  there.

The formula sheet page and prerequisite checks read directly from lesson data, so a well-formed lesson file is
immediately linked up everywhere without touching any component.

## Progress tracking

Progress is stored under the `maths-assistance:progress:v1` key in `localStorage`, per lesson: whether
prerequisites were passed first try, whether the explanation and each worked example were viewed, which
practice questions have been solved at least once, and an overall status (`not-started` / `in-progress` /
`complete`). There's a reset button on the home page that clears it entirely — nothing is ever sent anywhere.
