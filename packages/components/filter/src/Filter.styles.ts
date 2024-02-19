import styled from 'styled-components';
import { Body, DragIcon, Footer } from '@synerise/ds-step-card/dist/StepCard.styles';

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
`;

export const FilterHeader = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FilterHeaderRightSide = styled.div`
  flex: 1;
  overflow-x: hidden;
`;

export const MatchingWrapper = styled.div`
  flex: 0 0 auto;
  margin-right: 24px;
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
    &&&&.ghost-element {
      z-index: 100 !important;
    }
    ${DragIcon} {
      visibility: visible;
      opacity: 1;
    }
    ${Body} {
      position: absolute;
      opacity: 0;
      height: 0;
    }
    ${Footer},
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
      position: absolute;
      opacity: 0;
      height: 0;
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
  flex: 0 0 auto;
  &:first-letter {
    text-transform: uppercase;
  }
`;
