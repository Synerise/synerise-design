import { type ReactNode } from 'react';

export type HoverableSuffixProps = {
  hovered: boolean;
  hoverContent: ReactNode;
  defaultContent?: ReactNode;
};
