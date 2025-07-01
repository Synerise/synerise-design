import type React from 'react';

export interface DescriptionRowProps {
  label?: string | React.ReactNode;
  labelIcon?: React.ReactNode;
  value: React.ReactNode;
  prefixEl?: string | React.ReactNode;
  suffixEl?: string | React.ReactNode;
  copyValue?: string;
  starType?: 'active' | 'inactive';
  texts?: RowTexts;
}

export type RowTexts = {
  copyTooltip?: string;
  copiedTooltip?: string;
};
