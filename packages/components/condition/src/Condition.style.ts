import styled, { FlattenInterpolation, css } from 'styled-components';
import { IconWrapper } from '@synerise/ds-inline-edit/dist/InlineEdit.styles';
import Icon from '@synerise/ds-icon';
import Cruds from '@synerise/ds-cruds';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { ConditionRowProps } from './ConditionStep/ConditionRow';

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

export const StepConditions = styled.div<{ withoutStepName: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 0;
  padding: 0 24px;
  width: ${(props): string => (props.withoutStepName ? 'calc(100% - 48px)' : '100%')};

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

export const StepIndexWrapper = styled.span<{ readOnly?: boolean }>`
  font-size: 13px;
  font-weight: ${({ readOnly }): string => (readOnly ? '500' : '400')};
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

export const ConditionStepWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
`;

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

export const Step = styled.div<{ active: boolean; showSuffix: boolean | undefined; hoverDisabled?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 12px 0 12px;
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
  background-color: ${(props): string => (props.active ? props.theme.palette['grey-050'] : 'transparent')};
  &:hover {
    background-color: ${(props): string => (props.hoverDisabled ? 'transparent' : props.theme.palette['grey-050'])};
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

export const ConditionWrapper = styled.div<{ fullWidth?: boolean }>``;

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

export const ConditionRowDefinition = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ConditionRowLine = styled.div``;

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
    bottom: ${(props): string => (props.last ? '16px' : '-16px')};
    background-color: ${(props): string => props.theme.palette['grey-300']};
  }
`;

export const ConditionRow = styled.div<{ withError: boolean; index: number; stepType: ConditionRowProps['stepType'] }>`
  padding-bottom: ${(props): string => (props.stepType === 'event' ? '16px' : '0')};
  z-index: ${(props): number => 10000 - props.index};
  display: flex;

  ${ConditionConnections} {
    height: ${(props): string => (props.withError ? 'auto' : '32px')};
  }

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

export const AddStepButton = styled.div`
  margin: 12px 24px 0;
`;
