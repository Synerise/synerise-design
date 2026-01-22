import { useMemo } from 'react';

import { type ColorMap } from '../Slider.types';
import { getDefaultColorMap } from '../utils/Slider.utils';

export const useColorMap = (
  count: number,
  type: 'default' | 'allocation' | 'range',
  customMap?: ColorMap,
) => {
  return useMemo(() => {
    return customMap || getDefaultColorMap(count, type);
  }, [customMap, count, type]);
};
