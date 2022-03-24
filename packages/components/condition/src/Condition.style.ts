import styled from 'styled-components';
import { IconWrapper } from '@synerise/ds-inline-edit/dist/InlineEdit.styles';
import Icon from '@synerise/ds-icon';

export const StepConditions = styled.div<{ withoutStepName: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: ${(props): string => (props.withoutStepName ? '22px' : '0')};
`;

export const StepName = styled.div`
  font-size: 13px;
  line-height: 1.84;
  color: ${(props): string => props.theme.palette['grey-800']};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  white-space: pre-wrap;
  &&& input {
    margin-top: 2px;
  }
`;

export const Condition = styled.div`
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 575px;
  width: 100%;

  .steps-list {
    width: 100%;
  }
`;

export const DragIcon = styled(Icon)`
  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: 0;
  left: -24px;
`;

export const StepCruds = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  opacity: 0;
  visibility: hidden;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

export const StepHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 8px;
  cursor: grab;
`;

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 12px 24px ;
  position: relative;
  &:first-of-type {
    &.steps-list-ghost-element {
      &:after {
        display: none;
      }
    }
  }
  
  &:hover {
    background-color: ${(props): string => props.theme.palette['grey-050']};
    ${StepCruds} {
      opacity: 1;
      visibility: visible;
    }
    ${DragIcon} {
      opacity: 1;
      visibility: visible;
    }
  }
  &.sortable-chosen {
    cursor: grabbing;
    width: 100%;
    opacity: 1 !important;
    height: 50px;
    background-color: ${(props): string => props.theme.palette.white};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    box-shadow: 0 16px 32px 0 #23293619;
    ${StepHeader} {
      align-items: center;
      }
    ${StepName} {
      margin: 0;
      ${IconWrapper} {
        display: none;
      }
    }

    ${StepConditions} {
      display: none;
    }
  }
  &.steps-list-ghost-element {
    cursor: grabbing;
    width: 100%;
    background-color: ${(props): string => props.theme.palette['blue-050']};
    border-left: 2px solid ${(props): string => props.theme.palette['blue-600']};
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    height: 50px;
    box-shadow: none;
    position: relative;
    margin: 24px 0;
    &:after {
      content: '';
      position: absolute;
      top: -24px;
      left: 0;
      width: 100%;
      height: 1px;
      border-bottom: 1px dotted ${(props): string => props.theme.palette['grey-300']};
    }
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
}
`;

export const ConditionWrapper = styled.div``;

export const Subject = styled.div``;

export const RemoveIconWrapper = styled.span`
  visibility: hidden;
  pointer-events: none;
  opacity: 0;
  transition: all 0.3s ease;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

export const ConditionRows = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

export const ConditionRow = styled.div<{ index: number }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding-bottom: 16px;
  min-width: 780px;
  z-index: ${(props): number => 10000 - props.index};

  ${ConditionWrapper} {
    margin-right: 8px;
    &:last-of-type {
      margin-right: 0;
    }
  }

  &:hover {
    ${RemoveIconWrapper} {
      opacity: 1;
      visibility: visible;
      pointer-events: all;
      cursor: pointer;
    }
  }
`;

export const AddConditionRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
`;

export const ConditionConnections = styled.span<{ first?: boolean; last?: boolean }>`
  display: flex;
  width: 32px;
  margin: 0 12px;
  position: relative;
  height: 32px;

  &:before {
    position: absolute;
    content: '';
    width: ${(props): string => (props.first ? '100%' : '16px')};
    height: 1px;
    top: 50%;
    left: ${(props): string => (props.first ? '0' : '16px')};
    background-color: ${(props): string => props.theme.palette['grey-300']};
  }
  &:after {
    display: ${(props): string => (props.first && props.last ? 'none' : 'flex')};
    position: absolute;
    content: '';
    width: 1px;
    left: 50%;
    height: auto;
    top: ${(props): string => (props.first ? '16px' : '0')};
    bottom: ${(props): string => (props.last ? '16px' : '-16px')};
    background-color: ${(props): string => props.theme.palette['grey-300']};
  }
`;

export const AddStepButton = styled.div`
  margin-left: 24px;
`;
