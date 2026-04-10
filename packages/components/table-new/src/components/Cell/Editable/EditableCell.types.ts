import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type BaseEditableCellProps = {
  value?: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
};

export type EditableCellProps = WithHTMLAttributes<
  HTMLDivElement,
  BaseEditableCellProps
>;

/**
 *  @deprecated
 */
export type Props = EditableCellProps;
