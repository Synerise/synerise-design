import DateRangePicker, { DailyDateFilter, WeeklyDateFilter, RawDateRangePicker } from '@synerise/ds-date-range-picker';
import { ArgTypes } from '@storybook/types';
import {
  STYLE_ARG_CONTROL,
  CLASSNAME_ARG_CONTROL,
  stringWithNoControl,
  PREFIXCLS_ARG_CONTROL,
  STRING_CONTROL,
  BOOLEAN_CONTROL,
  REACT_NODE_AS_STRING,
  NUMBER_CONTROL,
  controlFromOptionsArray,
  tableConfig,
} from '../../utils';

const callbackControl = {
  table: {
    category: 'General',
  },
  control: false,
};

export const generalArgTypes: Partial<ArgTypes<typeof DateRangePicker>> = {
  containerClass: {
    ...tableConfig({ category: 'General' }),
    ...STRING_CONTROL,
  },
  arrowColor: {
    ...tableConfig({ category: 'General' }),
  },

  value: {
    ...tableConfig({ category: 'General' }),
    ...STRING_CONTROL,
  },
  defaultValue: {
    ...tableConfig({ category: 'General' }),
    ...STRING_CONTROL,
  },
  getPopupContainer: {
    ...tableConfig({ category: 'General' }),
  },
  renderPopoverTrigger: {
    ...tableConfig({ category: 'General' }),
  },
  popoverTrigger: {
    ...tableConfig({ category: 'General' }),
  },
  onApply: {
    ...callbackControl,
  },
  onVisibleChange: {
    ...callbackControl,
  },
  onValueChange: {
    ...callbackControl,
  },
  disabledDate: {
    ...tableConfig({ category: 'General' }),
  },
  format: {
    ...tableConfig({ category: 'General' }),
  },
  readOnly: {
    ...tableConfig({ category: 'General' }),
    ...BOOLEAN_CONTROL,
  },
  disabled: {
    ...tableConfig({ category: 'General' }),
    ...BOOLEAN_CONTROL,
  },
  isTruncateMs: {
    ...tableConfig({ category: 'General' }),
    ...BOOLEAN_CONTROL,
  },
  disableDefaultTexts: {
    ...tableConfig({ category: 'General' }),
    ...BOOLEAN_CONTROL,
  },
  footerProps: {
    ...tableConfig({ category: 'General' }),
  },
  valueFormatOptions: {
    ...tableConfig({ category: 'General' }),
  },
  valueTransformer: {
    ...tableConfig({ category: 'General' }),
  },

  validate: {
    ...tableConfig({ category: 'General' }),
  },
  forceAbsolute: {
    ...tableConfig({ category: 'General' }),
    ...BOOLEAN_CONTROL,
  },
  texts: {
    ...tableConfig({ category: 'General' }),
  },
  popoverProps: {
    ...tableConfig({ category: 'General' }),
  },
};
/// datepicker configuration props
export const datePickerArgTypes: Partial<ArgTypes<typeof DateRangePicker>> = {
  forceAdjacentMonths: {
    ...tableConfig({ category: 'Date Picker configuration' }),
    ...BOOLEAN_CONTROL,
    description: 'Always render two consecutive months in datepicker',
  },
  showTime: {
    ...tableConfig({ category: 'Date Picker configuration' }),
    ...BOOLEAN_CONTROL,
    description: 'Allow specifying time for start and end date',
  },
  showNowButton: {
    ...tableConfig({ category: 'Date Picker configuration' }),
    ...BOOLEAN_CONTROL,
    description: 'Render "Now" button in the UI',
  },
};

export const filterArgTypes: Partial<ArgTypes<typeof DateRangePicker>> = {
  savedFilters: {
    ...tableConfig({ category: 'Date Filter configuration' }),
    control: false,
    description: 'Array of previously saved filters',
  },
  onFilterSave: {
    ...tableConfig({ category: 'Date Filter configuration' }),
    control: false,
    description: 'Callback that saves filter.',
  },
  showFilter: {
    ...tableConfig({ category: 'Date Filter configuration' }),
    ...BOOLEAN_CONTROL,
    description: 'Enable "Date filter" section',
  },
  filterValueSelectionModes: {
    ...tableConfig({ category: 'Date Filter configuration' }),
    description: 'Select which filter modes should be available: `Range` or `Hour`',
  },
  filterRangeDisplayMode: {
    ...tableConfig({ category: 'Date Filter configuration' }),

    // ...controlFromOptionsArray('radio', ['slider', 'timepicker']),
    description: 'Select UI for specifying a filter range: `slider` or `timepicker`',
  },
  allowedFilterTypes: {
    ...tableConfig({ category: 'Date Filter configuration' }),
    description: 'Select what filter types should be available: `DAILY`, `WEEKLY`, `MONTHLY`',
  },
};

export const relativeArgTypes: Partial<ArgTypes<typeof DateRangePicker>> = {
  showRelativePicker: {
    ...tableConfig({ category: 'Relative Picker configuration' }),
    ...BOOLEAN_CONTROL,
    description: 'Include "Relative date range" section',
  },
  disableAbsoluteTimepickerInRelative: {
    ...tableConfig({ category: 'Relative Picker configuration' }),
    ...BOOLEAN_CONTROL,
    description: 'Set to true if you wish to disable selecting time when a relative range is selected.',
  },
  showCustomRange: {
    ...tableConfig({ category: 'Relative Picker configuration' }),
    ...BOOLEAN_CONTROL,
    description: 'Include "Custom date range" option in relative preset buttons',
  },
  relativeModes: {
    ...tableConfig({ category: 'Relative Picker configuration' }),
    description: "Available modes for relative picker. `RelativeMode =  'PAST' | 'FUTURE' | 'SINCE' `",
  },
  rangeUnits: {
    ...tableConfig({ category: 'Relative Picker configuration' }),
    description: 'Available units for custom range form',
  },
  ranges: {
    ...tableConfig({ category: 'Relative Picker configuration' }),
    description: 'Customise relative range presets',
  },
  rangePickerInputProps: {
    ...tableConfig({ category: 'Relative Picker configuration' }),
    description: 'subset of InputProps (see ds-input component)',
  },
  relativePast: {
    // What does this do?
    ...tableConfig({ category: 'Relative Picker configuration' }),
    ...BOOLEAN_CONTROL,
  },
  relativeFuture: {
    // What does this do?
    ...tableConfig({ category: 'Relative Picker configuration' }),
    ...BOOLEAN_CONTROL,
  },
};

export const schedulerCommonArgTypes: Partial<ArgTypes<typeof WeeklyDateFilter | typeof DailyDateFilter>> = {
  maxEntries: {
    table: {
      defaultValue: { summary: '4' },
    },
    ...NUMBER_CONTROL,
  },
  disabled: {
    ...BOOLEAN_CONTROL,
  },
  valueSelectionMode: {
    ...controlFromOptionsArray('check', ['Range', 'Hour']),
    description: 'Select which filter modes should be available: `Range` or `Hour`',
  },
  timePickerProps: {
    description: 'See ds-time-picker',
  },
  errorTexts: {},
};
