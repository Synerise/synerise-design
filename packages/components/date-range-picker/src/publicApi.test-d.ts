// Type-level tests of the public value model, checked by the package's `types` script (tsc).
import type { Dispatch, ReactElement, SetStateAction } from 'react';

import {
  type DateRange,
  type DateRangePickerProps,
  isSinceRange,
  type RangeFilterValue,
  type RelativeDateRange,
} from './index';

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;
type Expect<T extends true> = T;

export type OnApplyEmitsDateRange = Expect<
  Equal<Parameters<DateRangePickerProps['onApply']>[0], DateRange | undefined>
>;

export type OnValueChangeEmitsDateRange = Expect<
  Equal<
    Parameters<NonNullable<DateRangePickerProps['onValueChange']>>[0],
    DateRange
  >
>;

export type FilterIsTheRangeFilterPayload = Expect<
  Equal<DateRange['filter'], RangeFilterValue | undefined>
>;

export const valueIsOptional: Pick<DateRangePickerProps, 'value'> = {
  value: undefined,
};

declare const setRange: Dispatch<SetStateAction<DateRange | undefined>>;
export const stateSetterIsAnApplyHandler: DateRangePickerProps['onApply'] =
  setRange;

declare const trigger: ReactElement;
export const renderPopoverTrigger: DateRangePickerProps['renderPopoverTrigger'] =
  ({ setPopupVisible }) => {
    setPopupVisible((visible) => !visible);
    return trigger;
  };

export const sinceAnchorIsADate = (range: DateRange): Date | number | null => {
  if (range.type !== 'RELATIVE') {
    return null;
  }
  if (isSinceRange(range)) {
    const anchor: Date = range.offset.value;
    return anchor;
  }
  const offset: number = range.offset.value;
  return offset;
};

export const legacySinceType: DateRange = {
  // @ts-expect-error `type: 'SINCE'` is never emitted; a SINCE range is RELATIVE
  type: 'SINCE',
};

export const relativeOffsetIsAUnit: RelativeDateRange = {
  type: 'RELATIVE',
  duration: { type: 'DAYS', value: 7 },
  // @ts-expect-error a SINCE offset makes it a SinceDateRange
  offset: { type: 'SINCE', value: 0 },
};
