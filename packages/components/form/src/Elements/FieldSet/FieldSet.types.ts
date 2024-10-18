import { ReactNode } from 'react';

export type FieldSetProps = {
  className?: string;
  heading: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  withLine?: boolean;
}
