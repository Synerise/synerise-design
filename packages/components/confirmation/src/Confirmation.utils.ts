import { ICON_COLOR_MAPPING } from './Confirmation.const';
import { type ConfirmationType } from './Confirmation.types';

export const getIconColor = (type: ConfirmationType) =>
  ICON_COLOR_MAPPING[type];
