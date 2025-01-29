import type { CSSProperties, ReactElement, ReactNode } from 'react';

export interface Props {
  onClickAction: () => void;
  icon?: ReactElement;
  children?: ReactNode;
  style?: CSSProperties;
}
