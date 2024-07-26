import { HTMLAttributes } from 'react';
import { RowTexts } from './DescriptionRow.types';

export type CopyProps = {
  copyValue: string;
  texts?: RowTexts;
} & HTMLAttributes<HTMLDivElement>;
