import styled from 'styled-components';

export const Container = styled.div`
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
        background-color: ${props => props.theme.variable('@primary-color-lighter-6')};
      }
    }

    &--selected {
      font-weight: 500;
    }

    &--outside {
      color: ${props => props.theme.variable('@gray-color-lighter-5')};
    }

    &--disabled {
      cursor: default;
      color: ${props => props.theme.variable('@gray-color-lighter-5')};
    }
  }

  .cell--selected:not(.cell--disabled):not(.cell--outside) {
    > div {
      background-color: ${props => props.theme.variable('@primary-color')};
      color: white;

      &:hover {
        background-color: ${props => props.theme.variable('@primary-color-lighter-1')};
      }
    }
  }
`;
