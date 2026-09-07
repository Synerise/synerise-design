import { DayPicker as DayPickerBase } from 'react-day-picker';
import styled from 'styled-components';

const DaySelectorPrefix = `.DayPicker-Day`;
const daySelector = (modifier: string): string =>
  `${DaySelectorPrefix}--${modifier}`;

/**
 * react-day-picker v10 renders a real `<button>` inside every day cell, where v7 put the day
 * layers directly in the cell. The class names below are remapped back onto v7's names in
 * `DayPicker.tsx`, so the modifier rules are untouched; only the layers moved one level deeper.
 */
const DayButton = `.DayPicker-Day-Button`;

/**
 * All four day layers at once — `DayBackground`, `DayText`, `DayForeground`, `DayTooltip`.
 *
 * The button is matched with `*` rather than with `${DayButton}` on purpose. These rules are
 * written to be overridden by the per-layer ones below (`${DayText}`, `${DayBackground}`), which
 * under v7 they were: `& > div` scored one class lower than `& > ${DayText}`. Naming the button's
 * class here adds that class back and flips the order, so `margin-left/right: 0` from the
 * `--selected` and `--entered` blocks starts winning over the `margin: 4px` that keeps a start or
 * end day 32px wide — the day stretches to the full 40px cell and its 50% radius draws an ellipse.
 */
const dayLayers = `& > * > div`;

/**
 * The one kind of day that interrupts the range band: an outside day paints nothing at all, so the
 * band has to be capped against it exactly as it is at a week edge. A disabled day does not
 * interrupt anything — it keeps the band, in grey (see rangeCovered below).
 */
const rangeBreak = daySelector('outside');
/** A day the range paints a band on — every covered day except the outside ones. */
const rangeDay = (modifier: string): string =>
  `${daySelector(modifier)}:not(${daySelector('outside')})`;
/**
 * A disabled day the range covers. It keeps the band so the range still reads as one continuous
 * span, but in grey rather than blue: the range passes over the day, it does not include it.
 * Without this a covered disabled day was pixel-identical to one outside the range entirely.
 */
const rangeCovered = (modifier: string): string =>
  `${daySelector(modifier) + daySelector('disabled')}:not(${daySelector('outside')})`;

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
  position: relative;

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

  .DayPicker-Body {
    display: table-row-group;
  }

  .DayPicker-Week {
    display: table-row;
  }

  ${DaySelectorPrefix} {
    width: 40px;
    height: 40px;
    display: table-cell;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;

    ${DayButton} {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 0;
      border: 0;
      background: none;
      font: inherit;
      color: inherit;
      cursor: inherit;
    }

    ${dayLayers} {
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
    

    /**
     * Resting state. An in-month day that is not part of a range still carries a light chip, which
     * is what gives the grid its rhythm. DayBackground is already the 32px square the range pill
     * paints on, so rounding it here draws the circle without a fifth layer, and a --today day
     * keeps its yellow look because DayText paints over the same 32px on top of it.
     *
     * The :not()s make this mutually exclusive with every range rule below rather than leaving it
     * to the cascade — a day is either resting or in a range, never both. --initial-entered is the
     * anchor between the two clicks, which has its own rule clearing DayBackground; excluding it
     * here keeps that rule the only thing deciding how the anchor is painted.
     */
    &:not(${daySelector('selected')}):not(${daySelector('entered')}):not(${daySelector('outside')}):not(${daySelector('disabled')}):not(${daySelector('initial-entered')}) {
      & ${DayBackground} {
        background-color: ${(props): string => props.theme.palette['grey-100']};
        border-radius: 50%;
      }
    }

    &--start ${DayBackground} {
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
    }

    &--end ${DayBackground} {
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
    }

    &--today {
      font-weight: 500;
    }
    
    
    &--today${daySelector('selected')} {
      & ${DayText} {
          font-weight: 400;
      }
    }
    /**
     * Outside and disabled days never carry the range pill — not in the committed selection, where
     * every --selected background rule excludes both, and not in the hover preview either, which is
     * why every --entered rule that paints DayBackground repeats the same two :not()s.
     *
     * --disabled matters twice over: the rule that stretches the layer across the full cell (so
     * neighbouring days join into one pill) already skips disabled days, so painting one without
     * that stretch left a detached 32px island where the range should read as skipping the day.
     */
    &--entered${daySelector('entered-start')}:not(${daySelector('entered-end')}):not(${daySelector('outside')}):not(${daySelector('disabled')}){

      & ${DayForeground} {
        border-color: ${(props): string => props.theme.palette['blue-300']};
        margin-right: 0;
        margin-left: 4px;
      }

      & ${DayBackground} {
        margin-right: 0;
        background-color: ${(props): string => props.theme.palette['blue-100']};
      }
    }
    
    
    &--entered${daySelector('entered-end')}:not(${daySelector('entered-start')}):not(${daySelector('outside')}):not(${daySelector('disabled')}){

      & ${DayForeground} {
        border-color: ${(props): string => props.theme.palette['blue-300']};
        margin-right: 4px;
        margin-left: 4px;
      }
      & ${DayBackground} {
        margin-right: 4px;
        background-color: ${(props): string => props.theme.palette['blue-100']};
      }
    }
    
    &--entered:not(${daySelector('entered-start')}):not(${daySelector('entered-end')}):not(${daySelector('outside')}):not(${daySelector('disabled')}){
      & ${DayBackground} {
        background-color: ${(props): string => props.theme.palette['blue-100']};
      }
    }
    &--today${daySelector('entered-start') + daySelector('entered-end')}:not(${daySelector('selected')}):not(${daySelector('outside')}):not(${daySelector('disabled')}) {
      & ${DayBackground} {
        background-color: ${(props): string => props.theme.palette['grey-050']};
      }
    }
    &--today${daySelector('entered')}:not(${daySelector('selected')}):not(${daySelector('outside')}):not(${daySelector('disabled')}) {
      & ${DayText} {
        background-color: transparent;
        font-weight: 400;
        color: ${(props): string => props.theme.palette['blue-600']};
      }
      & ${DayBackground} {
        background-color: ${(props): string => props.theme.palette['blue-100']};
      }
      & ${DayForeground} {
        border: 2px solid transparent;
      }
    }

    &--today:not(${daySelector('selected')}) {
      & ${DayText} {
        background-color: ${(props): string => props.theme.palette['yellow-100']};
        color: ${(props): string => props.theme.palette['yellow-600']};
      }

      & ${DayForeground} {
        border: 2px solid ${(props): string => props.theme.palette['yellow-600']};
      }
    }

    &--entered:not(${daySelector('outside')}):not(${daySelector('disabled')}) ${DayBackground} {
      background-color: ${(props): string => props.theme.palette['grey-050']};
    }

    &--entered ${DayText} {
      color: ${(props): string => props.theme.palette['blue-600']};
    }

    &--entered-start:not(${daySelector('selected')}) ${DayBackground} {
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
    }

    &--entered-end:not(${daySelector('selected')}) ${DayBackground} {
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
    }

    &--outside {
      & ${DayText} {
        color: ${(props): string => props.theme.palette['grey-400']};
      }
    }

    /**
     * A previous- or next-month day that falls inside the range reads as part of it rather than as
     * filler, so it takes the in-range text colour — in the hover preview as well as the committed
     * selection, so the colour does not flip on the second click. Only the text changes: outside
     * days keep their pill-less background, which is what separates them from the current month.
     */
    &--outside${daySelector('selected')}:not(${daySelector('disabled')}),
    &--outside${daySelector('entered')}:not(${daySelector('disabled')}) {
      & ${DayText} {
        color: ${(props): string => props.theme.palette['blue-600']};
      }
    }

    &--disabled {
      cursor: default;

      & ${DayText} {
        color: ${(props): string => props.theme.palette['grey-400']};
      }
    }
  }

${daySelector('selected')}:not(${daySelector('outside')}):not(${daySelector('end')}):not(${daySelector('start')}),
${daySelector('entered')}:not(${daySelector('outside')}):not(${daySelector('end')}):not(${daySelector('start')}){
    &:last-child  ${DayBackground} {
            border-top-right-radius: 50%;
            border-bottom-right-radius: 50%;
            margin-right: 4px;
            padding-right:0;
      }
      &:first-child  ${DayBackground} {
            border-top-left-radius: 50%;
            border-bottom-left-radius: 50%;
            margin-left: 4px;
            padding-left:0;
      }
    }

  /**
   * The same caps, but where the break is a disabled or outside day rather than the week edge.
   * Without them the pill stops square against an empty cell and reads as clipped, instead of as
   * the range stepping over a day it cannot include. The right-hand cap needs :has() to look at the
   * following cell; the DS already leans on it in ButtonGroup for this same edge-of-a-run problem.
   *
   * The leading & on the first rule is load-bearing: stylis concatenates a selector that starts
   * with a pseudo-class straight onto the component class (.sc-x:is(...)), which would demand that
   * the picker root itself be a disabled day. The & forces the descendant combinator.
   */
  & ${rangeBreak} + ${rangeDay('selected')},
  & ${rangeBreak} + ${rangeDay('entered')} {
    & ${DayBackground} {
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
      margin-left: 4px;
      padding-left: 0;
    }
  }

  ${rangeDay('selected')}:has(+ ${rangeBreak}),
  ${rangeDay('entered')}:has(+ ${rangeBreak}) {
    & ${DayBackground} {
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
      margin-right: 4px;
      padding-right: 0;
    }
  }

  /**
   * A disabled day under the range: grey band, muted text. The band is stretched across the whole
   * cell like any other covered day so it butts up against the blue segments either side with no
   * seam — the range reads as continuous and the grey says the day itself is not selectable.
   */
  ${rangeCovered('selected')},
  ${rangeCovered('entered')} {
    ${dayLayers} {
      padding-left: 4px;
      margin-left: 0;
      padding-right: 4px;
      margin-right: 0;
    }

    & ${DayBackground} {
      background-color: ${(props): string => props.theme.palette['grey-100']};
    }

    & ${DayText} {
      color: ${(props): string => props.theme.palette['grey-400']};
    }
  }

  ${daySelector('selected')}:not(${daySelector('disabled')}):not(${daySelector('outside')}) {
    ${dayLayers} {
      padding-left: 4px;
      margin-left: 0;
      padding-right: 4px;
      margin-right: 0;
    }

    & ${DayBackground} {
      background-color: ${(props): string => props.theme.palette['blue-100']};
    }

    & ${DayText} {
      color: ${(props): string => props.theme.palette['blue-600']};
    }

    &${daySelector('ghost')} {
      & ${DayBackground} {
        background-color: ${(props): string => props.theme.palette['blue-600']};
      }

      & ${DayText} {
        color: inherit;
      }
    }
  }
    ${daySelector('entered')}:not(${daySelector('disabled')}):not(${daySelector('entered-start')}) {
    ${dayLayers} {
      padding-left: 4px;
      margin-left: 0;
      padding-right: 4px;
      margin-right: 0;
      text-align:center;
    }

    && ${DayBackground} {
      background-color: ${(props): string => props.theme.palette['grey-050']};
    }

    && ${DayText} {
      color: ${(props): string => props.theme.palette['blue-600']};
    }

    &${daySelector('ghost')} {
      && ${DayBackground} {
        background-color: ${(props): string => props.theme.palette['blue-600']};
      }

      && ${DayText} {
        color: inherit;
      }
    }
  }
 
  ${daySelector('start')}:not(${daySelector('disabled')}):not(${daySelector('outside')}) {
    & ${DayText} {
      border-radius: 50%;
      font-weight:500;
      color: ${(props): string => props.theme.palette.white};
      background-color: ${(props): string => props.theme.palette['blue-600']};
      margin-right: 4px;
      padding-left: 0px;
      padding-right: 0px;
    }
    & ${DayBackground} {
      background-color: ${(props): string => props.theme.palette['blue-100']};
    }
    ${dayLayers} {
      padding-left: 0px;
      margin-left: 4px;
    }
  }
  ${daySelector('start')}:not(${daySelector('disabled')}):not(${daySelector('outside')}):last-child,
   ${daySelector('end')}:not(${daySelector('disabled')}):not(${daySelector('outside')}):first-child {
      ${dayLayers} {
         margin-right: 4px;
      
      }
      & ${DayBackground} {
          background-color: ${(props): string => props.theme.palette.white};
      }
  }
  
  ${daySelector('end')}:not(${daySelector('disabled')}):not(${daySelector('outside')}) {
    & ${DayText} {
      border-radius: 50%;
            font-weight:500;

      background-color: ${(props): string => props.theme.palette['blue-600']};
      color: ${(props): string => props.theme.palette.white};
      margin-left: 4px;
      padding-left: 4px;
    }
    ${dayLayers} {
      padding-right: 4px;
      margin-right: 4px;
    }
  }
  ${daySelector('end') + daySelector('start')}:not(${daySelector('disabled')}):not(${daySelector('outside')}) {
    ${dayLayers} {
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
      & ${DayBackground} {
        background: transparent;
      }
  }
  ${daySelector('outside') + daySelector('entered') + daySelector('selected')} {
    & ${DayBackground}  {
      border-radius: 50%;
    }
  }
  &.relative {
      ${daySelector('start') + daySelector('selected')}:not(${daySelector('disabled')}):not(${daySelector('outside')}) {
      & ${DayText} {
        font-weight: 500;
      }
    ${daySelector('selected')}:not(${daySelector('disabled')}):not(${daySelector('outside')}) {
      & ${DayBackground} {
        background-color: ${(props): string => props.theme.palette['blue-100']};
      }

      & ${DayText} {
      color: ${(props): string => props.theme.palette['blue-600']};
      }
    }
  }
`;
