import { Fragment, type ReactNode } from 'react';
import katex from 'katex';

function renderMathHtml(math: string, displayMode: boolean): string {
  try {
    return katex.renderToString(math, {
      throwOnError: false,
      displayMode,
      strict: 'ignore',
    });
  } catch {
    return math;
  }
}

export function InlineMath({ math }: { math: string }) {
  return <span className="katex-inline" dangerouslySetInnerHTML={{ __html: renderMathHtml(math, false) }} />;
}

export function BlockMath({ math }: { math: string }) {
  return <div className="katex-block" dangerouslySetInnerHTML={{ __html: renderMathHtml(math, true) }} />;
}

// Matches, in priority order: $$...$$ (block maths), $...$ (inline maths), **...** (bold).
const TOKEN_RE = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$|\*\*[^*]+?\*\*)/g;

function renderInline(text: string, keyBase: string): ReactNode[] {
  const parts = text.split(TOKEN_RE).filter((part) => part !== '');
  return parts.map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (part.startsWith('$$') && part.endsWith('$$')) {
      return <BlockMath key={key} math={part.slice(2, -2).trim()} />;
    }
    if (part.startsWith('$') && part.endsWith('$')) {
      return <InlineMath key={key} math={part.slice(1, -1)} />;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={key}>{part}</Fragment>;
  });
}

/**
 * Renders plain-English lesson text that may contain inline `$...$` maths,
 * block `$$...$$` maths, `**bold**`, and blank-line-separated paragraphs —
 * so lesson data files can stay plain strings instead of JSX.
 */
export function RichText({ text, className }: { text: string; className?: string }) {
  const paragraphs = text.split(/\n\n+/);
  if (paragraphs.length <= 1) {
    // A block-math token can render a <div>, which isn't valid inside inline elements,
    // so this always renders as a <div> rather than a <span> — even for one paragraph.
    return <div className={className}>{renderInline(text, 'seg')}</div>;
  }
  return (
    <div className={className}>
      {paragraphs.map((para, i) => (
        <div className="rich-text__paragraph" key={`para-${i}`}>
          {renderInline(para, `para-${i}`)}
        </div>
      ))}
    </div>
  );
}
