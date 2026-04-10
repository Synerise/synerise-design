import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type BaseCopyableCellProps = {
  value: string;
  confirmMessage: string;
  tooltipTimeout: number;
};

export type CopyableCellProps = WithHTMLAttributes<
  HTMLDivElement,
  BaseCopyableCellProps
>;

/**
 *  @deprecated
 */
export type Props = CopyableCellProps;
