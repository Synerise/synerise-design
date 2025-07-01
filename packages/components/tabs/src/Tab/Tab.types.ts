import type { RefObject } from 'react';

import type { TabItem } from '../Tabs.types';

export type TabProps = TabItem & {
  index: number;
  underscore?: boolean;
  isActive?: boolean;
  className?: string;
  onClick: (index: number) => void;
  forwardedRef: RefObject<HTMLButtonElement>;
  block?: boolean;
};
