import styled from 'styled-components';
import Button from '@synerise/ds-button';

export const CardTabsContainer = styled.div`
  margin-bottom: 8px;
`;

export const ItemWrapper = styled.div`
  display: inline-block;
  padding: 0 8px 8px 0;
`;

export const AddButton = styled(Button)`
  && {
    width: 48px;
    height: 48px;
    background-color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: top;
    padding: 0;
    margin: 0 8px 8px 0;
  }
`;
