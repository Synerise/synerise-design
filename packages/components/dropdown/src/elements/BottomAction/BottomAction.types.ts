import type { ReactElement, ReactNode } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type BottomActionProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    onClickAction: () => void;
    icon?: ReactElement;
    children?: ReactNode;
  }
>;

export type Props = BottomActionProps;
