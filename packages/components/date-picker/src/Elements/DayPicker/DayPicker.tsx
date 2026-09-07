import React from 'react';
import {
  type CalendarDay,
  DayFlag,
  type Matcher,
  type Modifiers,
  SelectionState,
  UI,
} from 'react-day-picker';
import { injectIntl } from 'react-intl';

import { useDataFormat } from '@synerise/ds-core';

import { fnsAddMonths, fnsAddYears } from '../../fns';
import fnsFormat from '../../format';
import defaultLocaleUtils from '../../localeUtils';
import Navbar from '../Navbar/Navbar';
import * as S from '../Navbar/Navbar.styles';
import { DayPicker } from './DayPicker.styles';
import { type DayPickerProps } from './DayPicker.types';

/**
 * react-day-picker v10 emits its own `rdp-*` class names. The design system's stylesheet, its
 * specs and the Chromatic stories were all written against v7's `DayPicker-*` names, so every
 * element and modifier is mapped back onto them here. This is the whole compatibility surface —
 * if a modifier ever stops being styled, the cause is a missing entry in one of these two maps.
 */
const CLASS_NAMES: Partial<Record<UI | DayFlag | SelectionState, string>> = {
  [UI.Root]: 'DayPicker DayPicker-wrapper',
  [UI.Months]: 'DayPicker-Months',
  [UI.Month]: 'DayPicker-Month-Wrapper',
  [UI.MonthGrid]: 'DayPicker-Month',
  [UI.Weekdays]: 'DayPicker-WeekdaysRow',
  [UI.Weekday]: 'DayPicker-Weekday',
  [UI.Weeks]: 'DayPicker-Body',
  [UI.Week]: 'DayPicker-Week',
  [UI.Day]: 'DayPicker-Day',
  [UI.DayButton]: 'DayPicker-Day-Button',
  [DayFlag.today]: 'DayPicker-Day--today',
  [DayFlag.outside]: 'DayPicker-Day--outside',
  [DayFlag.disabled]: 'DayPicker-Day--disabled',
  [DayFlag.hidden]: 'DayPicker-Day--hidden',
  [DayFlag.focused]: 'DayPicker-Day--focused',
  [SelectionState.selected]: 'DayPicker-Day--selected',
};

/** Modifier names the two pickers set by hand, mapped to the classes the stylesheet expects. */
const MODIFIER_CLASS_NAMES = [
  'selected',
  'today',
  'start',
  'end',
  'entered',
  'entered-start',
  'entered-end',
  'initial',
  'initial-entered',
  'ghost',
].reduce<Record<string, string>>((acc, modifier) => {
  acc[modifier] = `DayPicker-Day--${modifier}`;
  return acc;
}, {});

/** v7 kept the weekday header in a `thead > tr`; v10 puts no class on the `thead`. */
const Weekdays = (props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <thead className="DayPicker-Weekdays" aria-hidden>
    <tr {...props} />
  </thead>
);

// v7 suppressed the caption with `captionElement={() => null}`; the design system renders its
// own `Navbar` above the grid instead. v10 always renders this slot, so it is emptied here.
const MonthCaption = (): React.JSX.Element => <></>;

const NOOP = (): void => {};

const toMatchers = (value: Matcher | Matcher[] | undefined): Matcher[] =>
  (Array.isArray(value) ? value : [value]).filter(Boolean) as Matcher[];

type DayButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  day: CalendarDay;
  modifiers: Modifiers;
};

const Picker = (props: DayPickerProps) => {
  const {
    month,
    onMonthChange,
    onMonthNameClick,
    onYearNameClick,
    hideLongNext,
    hideLongPrev,
    hideShortNext,
    hideShortPrev,
    renderNavbar,
    intl,
    modifiers,
    canChangeMonth,
    disabledDays,
    selectedDays,
    renderDay,
    localeUtils = defaultLocaleUtils,
    onDayClick,
    ...rest
  } = props;

  const { firstDayOfWeek } = useDataFormat();

  // Memoised on the identity of `renderDay`: a fresh component object on every render would
  // remount every cell, and a remount between mousedown and mouseup swallows the click.
  const components = React.useMemo(
    () => ({
      MonthCaption,
      Weekdays,
      DayButton: ({
        day,
        modifiers: _dayModifiers,
        ...buttonProps
      }: DayButtonProps) => (
        <button type="button" {...buttonProps}>
          {renderDay?.(day.date)}
        </button>
      ),
    }),
    [renderDay],
  );

  const formatters = React.useMemo(
    () => ({
      formatWeekdayName: (weekday: Date): string =>
        localeUtils.formatWeekdayShort(weekday.getDay(), intl.locale),
    }),
    [localeUtils, intl.locale],
  );

  const labels = React.useMemo(
    () => ({
      labelDayButton: (date: Date): string =>
        localeUtils.formatDay(date, undefined, intl.locale),
      labelWeekday: (date: Date): string =>
        localeUtils.formatWeekdayLong(date.getDay(), intl.locale),
    }),
    [localeUtils, intl.locale],
  );

  return (
    <>
      {renderNavbar ? (
        renderNavbar(props)
      ) : (
        <Navbar
          title={
            <>
              <S.Link
                data-testid="datapicker-nav-title-monthpicker-link"
                onClick={onMonthNameClick}
              >
                {fnsFormat(month, 'MMM', intl.locale)}
              </S.Link>
              {'  '}
              <S.Link
                data-testid="datapicker-nav-title-yearpicker-link"
                onClick={onYearNameClick}
              >
                {fnsFormat(month, 'yyyy', intl.locale)}
              </S.Link>
            </>
          }
          onLongPrev={
            hideLongPrev
              ? undefined
              : (): void =>
                  onMonthChange && onMonthChange(fnsAddYears(month, -1))
          }
          onShortPrev={
            hideShortPrev
              ? undefined
              : (): void =>
                  onMonthChange && onMonthChange(fnsAddMonths(month, -1))
          }
          onLongNext={
            hideLongNext
              ? undefined
              : (): void =>
                  onMonthChange && onMonthChange(fnsAddYears(month, 1))
          }
          onShortNext={
            hideShortNext
              ? undefined
              : (): void =>
                  onMonthChange && onMonthChange(fnsAddMonths(month, 1))
          }
          key="head"
        />
      )}
      <DayPicker
        key="body"
        month={month}
        onMonthChange={onMonthChange}
        weekStartsOn={firstDayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6}
        lang={intl.locale}
        hideNavigation
        disableNavigation={canChangeMonth === false}
        disabled={disabledDays as Matcher | undefined}
        modifiers={{ ...modifiers, selected: toMatchers(selectedDays) }}
        classNames={CLASS_NAMES}
        modifiersClassNames={MODIFIER_CLASS_NAMES}
        components={components}
        formatters={formatters}
        labels={labels}
        // v10 renders the day button — and therefore the day's content — only when it considers
        // the calendar interactive, which it decides from the presence of `onDayClick`.
        onDayClick={onDayClick ?? NOOP}
        {...rest}
      />
    </>
  );
};
export default injectIntl(Picker);
