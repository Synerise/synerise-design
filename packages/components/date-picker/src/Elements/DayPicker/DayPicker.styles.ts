import styled from 'styled-components';
import DayPickerBase from 'react-day-picker';

export const DayBackground = styled.div``;
export const DayForeground = styled.div`
  border-radius: 50%;
`;
export const DayText = styled.div`
  color: ${(props): string => props.theme.palette['grey-700']};
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
      min-width:32px;
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
    
    
    &--today.DayPicker-Day--selected {
      & > ${DayText} {
          font-weight: 400;
      }
    }
      &--entered.DayPicker-Day--entered-start:not(.DayPicker-Day--entered-end){

      & > ${DayForeground} {
        border-color: ${(props): string => props.theme.palette['blue-300']};
        margin-right: 0;
        margin-left: 4px;
      }

      & > ${DayBackground} {
        margin-right: 0;
        background-color: ${(props): string => props.theme.palette['blue-100']};
      }
    }
    
    
    &--entered.DayPicker-Day--entered-end:not(.DayPicker-Day--entered-start){

      & > ${DayForeground} {
        border-color: ${(props): string => props.theme.palette['blue-300']};
        margin-right: 4px;
        margin-left: 4px;
      }
      & > ${DayBackground} {
        margin-right: 4px;
        background-color: ${(props): string => props.theme.palette['blue-100']};
      }
    }
    
    &--entered:not(.DayPicker-Day--entered-start):not(.DayPicker-Day--entered-end){
      & > ${DayBackground} {
        background-color: ${(props): string => props.theme.palette['blue-100']};
      }
    }
    &--today.DayPicker-Day--entered-start.DayPicker-Day--entered-end:not(.DayPicker-Day--selected) {
      & >  ${DayBackground} {
        background-color: ${(props): string => props.theme.palette['grey-050']};
      }
    }
    &--today.DayPicker-Day--entered:not(.DayPicker-Day--selected) {
      & > ${DayText} {
        background-color: transparent;
        font-weight: 400;
        color: ${(props): string => props.theme.palette['blue-600']};
      }
      & >  ${DayBackground} {
        background-color: ${(props): string => props.theme.palette['blue-100']};
      }
      & > ${DayForeground} {
        border: 2px solid transparent;
      }
    }

    &--today:not(.DayPicker-Day--selected) {
      & > ${DayText} {
        background-color: ${(props): string => props.theme.palette['yellow-100']};
        color: ${(props): string => props.theme.palette['yellow-600']};
      }

      & > ${DayForeground} {
        border: 2px solid ${(props): string => props.theme.palette['yellow-600']};
      }
    }

    &--entered > ${DayBackground} {
      background-color: ${(props): string => props.theme.palette['grey-050']};
    }

    &--entered > ${DayText} {
      color: ${(props): string => props.theme.palette['blue-600']};
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

.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--end):not(.DayPicker-Day--start),
.DayPicker-Day--entered:not(.DayPicker-Day--disabled):not(.DayPicker-Day--end):not(.DayPicker-Day--start){
    &:last-child  > ${DayBackground} {
            border-top-right-radius: 50%;
            border-bottom-right-radius: 50%;
            margin-right: 4px;
            padding-right:0;
      }
      &:first-child  > ${DayBackground} {
            border-top-left-radius: 50%;
            border-bottom-left-radius: 50%;
            margin-left: 4px;
            padding-left:0;
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
    .DayPicker-Day--entered:not(.DayPicker-Day--disabled):not(.DayPicker-Day--entered-start) {
    & > div {
      padding-left: 4px;
      margin-left: 0;
      padding-right: 4px;
      margin-right: 0;
      text-align:center;
    }

    && > ${DayBackground} {
      background-color: ${(props): string => props.theme.palette['grey-050']};
    }

    && > ${DayText} {
      color: ${(props): string => props.theme.palette['blue-600']};
    }

    &.DayPicker-Day--ghost {
      && > ${DayBackground} {
        background-color: ${(props): string => props.theme.palette['blue-600']};
      }

      && > ${DayText} {
        color: inherit;
      }
    }
  }
 
  .DayPicker-Day--start:not(.DayPicker-Day--disabled) {
    & > ${DayText} {
      border-radius: 50%;
      font-weight:500;
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
  .DayPicker-Day--start:not(.DayPicker-Day--disabled):last-child,
   .DayPicker-Day--end:not(.DayPicker-Day--disabled):first-child {
      & > div {
         margin-right: 4px;
      
      }
      & > ${DayBackground} {
          background-color: ${(props): string => props.theme.palette.white};
      }
  }
  
  .DayPicker-Day--end:not(.DayPicker-Day--disabled) {
    & > ${DayText} {
      border-radius: 50%;
            font-weight:500;

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
      position:relative;
      ${DayTooltip} {
      height: 24px;
        position: absolute;
        top: -30px;
        margin-left: calc(-50% + 16px);
        display:block;
        white-space: nowrap;
        background-color: rgba(56, 67, 80, 0.9);
        padding:3px 8px;
        border-radius: 3px;
        z-index: 9;
        font-weight: 400;
        color: ${(props): string => props.theme.palette.white};
      }
  }
  .DayPicker-Day--initial:not(.DayPicker-Day--disabled):not(.DayPicker-Day--entered),
  .DayPicker-Day--initial-entered:not(.DayPicker-Day--disabled) {
      & > ${DayBackground} {
        background: transparent;
      }
  }
  &.relative {
      .DayPicker-Day--start.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
      & > ${DayText} {
        font-weight: 500;
      }
    .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
      & > ${DayBackground} {
        background-color: ${(props): string => props.theme.palette['blue-100']};
      }

      & > ${DayText} {
      color: ${(props): string => props.theme.palette['blue-600']};
      }
    }
  }
`;
