import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Lesson } from '../../types/lesson';
import { getModuleById } from '../../data/modules';
import { useProgress } from '../../hooks/useProgress';
import { WhyThisMatters } from './WhyThisMatters';
import { PrerequisiteCheck } from './PrerequisiteCheck';
import { Explanation } from './Explanation';
import { WorkedExamplesSection } from './WorkedExamplesSection';
import { PracticeSection } from './PracticeSection';
import { LessonSummary } from './LessonSummary';

type Stage = 'intro' | 'prereq' | 'explanation' | 'examples' | 'practice' | 'summary';

const STAGE_ORDER: Stage[] = ['intro', 'prereq', 'explanation', 'examples', 'practice', 'summary'];
const STAGE_LABELS: Record<Stage, string> = {
  intro: 'Why this matters',
  prereq: 'Quick check',
  explanation: 'Explanation',
  examples: 'Worked examples',
  practice: 'Practice',
  summary: 'Summary',
};

export function LessonPage({ lesson }: { lesson: Lesson }) {
  const { getLesson, updateLesson } = useProgress();
  const progress = getLesson(lesson.id);
  const [stage, setStage] = useState<Stage>('intro');

  const moduleMeta = getModuleById(lesson.moduleId);
  const lessonIds = moduleMeta?.lessonIds ?? [];
  const positionInModule = lessonIds.indexOf(lesson.id);
  const nextLessonId = positionInModule >= 0 ? lessonIds[positionInModule + 1] : undefined;

  const goToStage = (next: Stage) => {
    setStage(next);
    if (progress.status === 'not-started') {
      updateLesson(lesson.id, { status: 'in-progress' });
    }
  };

  const stageIndex = STAGE_ORDER.indexOf(stage);

  return (
    <article className="lesson-page">
      <div className="lesson-page__breadcrumb">
        <Link to={`/modules/${lesson.moduleId}`}>&larr; {moduleMeta?.title ?? 'Module'}</Link>
      </div>
      <header className="lesson-page__header">
        <h1>{lesson.title}</h1>
        <p className="lesson-page__meta">About {lesson.estMinutes} minutes</p>
      </header>

      <ol className="lesson-stepper" aria-label="Lesson progress">
        {STAGE_ORDER.map((s, i) => (
          <li
            key={s}
            className={
              i === stageIndex
                ? 'lesson-stepper__step lesson-stepper__step--current'
                : i < stageIndex
                  ? 'lesson-stepper__step lesson-stepper__step--done'
                  : 'lesson-stepper__step'
            }
          >
            {STAGE_LABELS[s]}
          </li>
        ))}
      </ol>

      {stage === 'intro' && (
        <WhyThisMatters
          scenario={lesson.whyThisMatters.scenario}
          onContinue={() => goToStage(lesson.prerequisites.length > 0 ? 'prereq' : 'explanation')}
        />
      )}

      {stage === 'prereq' && (
        <PrerequisiteCheck
          prerequisites={lesson.prerequisites}
          onComplete={(allPassedFirstTry) => {
            updateLesson(lesson.id, { prerequisitesPassed: allPassedFirstTry });
            goToStage('explanation');
          }}
        />
      )}

      {stage === 'explanation' && (
        <Explanation
          blocks={lesson.explanation}
          onContinue={() => {
            updateLesson(lesson.id, { explanationViewed: true });
            goToStage('examples');
          }}
        />
      )}

      {stage === 'examples' && (
        <WorkedExamplesSection
          examples={lesson.workedExamples}
          onExampleViewed={(exampleId) => {
            const seen = new Set(progress.workedExamplesViewed);
            seen.add(exampleId);
            updateLesson(lesson.id, { workedExamplesViewed: Array.from(seen) });
          }}
          onContinue={() => goToStage('practice')}
        />
      )}

      {stage === 'practice' && (
        <PracticeSection
          questions={lesson.practiceQuestions}
          onQuestionSolved={(questionId) => {
            updateLesson(lesson.id, {
              practiceQuestionsCorrect: { ...progress.practiceQuestionsCorrect, [questionId]: true },
            });
          }}
          onContinue={() => {
            updateLesson(lesson.id, { status: 'complete' });
            goToStage('summary');
          }}
        />
      )}

      {stage === 'summary' && (
        <LessonSummary
          summary={lesson.summary}
          keyFormulas={lesson.keyFormulas}
          nextLessonId={nextLessonId}
          moduleId={lesson.moduleId}
        />
      )}
    </article>
  );
}
