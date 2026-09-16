import { useId, useState } from 'react';
import { Mafs, Coordinates, Plot, Point, Line } from 'mafs';
import 'mafs/core.css';
import 'mafs/font.css';
import { InlineMath } from '../../lib/math/Math';

const V0 = 10;
const T_MAX = 10;
const RC_MIN = 0.5;
const RC_MAX = 5;

export function ExponentialDecaySlider() {
  const [rc, setRc] = useState(2);
  const [t, setT] = useState(2);
  const rcSliderId = useId();
  const tSliderId = useId();

  const voltage = V0 * Math.exp(-t / rc);

  return (
    <div className="visual-card">
      <div className="visual-controls">
        <div className="visual-control">
          <label htmlFor={rcSliderId}>
            Time constant <InlineMath math="RC" /> = {rc.toFixed(1)} s
          </label>
          <input
            id={rcSliderId}
            type="range"
            min={RC_MIN}
            max={RC_MAX}
            step={0.1}
            value={rc}
            onChange={(event) => setRc(Number(event.target.value))}
          />
        </div>
        <div className="visual-control">
          <label htmlFor={tSliderId}>
            Time <InlineMath math="t" /> = {t.toFixed(1)} s
          </label>
          <input
            id={tSliderId}
            type="range"
            min={0}
            max={T_MAX}
            step={0.1}
            value={t}
            onChange={(event) => setT(Number(event.target.value))}
          />
        </div>
      </div>

      <Mafs height={300} viewBox={{ x: [0, T_MAX], y: [0, V0 + 1], padding: 0.3 }} preserveAspectRatio={false}>
        <Coordinates.Cartesian
          xAxis={{ axis: true, lines: 1 }}
          yAxis={{ axis: true, lines: 2 }}
        />
        <Plot.OfX y={(x) => V0 * Math.exp(-x / rc)} color="#7c5cff" weight={3} />
        <Line.Segment point1={[t, 0]} point2={[t, voltage]} color="#ff5c7c" weight={1} style="dashed" />
        <Line.Segment point1={[0, voltage]} point2={[t, voltage]} color="#ff5c7c" weight={1} style="dashed" />
        <Point x={t} y={voltage} color="#ff5c7c" />
      </Mafs>

      <p className="visual-readout">
        At <InlineMath math="t" /> = {t.toFixed(1)} s, <InlineMath math="V = V_0 e^{-t/RC} \approx" />{' '}
        {voltage.toFixed(2)} V (starting from <InlineMath math="V_0 = 10" /> V)
      </p>
    </div>
  );
}
