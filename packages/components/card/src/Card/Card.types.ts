import { type CSSProperties, type ReactNode, type SyntheticEvent } from 'react';

export type Backgrounds =
  | 'white'
  | 'white-shadow'
  | 'grey'
  | 'grey-shadow'
  | 'outline';

export interface CardProps {
  raised?: boolean;
  disabled?: boolean;
  className?: string;
  lively?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
  withHeader?: boolean;
  defaultHeaderBackgroundColor?: boolean;
  compactHeader?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  renderBadge?: () => ReactNode;
  iconColor?: string;
  avatar?: ReactNode;
  staticContent?: ReactNode;
  headerSideChildren?: ReactNode;
  onHeaderClick?: (e: SyntheticEvent) => void;
  withoutPadding?: boolean;
  headerBorderBottom?: boolean;
  background?: Backgrounds;
  hideContent?: boolean;
  showSideChildrenWhenHeaderHidden?: boolean;
  titleTag?: ReactNode;
}
