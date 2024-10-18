import { ReactNode, ReactElement, CSSProperties } from 'react';

export type Props = {
  onClickAction: () => void;
  icon?: ReactElement;
  style?: CSSProperties;
  children?: ReactNode;
};
