import type { RelativeMode, Texts } from '../../../DateRangePicker.types';

export type Props = {
  currentGroup: RelativeMode | null;
  onModeChange: (mode: RelativeMode | null) => void;
  modes: RelativeMode[];
  texts: Texts;
};
