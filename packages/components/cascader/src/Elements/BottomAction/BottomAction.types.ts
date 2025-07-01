import type { ReactElement, ReactNode } from 'react';

export type BottomActionProps = {
  onClickAction: () => void;
  icon?: ReactElement;
  children?: ReactNode;
};

// @deprecated - use BottomActionProps instead
export type Props = BottomActionProps;
