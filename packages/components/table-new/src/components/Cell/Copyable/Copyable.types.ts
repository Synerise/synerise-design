import { type TooltipProps } from '@synerise/ds-tooltip';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type BaseCopyableCellProps = {
  value: string;
  confirmMessage: string;
  tooltipTimeout: number;
  /**
   * Tooltip placement for the copy icon's confirmation tooltip.
   * @default 'top'
   */
  placement?: TooltipProps['placement'];
};

export type CopyableCellProps = WithHTMLAttributes<
  HTMLDivElement,
  BaseCopyableCellProps
>;

/**
 *  @deprecated
 */
export type Props = CopyableCellProps;
