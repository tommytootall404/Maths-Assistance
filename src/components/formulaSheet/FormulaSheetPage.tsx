import { modules, getFormulaSheetForModule } from '../../data/modules';
import { FormulaCard } from '../lesson/FormulaCard';

export function FormulaSheetPage() {
  return (
    <div className="formula-sheet">
      <h1>Formula sheet</h1>
      <p className="formula-sheet__intro">Every key formula from every lesson, grouped by module.</p>
      {modules.map((module) => {
        const entries = getFormulaSheetForModule(module.id);
        if (entries.length === 0) return null;
        return (
          <section key={module.id} className="formula-sheet__module" aria-labelledby={`formula-sheet-${module.id}`}>
            <h2 id={`formula-sheet-${module.id}`} style={{ borderColor: module.accentColor }}>
              {module.title}
            </h2>
            <div className="key-formulas">
              {entries.map((entry) => (
                <FormulaCard key={`${entry.lessonId}-${entry.id}`} formula={entry} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
