import styled from 'styled-components';
import { CardTabContainer } from './CardTab/CardTab.styles';

// eslint-disable-next-line import/prefer-default-export
export const CardTabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  algin-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  ${CardTabContainer} {
    margin-right: 12px;
  }
  .ds-card-tags-sortable {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .sortable-chosen {
    cursor: grabbing;
    background-color: ${(props): string => props.theme.palette.white};
    opacity: 1;
  }

  .sortable-drag {
    opacity: 1 !important;
    box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.1);
  }
  .sortable-card-ghost-element {
    background-color: ${(props): string => props.theme.palette['blue-300']};
    &:hover {
      background-color: ${(props): string => props.theme.palette['blue-050']};
    }
    opacity: 1;
    cursor: grabbing;
    * {
      visibility: hidden;
    }
  }
`;
