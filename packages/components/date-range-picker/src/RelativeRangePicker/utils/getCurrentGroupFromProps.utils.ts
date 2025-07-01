import { type RelativeMode } from '../../DateRangePicker.types';
import { type RelativeRangePickerProps } from '../RelativeRangePicker.types';

export function getCurrentGroupFromProps({
  relativeModes,
}: RelativeRangePickerProps): RelativeMode | null {
  if (!!relativeModes && relativeModes?.length > 0) {
    return relativeModes[0];
  }

  return null;
}
