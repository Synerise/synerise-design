import styled from 'styled-components';
import { ButtonStyles } from '@synerise/ds-button';

export const CardTabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  min-width: 588px;
  gap: 16px 12px;
  flex-wrap: wrap;
  padding-bottom: 16px;

  @media (max-width: 588px) {
    .ds-button-creator {
      width: 48px !important;
      ${ButtonStyles.Creator.CreatorLabel} {
        display: none;
      }
    }
  }
`;

export const CardTabsAddButton = styled.span`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
`;
