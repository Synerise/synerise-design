import styled from 'styled-components';

export const ItemActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  span {
    margin: 0 0 0 8px;
  }
`;

export const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  li {
    width: 100%;
  }

  ${ItemActions} {
    display: none;
  }

  &:hover {
    ${ItemActions} {
      display: flex;
    }
    .ds-manageable-list-item-icon {
      svg {
        color: ${({ theme }): string => theme.palette['blue-600']};
        fill: ${({ theme }): string => theme.palette['blue-600']};
      }
    }
  }
`;

export const ItemLabel = styled.span`
  height: 24px;
  display: inline-flex;
  align-items: center;
`;
