import styled from 'styled-components';
import DayPickerBase from 'react-day-picker';

export const DayBackground = styled.div``;
export const DayForeground = styled.div``;
export const DayText = styled.div``;
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
    width: 32px;
    height: 32px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    font-weight: 500;
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

  .DayPicker--interactionDisabled .DayPicker-Day {
    cursor: default;
  }

  .DayPicker-Day {
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

    &--today:not(.DayPicker-Day--selected) {
      & > ${DayText} {
        border-radius: 50%;
        background-color: ${(props): string => props.theme.palette['yellow-100']};
        color: ${(props): string => props.theme.palette['yellow-600']};
      }

      & > ${DayForeground} {
        border-radius: 50%;
        border: 2px solid ${(props): string => props.theme.palette['yellow-600']};
      }
    }

    &--entered > ${DayBackground} {
      background-color: ${(props): string => props.theme.palette['grey-100']};
    }

    &--entered-start:not(.DayPicker-Day--selected) > ${DayBackground} {
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
    }

    &--entered-end:not(.DayPicker-Day--selected) > ${DayBackground} {
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
    }

    &--outside {
      & > ${DayText} {
        color: ${(props): string => props.theme.palette['grey-400']};
      }
    }

    &--disabled {
      cursor: default;

      & > ${DayText} {
        color: ${(props): string => props.theme.palette['grey-400']};
      }
    }
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled) {
    & > div {
      padding-left: 4px;
      margin-left: 0;
      padding-right: 4px;
      margin-right: 0;
    }

    & > ${DayBackground} {
      background-color: ${(props): string => props.theme.palette['blue-100']};
    }

    & > ${DayText} {
      color: ${(props): string => props.theme.palette['blue-600']};
    }

    &.DayPicker-Day--ghost {
      & > ${DayBackground} {
        background-color: ${(props): string => props.theme.palette['blue-600']};
      }

      & > ${DayText} {
        color: inherit;
      }
    }
  }
  .DayPicker-Day--start:not(.DayPicker-Day--disabled) {
    & > ${DayText} {
      border-radius: 50%;
      color: ${(props): string => props.theme.palette.white};
      background-color: ${(props): string => props.theme.palette['blue-600']};
      margin-right: 4px;
      padding-left: 4px;
    }
    & > ${DayBackground} {
      background-color: ${(props): string => props.theme.palette['blue-100']};
    }
    & > div {
      padding-left: 0px;
      margin-left: 4px;
    }
  }
  .DayPicker-Day--end:not(.DayPicker-Day--disabled) {
    & > ${DayText} {
      border-radius: 50%;
      background-color: ${(props): string => props.theme.palette['blue-600']};
      color: ${(props): string => props.theme.palette.white};
      margin-left: 4px;
      padding-left: 4px;
    }
    & > div {
      padding-right: 4px;
      margin-right: 4px;
    }
  }
  .DayPicker-Day--end.DayPicker-Day--start:not(.DayPicker-Day--disabled) {
    & > div {
      padding-right:4px;
    }
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):hover {
    
  }

  &.relative {
    .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
      & > ${DayBackground} {
        background-color: ${(props): string => props.theme.palette['blue-600']};
      }

      & > ${DayText} {
        color: inherit;
      }
    }
  }
`;
