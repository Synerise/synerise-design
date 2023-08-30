import type { DateLimitMode, RangeDisplayMode } from './RangeForm.types';

export const FORM_MODES: Record<string, DateLimitMode> = {
  HOUR: 'Hour',
  RANGE: 'Range',
};

export const RANGE_DISPLAY_MODES: Record<string, RangeDisplayMode> = {
  TIMEPICKER: 'timepicker',
  SLIDER: 'slider',
};
export const RANGE_FORM_INTL_KEYS = {
  Hour: { id: 'DS.DATE-RANGE-PICKER.HOUR', defaultMessage: 'Hour' },
  Range: { id: 'DS.DATE-RANGE-PICKER.RANGE', defaultMessage: 'Range' },
};
export const SLIDER_MAX = 24;
export const SLIDER_MIN = 0;
export const SLIDER_STEP = 0.25;
