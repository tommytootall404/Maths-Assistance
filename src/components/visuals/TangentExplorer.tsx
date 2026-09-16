import { Mafs, Coordinates, Plot, Line, useMovablePoint } from 'mafs';
import 'mafs/core.css';
import 'mafs/font.css';
import { InlineMath } from '../../lib/math/Math';

const X_MIN = -3;
const X_MAX = 3;

function f(x: number): number {
  return x * x;
}

function fPrime(x: number): number {
  return 2 * x;
}

export function TangentExplorer() {
  // The movable point is constrained to snap back onto the curve on every drag, so its
  // own x/y are always the live position — no separate state needs to be kept in sync.
  const movable = useMovablePoint([1.5, f(1.5)], {
    constrain: ([px]) => {
      const clampedX = Math.min(X_MAX, Math.max(X_MIN, px));
      return [clampedX, f(clampedX)];
    },
  });

  const x = movable.x;
  const y = movable.y;
  const gradient = fPrime(x);

  return (
    <div className="visual-card">
      <Mafs height={320} viewBox={{ x: [X_MIN, X_MAX], y: [-1, 9.5] }} preserveAspectRatio={false}>
        <Coordinates.Cartesian xAxis={{ axis: true, lines: 1 }} yAxis={{ axis: true, lines: 1 }} />
        <Plot.OfX y={f} color="#2f6fed" weight={3} />
        <Line.PointSlope point={[x, y]} slope={gradient} color="#ff5c7c" weight={2} />
        {movable.element}
      </Mafs>

      <p className="visual-readout">
        At <InlineMath math={`x = ${x.toFixed(2)}`} />, on <InlineMath math="y = x^2" /> : gradient{' '}
        <InlineMath math={`= 2x = ${gradient.toFixed(2)}`} />
      </p>
    </div>
  );
}
