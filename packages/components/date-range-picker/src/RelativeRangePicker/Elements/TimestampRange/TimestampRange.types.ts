import { IntlShape } from 'react-intl';
import { RelativeDateRange } from '../../../date.types';
import { Texts } from '../../../DateRangePicker.types';

export type Props = {
  currentRange: RelativeDateRange;
  currentGroup: string | null;
  handleChange: (value: RelativeDateRange) => void;
  handleModeChange: (mode: string) => void;
  intl: IntlShape;
  onTimestampChange?: (timestamp: Date | undefined) => void;
  timestamp?: Date | undefined;
  texts?: Texts;
};
