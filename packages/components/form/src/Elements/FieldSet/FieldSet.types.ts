import type { ReactNode } from 'react';

export interface FieldSetProps {
  className?: string;
  heading: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  withLine?: boolean;
}
