import type { VisualComponentId } from '../../types/lesson';
import { ExponentialDecaySlider } from './ExponentialDecaySlider';
import { VectorPlayground } from './VectorPlayground';
import { MatrixMultiplyAnimation } from './MatrixMultiplyAnimation';

const registry: Partial<Record<VisualComponentId, () => React.ReactElement>> = {
  'exponential-decay-slider': ExponentialDecaySlider,
  'vector-playground': VectorPlayground,
  'matrix-multiply': MatrixMultiplyAnimation,
};

export function VisualRenderer({ component }: { component: VisualComponentId }) {
  const Component = registry[component];
  if (!Component) return null;
  return <Component />;
}
