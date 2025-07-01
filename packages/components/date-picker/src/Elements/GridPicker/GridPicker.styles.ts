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
        background-color: ${(props): string => props.theme.palette['grey-050']};
        color: ${(props): string => props.theme.palette['blue-600']};
      }
    }

    &--selected {
      font-weight: 500;
    }

    &--outside {
      color: ${(props): string => props.theme.palette['grey-400']};
    }

    &--disabled {
      cursor: default;
      color: ${(props): string => props.theme.palette['grey-400']};
    }
  }

  .cell--selected:not(.cell--disabled):not(.cell--outside) {
    > div {
      background-color: ${(props): string => props.theme.palette['blue-600']};
      color: ${(props): string => props.theme.palette.white};

      &:hover {
        background-color: ${(props): string => props.theme.palette['blue-600']};
      }
    }
  }
`;
export const CellContainer = styled.div``;
