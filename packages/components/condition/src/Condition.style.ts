import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Condition = styled.div`
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 575px;
`;

export const Step = styled.div<{ withStepName: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: ${(props): string => (props.withStepName ? '12px 0 24px' : '24px 0')};
`;

export const CondtionWrapper = styled.div``;

export const StepName = styled.div`
  font-size: 13px;
  line-height: 1.38;
  color: ${(props): string => props.theme.palette['grey-400']};
  margin: 16px 0 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  white-space: pre-wrap;
`;

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

export const StepConditions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ConditionRows = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

export const ConditionRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding-bottom: 16px;

  ${CondtionWrapper} {
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
