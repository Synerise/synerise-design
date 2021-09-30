import styled from 'styled-components';
import { Body, Footer } from '@synerise/ds-step-card/dist/StepCard.styles';

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: auto;
`;

export const LogicWrapper = styled.div`
  margin-top: 24px;
`;

export const ExpressionWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &.sortable-chosen {
    cursor: grabbing;
    width: 100%;
    opacity: 1 !important;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    box-shadow: 0 16px 32px 0 #23293619;
    ${Body} {
      display: none;
    }
    ${Footer} {
      display: none;
    }
    ${LogicWrapper} {
      display: none;
    }
  }
  &.ghost-element {
    cursor: grabbing;
    width: 100%;
    background-color: ${(props): string => props.theme.palette['blue-050']};
    border: 1px dashed ${(props): string => props.theme.palette['blue-300']};
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-bottom: 24px;
    height: 70px;
    box-shadow: none;
    position: relative;
    &:before {
      content: attr(data-dropLabel);
      text-align: center;
      position: relative;
      color: ${(props): string => props.theme.palette['blue-600']};
    }
    * {
      display: none;
    }
  }
`;

export const AddButtonWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 24px 0 0;
  width: 100%;
`;
