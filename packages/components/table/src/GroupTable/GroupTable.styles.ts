import styled from 'styled-components';
import { StatusTag } from '@synerise/ds-status/dist/Status.styles';
import { CheckboxWrapper } from '@synerise/ds-checkbox/dist/Checkbox.styles';

export const GroupRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const GroupRowLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  ${StatusTag} {
    margin-left: 12px;
  }
`;

export const GroupRowRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .ds-expander {
    margin-left: 24px;
  }
`;

export const GroupSelection = styled.div`
  display: flex;
  padding: 0 24px 0 0;
  ${CheckboxWrapper} {
    padding: 0;
  }
`;

export const GroupValue = styled.div`
  display: flex;
  padding: 0 24px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const GroupValueLabel = styled.span`
  font-weight: 500;
  color: ${(props): string => props.theme.palette['grey-700']};
`;

export const SubRow = styled.td<{ selected?: boolean; withBorderLeft?: boolean; sorted?: boolean }>`
  background-color: ${(props): string => {
    if (props.selected) return 'rgb(250, 248, 234) !important;';
    if (props.sorted) return 'rgba(213, 232, 246, 0.44) !important;';
    return `${props.theme.palette['grey-050']};`;
  }}
    
  position: relative;
  &:before {
    content: '';
    width: 2px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: ${(props): string => props.theme.palette['grey-600']};
    display: ${(props): string => (props.withBorderLeft ? 'flex' : 'none')};
  }
  ${CheckboxWrapper} {
    padding: 0;
  }
`;
