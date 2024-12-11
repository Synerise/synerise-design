import styled, { FlattenSimpleInterpolation, FlattenInterpolation, css } from 'styled-components';
import { IconWrapper } from '@synerise/ds-inline-edit/dist/InlineEdit.styles';
import Icon from '@synerise/ds-icon';
import Cruds from '@synerise/ds-cruds';
import { ThemeProps } from '@synerise/ds-core';
import { InputGroupItem } from '@synerise/ds-input/dist/InputGroup.styles';

export const ErrorWrapper = styled.div`
  color: ${(props): string => props.theme.palette['red-600']};
  margin-top: 8px;
`;

export const DragIcon = styled(Icon)`
  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: 0;
  left: -24px;
  cursor: grab;
`;

export const StepConditionCruds = styled(Cruds)`
  position: absolute;
  top: 16px;
  right: 24px;
  visibility: hidden;
  opacity: 0;
`;

export const StepConditions = styled.div<{ withCruds?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 0;
  padding: 0 24px;
  width: ${(props): string => (props.withCruds ? 'calc(100% - 48px)' : '100%')};

  ${DragIcon} {
    left: 0;
    top: 16px;
  }
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
    cursor: default;
  }
`;

export const StepIndexWrapper = styled.span`
  font-size: 13px;
  font-weight: 500;
  margin-right: 8px;
`;

export const Condition = styled.div`
  padding: 12px 0;
  display: block;
  min-width: 575px;
  width: 100%;

  .steps-list {
    width: 100%;
  }
`;

export const ConditionStepWrapper = styled.div``;

export const And = styled.div`
  display: contents;
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
  padding: 0 24px;
`;

export const DraggedLabel = styled.span`
  width: 100%;
  height: 100%;
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: flex-start;
  padding-left: 18px;
  color: ${(props): string => props.theme.palette['grey-600']};
  font-size: 13px;
`;

export const Step = styled.div<{
  active: boolean;
  showSuffix: boolean | undefined;
  hoverDisabled?: boolean;
  singleStepCondition?: boolean;
}>`
  
  padding: ${({ singleStepCondition }) => (singleStepCondition ? '24px 0' : '12px 0')};
  position: relative;

  ${(props): false | FlattenInterpolation<ThemeProps> =>
    Boolean(props.showSuffix) &&
    css`
      &:after {
        display: none;
        width: 100%;
        padding: 18px 0 18px 24px;
        bottom: -18px;
        content: attr(data-conditionSuffix);
        background-color: ${props.theme.palette.white};
        position: relative;
        font-size: 16px;
        font-weight: 500;
        color: #3f4c5b;
      }

      &:first-child:not(:last-child) {
        &:after {
          display: flex;
        }
      }

      &:not(:last-child) {
        &:after {
          display: flex;
        }
      }
    `}

  
  &:first-of-type {
    &.steps-list-ghost-element {
      &:after {
        display: none;
      }
    }
  }
  background-color: ${(props): string =>
    props.active && !props.singleStepCondition ? props.theme.palette['grey-050'] : 'transparent'};
  &:hover {
    ${(props): string | false => !props.hoverDisabled && `background-color: ${props.theme.palette['grey-050']}`};
    ${StepCruds} {
      opacity: 1;
      visibility: visible;
    }
    ${StepConditionCruds} {
      opacity: 1;
      visibility: visible;
    }
    ${DragIcon} {
      opacity: 1;
      visibility: visible;
    }
  }
  &.sortable-chosen, 
  &.sortable-drag{
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
    
    &:after {
      display: none;
    }
    
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
    
    ${DraggedLabel}{
      display: flex;
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
    
    &:before {
      content: attr(data-dropLabel);
      text-align: center;
      position: relative;
      color: ${(props): string => props.theme.palette['blue-600']};
    }
    ${DraggedLabel} {
      display: none;
    }
    * {
      display: none;
    }
    &:after {
      display: none;
      content: '';
    }
  }
}
`;

export const Subject = styled.div``;

export const RemoveIconWrapper = styled.span.attrs({ 'data-testid': 'ds-conditions-remove-row' })`
  visibility: hidden;
  pointer-events: none;
  opacity: 0;
  transition: all 0.3s ease;
  width: 24px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

export const ConditionWrapper = styled.div<{ withRemoveTrigger?: boolean }>`
  ${(props): FlattenSimpleInterpolation | false =>
    Boolean(props.withRemoveTrigger) &&
    css`
      & {
        display: flex;
        > * {
          min-width: 0;
        }
      }
      ${RemoveIconWrapper} {
        flex: 0 0 24px;
      }
    `};

  ${InputGroupItem} {
    min-width: 0;
  }
`;

export const ConditionRows = styled.div`
  flex-grow: 1;
  min-width: 0;
`;

export const ConditionRowDefinition = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ConditionRowLine = styled.div`
  flex-grow: 1;
  min-width: 0;
`;

export const AddConditionRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
`;

export const ConditionConnections = styled.span<{ first?: boolean; last?: boolean; readOnly?: boolean }>`
  display: flex;
  width: 32px;
  min-width: 32px;
  margin: 0 12px;
  position: relative;
  height: 32px;

  &:before {
    position: absolute;
    content: '';
    width: ${(props): string => (props.first ? '100%' : '16px')};
    height: 1px;
    top: 16px;
    left: ${(props): string => (props.first ? '0' : '16px')};
    background-color: ${(props): string => props.theme.palette['grey-300']};
  }
  &:after {
    display: ${(props): string => ((props.first && props.last) || (props.last && props.readOnly) ? 'none' : 'flex')};
    position: absolute;
    content: '';
    width: 1px;
    left: 50%;
    height: auto;
    top: ${(props): string => (props.first ? '16px' : '0')};
    bottom: ${(props): string => (props.last ? '16px' : '-100%')};
    background-color: ${(props): string => props.theme.palette['grey-300']};
  }
`;
export const ConditionRow = styled.div<{
  withError: boolean;
  index: number;
  onlyChild?: boolean;
  last?: boolean;
}>`
  padding-bottom: ${(props): string => (props.onlyChild ? '0' : '16px')};
  display: flex;
  flex-grow: 1;
  
  ${ConditionConnections} {
    height: ${(props): string => (props.withError ? 'auto' : '32px')};
    ${props =>
      props.withError &&
      css`
          &:after {
            bottom: ${() => (props.last ? '16px' : 'calc(-100% + 24px)')};
      `}
    }
  }

  ${ConditionWrapper} {
    margin-right: 8px;
    &:last-of-type {
      margin-right: 0;
      flex-grow: 1;
      min-width: 0;
    }
    &:only-of-type {
      flex-grow: 0;
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

export const AddStepButton = styled.div`
  margin: 12px 24px 0;
`;

export const ActionAttribute = styled.div`
  margin-left: 8px;
  display: flex;
`;
