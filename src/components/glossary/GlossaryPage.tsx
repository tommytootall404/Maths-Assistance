import { useMemo, useState } from 'react';
import { glossary } from '../../data/glossary';
import { modules } from '../../data/modules';
import { RichText } from '../../lib/math/Math';

export function GlossaryPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return glossary;
    return glossary.filter(
      (entry) => entry.term.toLowerCase().includes(q) || entry.definition.toLowerCase().includes(q),
    );
  }, [query]);

  const sorted = [...filtered].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="glossary-page">
      <h1>Glossary</h1>
      <p className="glossary-page__intro">Plain-English definitions for every term used across the lessons.</p>
      <label className="glossary-page__search">
        <span className="sr-only">Search the glossary</span>
        <input
          type="search"
          placeholder="Search terms..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <dl className="glossary-list">
        {sorted.map((entry) => {
          const module = modules.find((m) => m.id === entry.moduleId);
          return (
            <div key={entry.id} className="glossary-list__entry">
              <dt>
                {entry.term}
                {module && <span className="glossary-list__module-tag">{module.title}</span>}
              </dt>
              <dd>
                <RichText text={entry.definition} />
              </dd>
            </div>
          );
        })}
        {sorted.length === 0 && <p>No terms match that search.</p>}
      </dl>
    </div>
  );
}
