import { Mafs, Coordinates, Line, Point, useMovablePoint } from 'mafs';
import 'mafs/core.css';
import 'mafs/font.css';
import { InlineMath } from '../../lib/math/Math';

const AXIS_LIMIT = 8;
const VECTOR_COLOR = '#2e86ab';
const COMPONENT_COLOR = '#ff5c7c';

/** Wraps an angle in degrees into the range [0, 360). */
function normaliseDegrees(deg: number): number {
  const wrapped = deg % 360;
  return wrapped < 0 ? wrapped + 360 : wrapped;
}

export function VectorPlayground() {
  const movablePoint = useMovablePoint([4, 3], { color: VECTOR_COLOR });
  const { x, y } = movablePoint;

  const magnitude = Math.hypot(x, y);
  const angleDeg = normaliseDegrees(Math.atan2(y, x) * (180 / Math.PI));

  return (
    <div className="visual-card">
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
        Drag the point to move the vector&apos;s tip.
      </p>

      <div style={{ maxWidth: 460, margin: '0 auto' }}>
        <Mafs height={400} viewBox={{ x: [-AXIS_LIMIT, AXIS_LIMIT], y: [-AXIS_LIMIT, AXIS_LIMIT], padding: 0.5 }}>
          <Coordinates.Cartesian xAxis={{ axis: true, lines: 1 }} yAxis={{ axis: true, lines: 1 }} />

          {/* Dashed lines to the axes, showing the x and y components */}
          <Line.Segment point1={[x, 0]} point2={[x, y]} color={COMPONENT_COLOR} weight={1} style="dashed" />
          <Line.Segment point1={[0, y]} point2={[x, y]} color={COMPONENT_COLOR} weight={1} style="dashed" />
          <Point x={x} y={0} color={COMPONENT_COLOR} />
          <Point x={0} y={y} color={COMPONENT_COLOR} />

          {/* The vector itself, drawn from the origin */}
          <Line.Segment point1={[0, 0]} point2={[x, y]} color={VECTOR_COLOR} weight={3} />

          {movablePoint.element}
        </Mafs>
      </div>

      <p className="visual-readout">
        <InlineMath math="\vec v" /> has components <InlineMath math="x \approx" /> {x.toFixed(1)},{' '}
        <InlineMath math="y \approx" /> {y.toFixed(1)}. Magnitude{' '}
        <InlineMath math="|\vec v| = \sqrt{x^2+y^2} \approx" /> {magnitude.toFixed(2)}, direction{' '}
        <InlineMath math="\theta = \tan^{-1}(y/x) \approx" /> {angleDeg.toFixed(1)}° anticlockwise from the
        positive x-axis.
      </p>
    </div>
  );
}
