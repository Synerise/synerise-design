import { RelativeRangePickerProps } from '../RelativeRangePicker.types';
import { RelativeMode } from '../../DateRangePicker.types';

export function getCurrentGroupFromProps({ relativeModes }: RelativeRangePickerProps): RelativeMode | null {
  if (!!relativeModes && relativeModes?.length > 0) {
    return relativeModes[0];
  }

  return null;
}
