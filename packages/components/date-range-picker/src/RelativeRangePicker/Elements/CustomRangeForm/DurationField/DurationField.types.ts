import { RelativeDateRange } from '../../../../date.types';
import { Texts } from '../../../../DateRangePicker.types';

export type Props = {
  currentRange: RelativeDateRange;
  currentGroup: string | null;
  handleChange: (value: RelativeDateRange) => void;
  handleDurationValueChange: (value?: number) => void;
  texts: Texts;
};
