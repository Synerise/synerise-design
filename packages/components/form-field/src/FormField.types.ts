import type { ReactNode } from 'react';
import type { WithHTMLAttributes } from '@synerise/ds-utils';
import type { TooltipProps } from '@synerise/ds-tooltip';

export type ContentAboveProps = BaseLabelProps & {
  rightSide?: ReactNode;
};

type BaseLabelProps = {
  label?: ReactNode;
  tooltip?: ReactNode;
  tooltipConfig?: TooltipProps;
  id?: string;
};

export type FormFieldCommonProps = Omit<ContentAboveProps, 'id' | 'rightSide'> & ContentBelowProps;

export type FormFieldProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    children?: ReactNode;
  } & ContentAboveProps &
    ContentBelowProps
>;

export type ContentBelowProps = {
  errorText?: ReactNode;
  description?: ReactNode;
};

export type FormFieldLabelProps = WithHTMLAttributes<
  HTMLLabelElement,
  BaseLabelProps & {
    children?: ReactNode;
  }
>;
