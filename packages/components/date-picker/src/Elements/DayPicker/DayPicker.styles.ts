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
    
    
    &--today${daySelector('selected')} {
      & > ${DayText} {
          font-weight: 400;
      }
    }
      &--entered${daySelector('entered-start')}:not(${daySelector('entered-end')}){

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
    
    
    &--entered${daySelector('entered-end')}:not(${daySelector('entered-start')}){

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
    
    &--entered:not(${daySelector('entered-start')}):not(${daySelector('entered-end')}){
      & > ${DayBackground} {
        background-color: ${(props): string => props.theme.palette['blue-100']};
      }
    }
    &--today${daySelector('entered-start') + daySelector('entered-end')}:not(${daySelector('selected')}) {
      & >  ${DayBackground} {
        background-color: ${(props): string => props.theme.palette['grey-050']};
      }
    }
    &--today${daySelector('entered')}:not(${daySelector('selected')}) {
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

    &--today:not(${daySelector('selected')}) {
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

${daySelector('selected')}:not(${daySelector('disabled')}):not(${daySelector('end')}):not(${daySelector('start')}),
${daySelector('entered')}:not(${daySelector('disabled')}):not(${daySelector('end')}):not(${daySelector('start')}){
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

  ${daySelector('selected')}:not(${daySelector('disabled')}):not(${daySelector('outside')}) {
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

    &${daySelector('ghost')} {
      & > ${DayBackground} {
        background-color: ${(props): string => props.theme.palette['blue-600']};
      }

      & > ${DayText} {
        color: inherit;
      }
    }
  }
    ${daySelector('entered')}:not(${daySelector('disabled')}):not(${daySelector('entered-start')}) {
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

    &${daySelector('ghost')} {
      && > ${DayBackground} {
        background-color: ${(props): string => props.theme.palette['blue-600']};
      }

      && > ${DayText} {
        color: inherit;
      }
    }
  }
 
  ${daySelector('start')}:not(${daySelector('disabled')}):not(${daySelector('outside')}) {
    & > ${DayText} {
      border-radius: 50%;
      font-weight:500;
      color: ${(props): string => props.theme.palette.white};
      background-color: ${(props): string => props.theme.palette['blue-600']};
      margin-right: 4px;
      padding-left: 0px;
      padding-right: 0px;
    }
    & > ${DayBackground} {
      background-color: ${(props): string => props.theme.palette['blue-100']};
    }
    & > div {
      padding-left: 0px;
      margin-left: 4px;
    }
  }
  ${daySelector('start')}:not(${daySelector('disabled')}):not(${daySelector('outside')}):last-child,
   ${daySelector('end')}:not(${daySelector('disabled')}):not(${daySelector('outside')}):first-child {
      & > div {
         margin-right: 4px;
      
      }
      & > ${DayBackground} {
          background-color: ${(props): string => props.theme.palette.white};
      }
  }
  
  ${daySelector('end')}:not(${daySelector('disabled')}):not(${daySelector('outside')}) {
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
  ${daySelector('end') + daySelector('start')}:not(${daySelector('disabled')}):not(${daySelector('outside')}) {
    & > div {
      padding-right:4px;
    }
  }

  ${daySelector('selected')}:not(${daySelector('disabled')}):hover {
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
  ${daySelector('initial')}:not(${daySelector('disabled')}):not(${daySelector('entered')}),
  ${daySelector('initial-entered')}:not(${daySelector('disabled')}){
      & > ${DayBackground} {
        background: transparent;
      }
  }
  ${daySelector('outside') + daySelector('entered') + daySelector('selected')} {
    & > ${DayBackground}  {
      border-radius: 50%;
    }
  }
  &.relative {
      ${daySelector('start') + daySelector('selected')}:not(${daySelector('disabled')}):not(${daySelector('outside')}) {
      & > ${DayText} {
        font-weight: 500;
      }
    ${daySelector('selected')}:not(${daySelector('disabled')}):not(${daySelector('outside')}) {
      & > ${DayBackground} {
        background-color: ${(props): string => props.theme.palette['blue-100']};
      }

      & > ${DayText} {
      color: ${(props): string => props.theme.palette['blue-600']};
      }
    }
  }
`;
