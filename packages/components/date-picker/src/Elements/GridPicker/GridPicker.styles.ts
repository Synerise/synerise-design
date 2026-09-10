import styled from 'styled-components';

export const CellContainer = styled.div``;

/**
 * The month, year and decade grids: three columns of chips, laid out on the same 24px inset and
 * 8px column gap the day grid uses, with the rows spread over whatever height the host gives the
 * grid (304px in `DatePicker`, 290px in `DateRangePicker`'s side).
 *
 * Every cell carries a resting chip, so an empty trailing slot — the year grid holds ten years in
 * a twelve-slot grid — is simply an absent cell rather than a blank chip.
 */
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: 32px;
  align-content: space-between;
  column-gap: 8px;
  padding: 24px;
  font-size: 13px;
  line-height: 18px;

  .cell {
    cursor: pointer;

    > div {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 60px;
      background-color: ${(props): string => props.theme.palette['grey-100']};
      color: ${(props): string => props.theme.palette['grey-800']};

      &:hover {
        background-color: ${(props): string => props.theme.palette['grey-200']};
        color: ${(props): string => props.theme.palette['blue-600']};
      }
    }

    /**
     * A disabled cell drops the chip rather than greying its label on one: the chip is what marks
     * a cell as reachable, which is also why the day grid paints it on every day except the
     * disabled and outside ones. The decade grid's two out-of-century cells keep theirs — they
     * still navigate.
     */
    &--disabled {
      cursor: default;

      > div,
      > div:hover {
        background-color: transparent;
        color: ${(props): string => props.theme.palette['grey-400']};
      }
    }
  }

  .cell--selected:not(.cell--disabled) {
    > div,
    > div:hover {
      background-color: ${(props): string => props.theme.palette['blue-600']};
      color: ${(props): string => props.theme.palette.white};
    }
  }
`;
