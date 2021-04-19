import * as React from 'react';


export type AlertInfoProps = {
  size?: AlertSize.SMALL | AlertSize.MEDIUM;
  fontSize?: AlertSize.SMALL | AlertSize.MEDIUM;
  text?: string | React.ReactNode;
  button?: string | React.ReactNode;
  label?: string | React.ReactNode;
  labelPosition?: 'bottom' | 'right';
  mode?: 'absolute';
  customIcon?: React.ReactElement;
  type: string | 'warning' | 'error' | 'success';
};
enum AlertSize {  SMALL = "small", MEDIUM = "medium"  }
export const IconSize = { [AlertSize.SMALL] : 48, [AlertSize.MEDIUM]: 96  }
export const FontSize = { [AlertSize.SMALL] : 14, [AlertSize.MEDIUM]: 18  }