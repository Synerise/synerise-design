import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const SelectFilterItem = styled.div`
  margin-right: 12px;
  cursor: pointer;

  .selected-item-icon {
    position: relative;
    svg {
      position: relative;
    }
    &::before {
      display: flex;
      content: '';
      border-radius: 50%;
      background-color: ${(props): string => props.theme.palette['green-600']};
      width: 16px;
      height: 16px;
      position: absolute;
      z-index: 0;
      top: 4px;
      left: 4px;
    }
  }
`;
