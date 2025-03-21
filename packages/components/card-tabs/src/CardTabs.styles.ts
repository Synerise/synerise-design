import styled from 'styled-components';
import { ButtonStyles } from '@synerise/ds-button';

export const CardTabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  min-width: 588px;

  .ds-card-tags-sortable {
    gap: 16px 12px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .sortable-chosen {
    cursor: grabbing;
    box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.1);
    opacity: 1;
  }

  .sortable-drag {
    opacity: 1 !important;
  }
  .sortable-card-ghost-element {
    border: dashed 1px ${(props): string => props.theme.palette['blue-300']};
    background-color: ${(props): string => props.theme.palette['blue-050']};
    opacity: 1;
    cursor: grabbing;
    * {
      visibility: hidden;
    }
  }
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
