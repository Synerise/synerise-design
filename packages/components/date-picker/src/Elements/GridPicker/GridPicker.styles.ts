import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 12px;
  padding: 0 8px;
  .cell {
    height: 32px;
    margin: auto 8px;
    cursor: pointer;
    position: relative;
    vertical-align: middle;
    text-align: center;

    > div {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 16px;

      &:hover {
        /* ⚑ Shift: cell hover bg grey-050 → day-hover-bg (grey-100). */
        background-color: var(--ds-calendar-day-hover-bg);
        color: var(--ds-calendar-day-hover-text);
      }
    }

    &--selected {
      font-weight: 500;
    }

    &--outside {
      color: var(--ds-calendar-day-pastfuture-text);
    }

    &--disabled {
      cursor: default;
      color: var(--ds-calendar-day-disabled-text);
    }
  }

  .cell--selected:not(.cell--disabled):not(.cell--outside) {
    > div {
      background-color: var(--ds-calendar-day-hover-text);
      color: var(--ds-calendar-day-selected-text);

      &:hover {
        background-color: var(--ds-calendar-day-hover-text);
      }
    }
  }
`;
export const CellContainer = styled.div``;
