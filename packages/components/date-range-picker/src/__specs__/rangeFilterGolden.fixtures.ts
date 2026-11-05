import type { Texts } from '../DateRangePicker.types';
import type { RangeFilterValue } from '../RangeFilter/RangeFilter.types';

export const TEXTS = {
  filter: 'Date filter',
  change: 'Change',
  daily: 'Everyday',
  weekly: 'Every week',
  monthly: 'Every month',
  addTime: 'Add time',
  addRule: 'Add rule',
  selectAll: 'Select all',
  copyRange: 'Copy range',
  pasteRange: 'Paste range',
  clearRange: 'Clear range',
  inverseSelection: 'Inverse selection',
  range: 'Range',
  hour: 'Hour',
  saveFilter: 'Save filter',
  filterName: 'Filter name',
  savedFiltersTrigger: 'Saved filters',
} satisfies Partial<Texts>;

export type AppliedScenario =
  | 'dailyDefault'
  | 'dailyRangeOnly'
  | 'dailyEndHour'
  | 'dailyStartHour'
  | 'dailyHourMode'
  | 'dailySlider'
  | 'dailySliderInverted'
  | 'weeklyOneDay'
  | 'weeklyOneDayEndHour'
  | 'weeklyHourMode'
  | 'weeklyCtrlSelect'
  | 'weeklyShiftSelect'
  | 'weeklyShiftSelectUs'
  | 'weeklySelectAll'
  | 'weeklyCopyPaste'
  | 'weeklyClear'
  | 'monthlyDay'
  | 'monthlyDayEndHour'
  | 'monthlyCountedFromEnd'
  | 'monthlyWeek'
  | 'monthlyWeekCountedFromEnd'
  | 'monthlyTwoRules'
  | 'monthlyRemoveRule'
  | 'monthlyPeriodChangeResets'
  | 'typeSwitchKeepsDaily'
  | 'typeSwitchKeepsWeekly'
  | 'disallowedStoredType';

// The `filter` each scenario emits, recorded on master 4547f33b8c. Legacy quirks are recorded as
// they are: dailyHourMode drops `inverted` and sets `to` to `from`, weeklyShiftSelectUs selects by
// day key rather than display order, disallowedStoredType keeps a DAILY value.
export const APPLIED: Record<AppliedScenario, RangeFilterValue> = {
  dailyDefault: {
    from: '00:00:00.000',
    to: '23:59:59.999',
    day: undefined,
    type: 'DAILY',
    nestingType: 'IN_PLACE',
    inverted: false,
  },
  dailyRangeOnly: {
    from: '00:00:00.000',
    to: '23:59:59.999',
    day: undefined,
    type: 'DAILY',
    nestingType: 'IN_PLACE',
    inverted: false,
  },
  dailyEndHour: {
    from: '00:00:00.000',
    to: '07:59:59.999',
    day: undefined,
    restricted: true,
    display: false,
    inverted: false,
    mode: 'Range',
    type: 'DAILY',
    nestingType: 'IN_PLACE',
  },
  dailyStartHour: {
    from: '08:00:00.000',
    to: '23:59:59.999',
    day: undefined,
    restricted: true,
    display: false,
    inverted: false,
    mode: 'Range',
    type: 'DAILY',
    nestingType: 'IN_PLACE',
  },
  dailyHourMode: {
    from: '00:00:00.000',
    to: '00:00:00.000',
    day: undefined,
    mode: 'Hour',
    type: 'DAILY',
    nestingType: 'IN_PLACE',
  },
  dailySlider: {
    from: '00:00:00.000',
    to: '23:59:59.999',
    day: undefined,
    type: 'DAILY',
    nestingType: 'IN_PLACE',
    inverted: false,
  },
  dailySliderInverted: {
    from: '00:00:00.000',
    to: '23:59:59.999',
    day: undefined,
    restricted: true,
    display: false,
    inverted: true,
    mode: 'Range',
    type: 'DAILY',
    nestingType: 'IN_PLACE',
  },
  weeklyOneDay: {
    type: 'WEEKLY',
    nestingType: 'IN_PLACE',
    days: [
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 1,
        inverted: false,
        mode: 'Range',
      },
    ],
  },
  weeklyOneDayEndHour: {
    type: 'WEEKLY',
    nestingType: 'IN_PLACE',
    days: [
      {
        from: '00:00:00.000',
        to: '07:59:59.999',
        day: 3,
        inverted: false,
        mode: 'Range',
      },
    ],
  },
  weeklyHourMode: {
    type: 'WEEKLY',
    nestingType: 'IN_PLACE',
    days: [
      {
        from: '00:00:00.000',
        to: '00:00:00.000',
        day: 5,
        inverted: false,
        mode: 'Hour',
      },
    ],
  },
  weeklyCtrlSelect: {
    type: 'WEEKLY',
    nestingType: 'IN_PLACE',
    days: [
      {
        from: '09:00:00.000',
        to: '23:59:59.999',
        day: 1,
        inverted: false,
        mode: 'Range',
      },
      {
        from: '09:00:00.000',
        to: '23:59:59.999',
        day: 3,
        inverted: false,
        mode: 'Range',
      },
      {
        from: '09:00:00.000',
        to: '23:59:59.999',
        day: 5,
        inverted: false,
        mode: 'Range',
      },
    ],
  },
  weeklyShiftSelect: {
    type: 'WEEKLY',
    nestingType: 'IN_PLACE',
    days: [
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 2,
        inverted: false,
        mode: 'Range',
      },
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 3,
        inverted: false,
        mode: 'Range',
      },
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 4,
        inverted: false,
        mode: 'Range',
      },
    ],
  },
  weeklyShiftSelectUs: {
    type: 'WEEKLY',
    nestingType: 'IN_PLACE',
    days: [
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 2,
        inverted: false,
        mode: 'Range',
      },
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 3,
        inverted: false,
        mode: 'Range',
      },
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 4,
        inverted: false,
        mode: 'Range',
      },
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 5,
        inverted: false,
        mode: 'Range',
      },
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 6,
        inverted: false,
        mode: 'Range',
      },
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 7,
        inverted: false,
        mode: 'Range',
      },
    ],
  },
  weeklySelectAll: {
    type: 'WEEKLY',
    nestingType: 'IN_PLACE',
    days: [
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 1,
        inverted: false,
        mode: 'Range',
      },
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 2,
        inverted: false,
        mode: 'Range',
      },
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 3,
        inverted: false,
        mode: 'Range',
      },
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 4,
        inverted: false,
        mode: 'Range',
      },
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 5,
        inverted: false,
        mode: 'Range',
      },
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 6,
        inverted: false,
        mode: 'Range',
      },
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 7,
        inverted: false,
        mode: 'Range',
      },
    ],
  },
  weeklyCopyPaste: {
    type: 'WEEKLY',
    nestingType: 'IN_PLACE',
    days: [
      {
        from: '00:00:00.000',
        to: '07:59:59.999',
        day: 1,
        inverted: false,
        mode: 'Range',
      },
      {
        from: '00:00:00.000',
        to: '07:59:59.999',
        day: 4,
        inverted: false,
        mode: 'Range',
      },
    ],
  },
  weeklyClear: {
    type: 'WEEKLY',
    nestingType: 'IN_PLACE',
    days: [
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 2,
        inverted: false,
        mode: 'Range',
      },
    ],
  },
  monthlyDay: {
    type: 'MONTHLY',
    nestingType: 'IN_PLACE',
    rules: [
      {
        days: [
          {
            from: '00:00:00.000',
            to: '23:59:59.999',
            day: 15,
            inverted: false,
            mode: 'Range',
          },
        ],
        type: 'MONTH',
        inverted: false,
      },
    ],
  },
  monthlyDayEndHour: {
    type: 'MONTHLY',
    nestingType: 'IN_PLACE',
    rules: [
      {
        days: [
          {
            from: '00:00:00.000',
            to: '07:59:59.999',
            day: 31,
            inverted: false,
            mode: 'Range',
          },
        ],
        type: 'MONTH',
        inverted: false,
      },
    ],
  },
  monthlyCountedFromEnd: {
    type: 'MONTHLY',
    nestingType: 'IN_PLACE',
    rules: [
      {
        days: [
          {
            from: '00:00:00.000',
            to: '23:59:59.999',
            day: 1,
            inverted: false,
            mode: 'Range',
          },
        ],
        type: 'MONTH',
        inverted: true,
      },
    ],
  },
  monthlyTwoRules: {
    type: 'MONTHLY',
    nestingType: 'IN_PLACE',
    rules: [
      {
        days: [
          {
            from: '00:00:00.000',
            to: '23:59:59.999',
            day: 15,
            inverted: false,
            mode: 'Range',
          },
        ],
        type: 'MONTH',
        inverted: false,
      },
      {
        days: [
          {
            from: '00:00:00.000',
            to: '23:59:59.999',
            day: 1,
            inverted: false,
            mode: 'Range',
          },
        ],
        type: 'MONTH',
        inverted: false,
      },
    ],
  },
  monthlyRemoveRule: {
    type: 'MONTHLY',
    nestingType: 'IN_PLACE',
    rules: [
      {
        days: [
          {
            from: '00:00:00.000',
            to: '23:59:59.999',
            day: 15,
            inverted: false,
            mode: 'Range',
          },
        ],
        type: 'MONTH',
        inverted: false,
      },
    ],
  },
  typeSwitchKeepsDaily: {
    from: '00:00:00.000',
    to: '07:59:59.999',
    day: undefined,
    restricted: true,
    display: false,
    inverted: false,
    mode: 'Range',
    type: 'DAILY',
    nestingType: 'IN_PLACE',
  },
  typeSwitchKeepsWeekly: {
    type: 'WEEKLY',
    nestingType: 'IN_PLACE',
    days: [
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 6,
        inverted: false,
        mode: 'Range',
      },
    ],
  },
  disallowedStoredType: {
    from: '00:00:00.000',
    to: '23:59:59.999',
    day: undefined,
    type: 'DAILY',
    inverted: false,
    nestingType: 'IN_PLACE',
  },
  monthlyWeek: {
    type: 'MONTHLY',
    nestingType: 'IN_PLACE',
    rules: [
      {
        weeks: [
          {
            week: 1,
            days: [
              {
                from: '00:00:00.000',
                to: '23:59:59.999',
                day: 1,
                inverted: false,
                mode: 'Range',
                type: 'MONTHLY',
              },
            ],
          },
        ],
        type: 'WEEK',
        inverted: false,
      },
    ],
  },
  monthlyWeekCountedFromEnd: {
    type: 'MONTHLY',
    nestingType: 'IN_PLACE',
    rules: [
      {
        weeks: [
          {
            week: 5,
            days: [
              {
                from: '00:00:00.000',
                to: '23:59:59.999',
                day: 5,
                inverted: false,
                mode: 'Range',
                type: 'MONTHLY',
              },
            ],
          },
        ],
        type: 'WEEK',
        inverted: true,
      },
    ],
  },
  monthlyPeriodChangeResets: {
    type: 'MONTHLY',
    nestingType: 'IN_PLACE',
    rules: [
      {
        weeks: [
          {
            week: 1,
            days: [
              {
                from: '00:00:00.000',
                to: '23:59:59.999',
                day: 2,
                inverted: false,
                mode: 'Range',
                type: 'MONTHLY',
              },
            ],
          },
        ],
        type: 'WEEK',
        inverted: false,
      },
    ],
  },
};

// Stored values shaped like the analytics-v2 CustomDateFilter, as consumers persist them.
export const STORED = {
  dailyStoredByAnalytics: {
    from: '00:00:00.000',
    to: '23:59:59.999',
    type: 'DAILY',
    inverted: false,
    nestingType: 'IN_PLACE',
  },
  dailyInvertedHour: {
    type: 'DAILY',
    nestingType: 'IN_PLACE',
    from: '08:00:00.000',
    to: '08:59:59.999',
    inverted: true,
    mode: 'Hour',
  },
  weeklyOneDay: {
    type: 'WEEKLY',
    nestingType: 'IN_PLACE',
    days: [
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 5,
        inverted: false,
        mode: 'Range',
      },
    ],
  },
  weeklyMixed: {
    type: 'WEEKLY',
    nestingType: 'IN_PLACE',
    days: [
      {
        from: '06:00:00.000',
        to: '20:59:59.999',
        day: 1,
        inverted: false,
        mode: 'Range',
      },
      {
        from: '10:00:00.000',
        to: '10:59:59.999',
        day: 3,
        inverted: false,
        mode: 'Hour',
      },
      {
        from: '00:00:00.000',
        to: '05:59:59.999',
        day: 7,
        inverted: true,
        mode: 'Range',
      },
    ],
  },
  monthlyMonthRules: {
    type: 'MONTHLY',
    nestingType: 'IN_PLACE',
    rules: [
      {
        days: [
          {
            from: '00:00:00.000',
            to: '23:59:59.999',
            day: 27,
            inverted: false,
            mode: 'Range',
          },
        ],
        type: 'MONTH',
        inverted: false,
      },
      {
        days: [
          {
            from: '00:00:00.000',
            to: '23:59:59.999',
            day: 3,
            inverted: false,
            mode: 'Range',
          },
        ],
        type: 'MONTH',
        inverted: true,
      },
    ],
  },
  monthlyWeekRules: {
    type: 'MONTHLY',
    nestingType: 'IN_PLACE',
    rules: [
      {
        type: 'WEEK',
        inverted: false,
        weeks: [
          {
            week: 1,
            days: [
              {
                from: '09:00:00.000',
                to: '17:59:59.999',
                day: 1,
                inverted: false,
                mode: 'Range',
                type: 'MONTHLY',
              },
            ],
          },
          {
            week: 3,
            days: [
              {
                from: '12:00:00.000',
                to: '12:59:59.999',
                day: 5,
                inverted: false,
                mode: 'Hour',
                type: 'MONTHLY',
              },
            ],
          },
        ],
      },
      {
        type: 'WEEK',
        inverted: true,
        weeks: [
          {
            week: 2,
            days: [
              {
                from: '00:00:00.000',
                to: '23:59:59.999',
                day: 7,
                inverted: false,
                mode: 'Range',
                type: 'MONTHLY',
              },
            ],
          },
        ],
      },
    ],
  },
  monthlyMixedRules: {
    type: 'MONTHLY',
    nestingType: 'IN_PLACE',
    rules: [
      {
        type: 'MONTH',
        inverted: false,
        days: [
          {
            from: '06:00:00.000',
            to: '18:59:59.999',
            day: 1,
            inverted: false,
            mode: 'Range',
          },
          {
            from: '06:00:00.000',
            to: '18:59:59.999',
            day: 15,
            inverted: false,
            mode: 'Range',
          },
        ],
      },
      {
        type: 'WEEK',
        inverted: false,
        weeks: [
          {
            week: 4,
            days: [
              {
                from: '00:00:00.000',
                to: '23:59:59.999',
                day: 2,
                inverted: false,
                mode: 'Range',
                type: 'MONTHLY',
              },
            ],
          },
        ],
      },
    ],
  },
} satisfies Record<string, RangeFilterValue>;

// What reopening each stored value and applying it unchanged emits.
const REOPENED_EXPECTED: Record<keyof typeof STORED, RangeFilterValue> = {
  dailyStoredByAnalytics: {
    from: '00:00:00.000',
    to: '23:59:59.999',
    day: undefined,
    type: 'DAILY',
    inverted: false,
    nestingType: 'IN_PLACE',
  },
  dailyInvertedHour: {
    from: '08:00:00.000',
    to: '08:59:59.999',
    day: undefined,
    type: 'DAILY',
    nestingType: 'IN_PLACE',
    inverted: true,
    mode: 'Hour',
  },
  weeklyOneDay: {
    type: 'WEEKLY',
    nestingType: 'IN_PLACE',
    days: [
      {
        from: '00:00:00.000',
        to: '23:59:59.999',
        day: 5,
        inverted: false,
        mode: 'Range',
      },
    ],
  },
  weeklyMixed: {
    type: 'WEEKLY',
    nestingType: 'IN_PLACE',
    days: [
      {
        from: '06:00:00.000',
        to: '20:59:59.999',
        day: 1,
        inverted: false,
        mode: 'Range',
      },
      {
        from: '10:00:00.000',
        to: '10:59:59.999',
        day: 3,
        inverted: false,
        mode: 'Hour',
      },
      {
        from: '00:00:00.000',
        to: '05:59:59.999',
        day: 7,
        inverted: true,
        mode: 'Range',
      },
    ],
  },
  monthlyMonthRules: {
    type: 'MONTHLY',
    nestingType: 'IN_PLACE',
    rules: [
      {
        days: [
          {
            from: '00:00:00.000',
            to: '23:59:59.999',
            day: 27,
            inverted: false,
            mode: 'Range',
          },
        ],
        type: 'MONTH',
        inverted: false,
      },
      {
        days: [
          {
            from: '00:00:00.000',
            to: '23:59:59.999',
            day: 3,
            inverted: false,
            mode: 'Range',
          },
        ],
        type: 'MONTH',
        inverted: true,
      },
    ],
  },
  monthlyWeekRules: {
    type: 'MONTHLY',
    nestingType: 'IN_PLACE',
    rules: [
      {
        weeks: [
          {
            week: 1,
            days: [
              {
                from: '09:00:00.000',
                to: '17:59:59.999',
                day: 1,
                inverted: false,
                mode: 'Range',
                type: 'MONTHLY',
              },
            ],
          },
          {
            week: 3,
            days: [
              {
                from: '12:00:00.000',
                to: '12:59:59.999',
                day: 5,
                inverted: false,
                mode: 'Hour',
                type: 'MONTHLY',
              },
            ],
          },
        ],
        type: 'WEEK',
        inverted: false,
      },
      {
        weeks: [
          {
            week: 2,
            days: [
              {
                from: '00:00:00.000',
                to: '23:59:59.999',
                day: 7,
                inverted: false,
                mode: 'Range',
                type: 'MONTHLY',
              },
            ],
          },
        ],
        type: 'WEEK',
        inverted: true,
      },
    ],
  },
  monthlyMixedRules: {
    type: 'MONTHLY',
    nestingType: 'IN_PLACE',
    rules: [
      {
        days: [
          {
            from: '06:00:00.000',
            to: '18:59:59.999',
            day: 1,
            inverted: false,
            mode: 'Range',
          },
          {
            from: '06:00:00.000',
            to: '18:59:59.999',
            day: 15,
            inverted: false,
            mode: 'Range',
          },
        ],
        type: 'MONTH',
        inverted: false,
      },
      {
        weeks: [
          {
            week: 4,
            days: [
              {
                from: '00:00:00.000',
                to: '23:59:59.999',
                day: 2,
                inverted: false,
                mode: 'Range',
                type: 'MONTHLY',
              },
            ],
          },
        ],
        type: 'WEEK',
        inverted: false,
      },
    ],
  },
};

export const REOPENED = Object.fromEntries(
  Object.entries(STORED).map(([name, stored]) => [
    name,
    { stored, expected: REOPENED_EXPECTED[name as keyof typeof STORED] },
  ]),
) as Record<
  keyof typeof STORED,
  { stored: RangeFilterValue; expected: RangeFilterValue }
>;

// Reopening a payload the picker emitted and applying it unchanged returns the same payload,
// except where listed.
export const REAPPLIED: Record<AppliedScenario, RangeFilterValue> = {
  ...APPLIED,
};
