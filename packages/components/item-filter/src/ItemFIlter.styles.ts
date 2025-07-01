import styled from 'styled-components';

import { ItemContainer } from '@synerise/ds-manageable-list/dist/Item/ContentItem/ContentItem.styles';

export const FiltersList = styled.div`
  height: 100%;
  ${ItemContainer} {
    max-height: 48px;
    box-shadow: none;
    background: ${(props): string => props.theme.palette['grey-050']};
  }
  .ds-result {
    margin-top: 24px;
  }
`;

export const ItemFilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
`;
