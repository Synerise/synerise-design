import styled from 'styled-components';
import { ManageableListContainer } from '@synerise/ds-manageable-list/dist/ManageableList.styles';

export const FiltersList = styled.div`
  height: 100%;
  ${ManageableListContainer} {
    padding: 24px;
    height: 100%;
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
