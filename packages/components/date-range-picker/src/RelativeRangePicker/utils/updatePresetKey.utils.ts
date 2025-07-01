import { CUSTOM_RANGE_KEY } from '../../constants';
import { type RelativeDateRange } from '../../date.types';
import { findMatchingPreset } from './findMatchingPreset.utils';

export const updatePresetKey = (
  range: RelativeDateRange,
): RelativeDateRange => {
  const matchingPreset = findMatchingPreset(range);
  if (matchingPreset && matchingPreset.key) {
    return {
      ...range,
      key: matchingPreset.key,
      translationKey: matchingPreset.translationKey,
    };
  }
  return { ...range, key: CUSTOM_RANGE_KEY, translationKey: CUSTOM_RANGE_KEY };
};
