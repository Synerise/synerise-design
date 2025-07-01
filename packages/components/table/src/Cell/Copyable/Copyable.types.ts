import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type CopyableCellProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    value: string;
    confirmMessage: string;
    tooltipTimeout: number;
  }
>;

/**
 *  @deprecated
 */
export type Props = CopyableCellProps;
