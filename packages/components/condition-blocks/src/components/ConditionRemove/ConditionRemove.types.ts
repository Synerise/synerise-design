import type { MouseEvent } from 'react';

import type { WithHTMLAttributes } from '@synerise/ds-utils';

type ConditionRemoveOwnProps = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Hidden until the containing `ConditionRow` is hovered. @default true */
  revealOnRowHover?: boolean;
  disabled?: boolean;
};

export type ConditionRemoveProps = WithHTMLAttributes<
  HTMLButtonElement,
  ConditionRemoveOwnProps
>;
