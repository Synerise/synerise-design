import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type MultivalueProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    values: ProgressValue[];
    stackedBars?: boolean;
  }
>;

export type ProgressValue = {
  percent: number;
  color: string;
};
