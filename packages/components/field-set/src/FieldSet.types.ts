import { ReactNode, MouseEvent as ReactMouseEvent } from 'react';

export type FieldSetProps = {
  component?: ReactNode;
  prefix?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  button?: ReactNode;
  onTitleClick?: (ev: ReactMouseEvent<HTMLElement, MouseEvent>) => void;
  className?: string;
  divider?: boolean;
};
