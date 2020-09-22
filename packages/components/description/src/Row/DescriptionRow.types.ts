import { IntlShape } from 'react-intl';
import * as React from 'react';

export interface DescriptionRowProps {
  intl: IntlShape;
  label: string | React.ReactNode;
  labelIcon?: React.ReactNode;
  value: React.ReactNode;
  prefixEl?: string | React.ReactNode;
  suffixEl?: string | React.ReactNode;
  copyValue?: string;
  starType?: 'active' | 'inactive';
  texts?: {
    copyTooltip?: string;
    copiedTooltip?: string;
  };
}
