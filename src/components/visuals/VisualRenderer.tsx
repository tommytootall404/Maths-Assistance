import type { VisualComponentId } from '../../types/lesson';
import { ExponentialDecaySlider } from './ExponentialDecaySlider';
import { VectorPlayground } from './VectorPlayground';

const registry: Partial<Record<VisualComponentId, () => React.ReactElement>> = {
  'exponential-decay-slider': ExponentialDecaySlider,
  'vector-playground': VectorPlayground,
};

export function VisualRenderer({ component }: { component: VisualComponentId }) {
  const Component = registry[component];
  if (!Component) return null;
  return <Component />;
}
