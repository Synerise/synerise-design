import styled from 'styled-components';
import { Body, DragIcon, Footer } from '@synerise/ds-step-card/dist/StepCard.styles';

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
`;

export const MatchingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-content: flex-end;
  margin-bottom: 24px;
`;

export const ConditionsLimit = styled.div`
  margin-left: 16px;
`;

export const ConditionsLimitResults = styled.span`
  font-weight: 500;
`;

export const LogicWrapper = styled.div`
  margin: 22px 0;
`;

export const ExpressionWrapper = styled.div<{ index: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: ${(props): number => 1000 - props.index};
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
    ${DragIcon} {
      visibility: visible;
      opacity: 1;
    }
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
    border-left: 2px solid ${(props): string => props.theme.palette['blue-600']};
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-bottom: 24px;
    height: 68px;
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
  position: relative;
`;

export const FilterTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;
  color: ${(props): string => props.theme.palette['grey-800']};
  text-align: left;
  user-select: none;
  margin-bottom: 24px;
  &:first-letter {
    text-transform: uppercase;
  }
`;
