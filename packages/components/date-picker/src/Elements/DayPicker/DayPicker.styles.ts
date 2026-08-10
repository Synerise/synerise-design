import DayPickerBase from 'react-day-picker';
import styled from 'styled-components';

const DaySelectorPrefix = `.DayPicker-Day`;
const daySelector = (modifier: string): string =>
  `${DaySelectorPrefix}--${modifier}`;

export const DayBackground = styled.div``;
export const DayForeground = styled.div`
  border-radius: 50%;
`;
export const DayText = styled.div`
  color: var(--ds-calendar-day-default-text);
  border-radius: 50%;
`;

export const DayTooltip = styled.div`
  display: none;
`;
export const DayPicker = styled(DayPickerBase)`
  display: inline-block;
  font-size: 12px;
  .DayPicker-wrapper {
    position: relative;
    flex-direction: row;
  }

  .DayPicker-Months {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .DayPicker-Month {
    display: table;
    margin: 8px;
    border-spacing: 0;
    border-collapse: collapse;
  }

  .DayPicker-Weekdays {
    display: table-header-group;
  }

  .DayPicker-WeekdaysRow {
    display: table-row;
  }

  .DayPicker-Weekday {
    min-width: 39px;
    height: 32px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    font-weight: 500;
    color: var(--ds-calendar-headers-text);
  }

  .DayPicker-Weekday abbr[title] {
    border-bottom: none;
    text-decoration: none;
  }

  .DayPicker-Body {
    display: table-row-group;
  }

  .DayPicker-Week {
    display: table-row;
  }

  .DayPicker--interactionDisabled ${DaySelectorPrefix} {
    cursor: default;
  }

  ${DaySelectorPrefix} {
    width: 40px;
    height: 40px;
    display: table-cell;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;

    > div {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 4px;
      min-width: 32px;
    }

    &--start > ${DayBackground} {
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
    }

    &--end > ${DayBackground} {
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
    }

    &--today {
      font-weight: 500;
    }

    &--today${daySelector('selected')} {
      & > ${DayText} {
        font-weight: 400;
      }
    }
    &--entered${daySelector('entered-start')}:not(${daySelector(
        'entered-end',
      )}) {
      & > ${DayForeground} {
        margin-right: 0;
        margin-left: 4px;
      }

      & > ${DayBackground} {
        margin-right: 0;
        background-color: var(--ds-calendar-day-range-bg);
      }
    }

    &--entered${daySelector('entered-end')}:not(${daySelector(
        'entered-start',
      )}) {
      & > ${DayForeground} {
        margin-right: 4px;
        margin-left: 4px;
      }
      & > ${DayBackground} {
        margin-right: 4px;
        background-color: var(--ds-calendar-day-range-bg);
      }
    }

    &--entered:not(${daySelector('entered-start')}):not(
        ${daySelector('entered-end')}
      ) {
      & > ${DayBackground} {
        background-color: var(--ds-calendar-day-range-bg);
      }
    }
    &--today${daySelector('entered-start') +
      daySelector('entered-end')}:not(${daySelector('selected')}) {
      & > ${DayBackground} {
        background-color: var(--ds-calendar-day-range-bg);
      }
    }
    &--today${daySelector('entered')}:not(${daySelector('selected')}) {
      & > ${DayText} {
        background-color: transparent;
        font-weight: 400;
        color: var(--ds-calendar-day-range-text);
      }
      & > ${DayBackground} {
        background-color: var(--ds-calendar-day-range-bg);
      }
      & > ${DayForeground} {
        border: 2px solid transparent;
      }
    }

    &--today:not(${daySelector('selected')}) {
      & > ${DayText} {
        background-color: var(--ds-calendar-day-today-bg);
        /* ⚑ Shift: today text yellow-600 → day-today-text (yellow-700, muted). */
        color: var(--ds-calendar-day-today-text);
      }

      & > ${DayForeground} {
        border: 2px solid var(--ds-calendar-day-today-border);
      }
    }

    &--entered > ${DayBackground} {
      background-color: var(--ds-calendar-day-range-bg);
    }

    &--entered > ${DayText} {
      color: var(--ds-calendar-day-range-text);
    }

    &--entered-start:not(${daySelector('selected')}) > ${DayBackground} {
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
    }

    &--entered-end:not(${daySelector('selected')}) > ${DayBackground} {
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
    }

    &--outside {
      & > ${DayText} {
        /* Adjacent-month days stay readable (grey-800), not faded — still selectable. */
        color: var(--ds-color-text-base-default);
      }
    }

    &--disabled {
      cursor: default;

      & > ${DayText} {
        color: var(--ds-calendar-day-disabled-text);
      }
    }
  }

  /* Resting in-month day gets the grey-100 pill; hover darkens it to grey-200 and turns
     the number brand-blue. Scoped out of every special state so it never bleeds into
     range/selected/today/outside/disabled. */

  ${DaySelectorPrefix}:not(${daySelector('selected')}):not(${daySelector(
    'entered',
  )}):not(${daySelector('start')}):not(${daySelector('end')}):not(${daySelector(
    'today',
  )}):not(${daySelector('outside')}):not(${daySelector('disabled')}) {
    & > ${DayText} {
      background-color: var(--ds-calendar-day-default-bg);
    }

    &:hover > ${DayText} {
      color: var(--ds-calendar-day-hover-text);
      /* grey-200 (base-mutedhover); --ds-calendar-day-hover-bg resolves to grey-100
         today (same as resting) → re-point upstream. */
      background-color: var(--ds-color-background-base-mutedhover);
    }
  }

  ${daySelector('selected')}:not(${daySelector('disabled')}):not(${daySelector(
    'end',
  )}):not(${daySelector('start')}),
${daySelector('entered')}:not(${daySelector('disabled')}):not(${daySelector(
    'end',
  )}):not(${daySelector('start')}) {
    &:last-child > ${DayBackground} {
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
      margin-right: 4px;
      padding-right: 0;
    }
    &:first-child > ${DayBackground} {
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
      margin-left: 4px;
      padding-left: 0;
    }
  }

  ${daySelector('selected')}:not(${daySelector('disabled')}):not(${daySelector(
    'outside',
  )}) {
    & > div {
      padding-left: 4px;
      margin-left: 0;
      padding-right: 4px;
      margin-right: 0;
    }

    & > ${DayBackground} {
      background-color: var(--ds-calendar-day-range-bg);
    }

    & > ${DayText} {
      color: var(--ds-calendar-day-range-text);
    }

    &${daySelector('ghost')} {
      & > ${DayBackground} {
        background-color: var(--ds-calendar-day-range-text);
      }

      & > ${DayText} {
        color: inherit;
      }
    }
  }
  ${daySelector('entered')}:not(${daySelector('disabled')}):not(${daySelector(
    'entered-start',
  )}) {
    & > div {
      padding-left: 4px;
      margin-left: 0;
      padding-right: 4px;
      margin-right: 0;
      text-align: center;
    }

    && > ${DayBackground} {
      background-color: var(--ds-calendar-day-range-bg);
    }

    && > ${DayText} {
      color: var(--ds-calendar-day-range-text);
    }

    &${daySelector('ghost')} {
      && > ${DayBackground} {
        background-color: var(--ds-calendar-day-range-text);
      }

      && > ${DayText} {
        color: inherit;
      }
    }
  }

  ${daySelector('start')}:not(${daySelector('disabled')}):not(${daySelector(
    'outside',
  )}) {
    & > ${DayText} {
      border-radius: 50%;
      font-weight: 500;
      color: var(--ds-calendar-day-selected-text);
      background-color: var(--ds-calendar-day-selected-bg);
      margin-right: 4px;
      padding-left: 0px;
      padding-right: 0px;
    }
    & > ${DayBackground} {
      background-color: var(--ds-calendar-day-range-bg);
    }
    & > div {
      padding-left: 0px;
      margin-left: 4px;
    }
  }
  ${daySelector('start')}:not(${daySelector('disabled')}):not(${daySelector(
    'outside',
  )}):last-child,
   ${daySelector('end')}:not(${daySelector('disabled')}):not(${daySelector(
    'outside',
  )}):first-child {
    & > div {
      margin-right: 4px;
    }
    & > ${DayBackground} {
      background-color: var(--ds-color-background-base-default);
    }
  }

  ${daySelector('end')}:not(${daySelector('disabled')}):not(${daySelector(
    'outside',
  )}) {
    & > ${DayText} {
      border-radius: 50%;
      font-weight: 500;

      background-color: var(--ds-calendar-day-selected-bg);
      color: var(--ds-calendar-day-selected-text);
      margin-left: 4px;
      padding-left: 4px;
    }
    /* During a past-direction preview the endpoint is --end but NOT --selected, so it
       misses --selected's margin:0 and falls back to the base margin:4px, leaving a gap
       before it. Extend the range-bg connector left (margin-left:0) to rejoin the range.
       Single-day (start === end) re-caps the left below so this doesn't leak a tail. */
    & > ${DayBackground} {
      background-color: var(--ds-calendar-day-range-bg);
      margin-left: 0;
    }
    & > div {
      padding-right: 4px;
      margin-right: 4px;
    }
  }
  ${daySelector('end') + daySelector('start')}:not(${daySelector(
    'disabled',
  )}):not(${daySelector('outside')}) {
    & > div {
      padding-right: 4px;
    }
    /* Single-day selection (start === end): re-cap the left so --end's margin-left:0
       connector doesn't leak a range-bg tail past the circle. */
    & > ${DayBackground} {
      margin-left: 4px;
    }
  }

  ${daySelector('selected')}:not(${daySelector('disabled')}):hover {
    position: relative;
    ${DayTooltip} {
      height: 24px;
      position: absolute;
      top: -30px;
      margin-left: calc(-50% + 16px);
      display: block;
      white-space: nowrap;
      background-color: var(--ds-color-background-overlay-solid);
      padding: 3px 8px;
      border-radius: 3px;
      z-index: 9;
      font-weight: 400;
      color: var(--ds-color-text-onsolid-default);
    }
  }
  ${daySelector('initial')}:not(${daySelector('disabled')}):not(${daySelector(
    'entered',
  )}),
  ${daySelector('initial-entered')}:not(${daySelector('disabled')}) {
    & > ${DayBackground} {
      background: transparent;
    }
  }
  ${daySelector('outside') + daySelector('entered') + daySelector('selected')} {
    & > ${DayBackground} {
      border-radius: 50%;
    }
  }
  &.relative {
    ${daySelector('start') + daySelector('selected')}:not(${daySelector(
      'disabled',
    )}):not(${daySelector('outside')}) {
      & > ${DayText} {
        font-weight: 500;
      }
      ${daySelector('selected')}:not(${daySelector(
        'disabled',
      )}):not(${daySelector('outside')}) {
        & > ${DayBackground} {
          background-color: var(--ds-calendar-day-range-bg);
        }

        & > ${DayText} {
          color: var(--ds-calendar-day-range-text);
        }
      }
    }
  }

  /* Adjacent-month (outside) days never take a pill/range fill — only the number's
     colour reacts: grey-800 normally, brand-blue when inside a range. */
  ${daySelector('outside')} {
    &&& > ${DayBackground} {
      background: transparent;
    }
  }
  ${daySelector('outside')}${daySelector('selected')} {
    & > ${DayText} {
      color: var(--ds-calendar-day-range-text);
      background: transparent;
    }
  }
  ${daySelector('outside')}${daySelector('entered')} {
    & > ${DayText} {
      color: var(--ds-calendar-day-range-text);
      background: transparent;
    }
  }
`;
