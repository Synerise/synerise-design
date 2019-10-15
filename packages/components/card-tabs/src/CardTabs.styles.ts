import styled from 'styled-components';
import { CardTabContainer } from './CardTab/CardTab.styles';
import AddButton from './AddButton/AddButton';

// eslint-disable-next-line import/prefer-default-export
export const CardTabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  algin-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  ${CardTabContainer} {
    margin-right: 16px;
    margin-bottom: 24px;
  }
  .ds-card-tags-sortable {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
`;
