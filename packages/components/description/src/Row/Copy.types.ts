import type { WithHTMLAttributes } from '@synerise/ds-utils';

import type { RowTexts } from './DescriptionRow.types';

export type CopyProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    copyValue: string;
    texts?: RowTexts;
  }
>;
