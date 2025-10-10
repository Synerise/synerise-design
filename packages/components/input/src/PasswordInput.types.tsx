import { type ReactNode } from 'react';

import { type InputProps } from './Input.types';

export type PasswordInputTexts = {
  showText: ReactNode;
  hideText: ReactNode;
};

export type PasswordInputProps = Omit<
  InputProps,
  | 'icon1'
  | 'icon1Tooltip'
  | 'icon2'
  | 'icon2Tooltip'
  | 'suffixel'
  | 'prefixel'
  | 'type'
  | 'expandableTooltip'
> & {
  texts?: Partial<PasswordInputTexts>;
};
