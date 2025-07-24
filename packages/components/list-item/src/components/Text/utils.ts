import type { ReactNode } from 'react';

import { type AddonRenderer, type BasicItemProps } from '../../ListItem.types';

export const renderAddon = (
  addon: ReactNode | AddonRenderer,
  ...params: Parameters<AddonRenderer>
) => {
  return addon instanceof Function ? addon(...params) : addon;
};

export const removeHandlerProps = (props: BasicItemProps) => {
  return Object.fromEntries(
    Object.entries(props).filter(
      ([key]) => typeof props[key as keyof BasicItemProps] !== 'function',
    ),
  );
};
