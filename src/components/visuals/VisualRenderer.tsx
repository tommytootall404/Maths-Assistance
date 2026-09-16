import type { VisualComponentId } from '../../types/lesson';
import { ExponentialDecaySlider } from './ExponentialDecaySlider';
import { VectorPlayground } from './VectorPlayground';
import { MatrixMultiplyAnimation } from './MatrixMultiplyAnimation';
import { TangentExplorer } from './TangentExplorer';
import { AreaUnderCurve } from './AreaUnderCurve';

const registry: Partial<Record<VisualComponentId, () => React.ReactElement>> = {
  'exponential-decay-slider': ExponentialDecaySlider,
  'vector-playground': VectorPlayground,
  'matrix-multiply': MatrixMultiplyAnimation,
  'tangent-explorer': TangentExplorer,
  'area-under-curve': AreaUnderCurve,
};

export function VisualRenderer({ component }: { component: VisualComponentId }) {
  const Component = registry[component];
  if (!Component) return null;
  return <Component />;
}
