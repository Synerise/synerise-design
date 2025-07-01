import * as CONST from '../../constants';
import { type DateRange } from '../../date.types';

export const findMatchingPreset = (range: DateRange) => {
  if (!range || range.type !== CONST.RELATIVE) {
    return;
  }

  const matchingPreset = CONST.RELATIVE_PRESETS.find((preset) => {
    return (
      Boolean(preset.future) === Boolean(range.future) &&
      preset.offset?.type === range.offset?.type &&
      preset.offset?.value === range.offset?.value &&
      preset.duration?.type === range.duration?.type &&
      preset.duration?.value === range.duration?.value
    );
  });

  return matchingPreset && { ...matchingPreset };
};
