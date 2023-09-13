import { ReactNode } from 'react';
import { prefixType } from '../CardTab.types';

export interface Props {
  prefix: prefixType;
  draggable?: boolean;
  tag?: string;
  prefixIcon?: ReactNode;
  colorDot?: ReactNode;
}
