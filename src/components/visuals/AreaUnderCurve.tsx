import { useId, useState } from 'react';
import { Mafs, Coordinates, Plot, Polygon } from 'mafs';
import 'mafs/core.css';
import 'mafs/font.css';
import { InlineMath } from '../../lib/math/Math';

const X_MIN = 0;
const X_MAX = 4;

function f(x: number): number {
  return x * x;
}

/** Trapezoidal-rule numerical integration of f between a and b, summed over `strips` strips. */
function trapezoidalIntegral(fn: (x: number) => number, a: number, b: number, strips: number): number {
  if (a === b) return 0;
  const h = (b - a) / strips;
  let total = 0.5 * (fn(a) + fn(b));
  for (let i = 1; i < strips; i += 1) {
    total += fn(a + i * h);
  }
  return total * h;
}

export function AreaUnderCurve() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(3);
  const aSliderId = useId();
  const bSliderId = useId();

  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const area = trapezoidalIntegral(f, lower, upper, 200);

  const strips = 60;
  const curvePoints: [number, number][] = [];
  for (let i = 0; i <= strips; i += 1) {
    const x = lower + ((upper - lower) * i) / strips;
    curvePoints.push([x, f(x)]);
  }
  const polygonPoints: [number, number][] = [[lower, 0], ...curvePoints, [upper, 0]];

  return (
    <div className="visual-card">
      <div className="visual-controls">
        <div className="visual-control">
          <label htmlFor={aSliderId}>
            Lower limit <InlineMath math="a" /> = {a.toFixed(1)}
          </label>
          <input
            id={aSliderId}
            type="range"
            min={X_MIN}
            max={X_MAX}
            step={0.1}
            value={a}
            onChange={(event) => setA(Number(event.target.value))}
          />
        </div>
        <div className="visual-control">
          <label htmlFor={bSliderId}>
            Upper limit <InlineMath math="b" /> = {b.toFixed(1)}
          </label>
          <input
            id={bSliderId}
            type="range"
            min={X_MIN}
            max={X_MAX}
            step={0.1}
            value={b}
            onChange={(event) => setB(Number(event.target.value))}
          />
        </div>
      </div>

      <Mafs height={320} viewBox={{ x: [X_MIN - 0.3, X_MAX + 0.3], y: [-1, 17] }} preserveAspectRatio={false}>
        <Coordinates.Cartesian xAxis={{ axis: true, lines: 1 }} yAxis={{ axis: true, lines: 2 }} />
        <Plot.OfX y={f} domain={[X_MIN, X_MAX]} color="#2f6fed" weight={3} />
        {lower < upper && (
          <Polygon points={polygonPoints} color="#2f6fed" fillOpacity={0.25} strokeOpacity={0} />
        )}
      </Mafs>

      <p className="visual-readout">
        <InlineMath math={`\\int_{${lower.toFixed(1)}}^{${upper.toFixed(1)}} x^2\\,dx \\approx`} /> {area.toFixed(2)}{' '}
        (trapezoidal rule, 200 strips)
      </p>
    </div>
  );
}
