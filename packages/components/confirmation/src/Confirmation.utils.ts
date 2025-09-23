import { type ThemePropsVars } from '@synerise/ds-core';

import { ICON_COLOR_MAPPING } from './Confirmation.const';
import { type ConfirmationType } from './Confirmation.types';

export const getIconColor = (type: ConfirmationType, theme: ThemePropsVars) => {
  const colorToken = ICON_COLOR_MAPPING[type];
  return theme.palette[colorToken];
};
