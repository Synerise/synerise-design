import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type EditableCellProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    value?: string;
    onChange: (newValue: string) => void;
    placeholder?: string;
  }
>;

/**
 *  @deprecated
 */
export type Props = EditableCellProps;
