import type { ComponentType } from 'react';
import type { IntlShape } from 'react-intl';

import type { Texts } from '../../DateRangePicker.types';
import type { RangeFilterType } from '../constants';
import type {
  DailyFilterValue,
  FilterDefinition,
  MonthlyFilterValue,
  RangeFilterDaily,
  RangeFilterMonthly,
  RangeFilterValue,
  RangeFilterWeekly,
  WeeklyFilterValue,
} from '../RangeFilter.types';
import type {
  DateLimitMode,
  RangeDisplayMode,
} from '../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';

export type EditorValues = {
  DAILY: DailyFilterValue;
  WEEKLY: WeeklyFilterValue;
  MONTHLY: MonthlyFilterValue;
};

export type StoredValues = {
  DAILY: RangeFilterDaily;
  WEEKLY: RangeFilterWeekly;
  MONTHLY: RangeFilterMonthly;
};

/** What RangeFilter hands every editor, whatever its type. */
export type FilterEditorContext = {
  intl: IntlShape;
  texts: Texts;
  rangeDisplayMode?: RangeDisplayMode;
  valueSelectionModes?: DateLimitMode[];
  rangeClipboard?: Partial<FilterDefinition>;
  onRangeCopy: (range?: Partial<FilterDefinition>) => void;
};

export type FilterEditorProps<Definition> = FilterEditorContext & {
  value: Definition;
  onChange: (definition: Definition) => void;
};

export type FilterEditor<Definition> = ComponentType<
  FilterEditorProps<Definition>
>;

/**
 * Pairs a schedule editor with the conversion between its own value and the
 * stored payload, so RangeFilter never depends on an editor's value shape.
 */
export type FilterAdapter<Type extends RangeFilterType> = {
  component: FilterEditor<EditorValues[Type]['definition']>;
  toEditor: (value: StoredValues[Type]) => EditorValues[Type];
  fromEditor: (value: EditorValues[Type]) => RangeFilterValue;
  defaultValue: () => EditorValues[Type];
  isValid: (value: EditorValues[Type]) => boolean;
  editorProps: (context: FilterEditorContext) => FilterEditorContext;
};

export type FilterAdapters = {
  [Type in RangeFilterType]: FilterAdapter<Type>;
};
