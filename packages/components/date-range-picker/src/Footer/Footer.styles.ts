import styled from 'styled-components';
import Button from '@synerise/ds-button';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 24px;
  background: ${(props): string => props.theme.palette['grey-050']};
`;

export const Actions = styled.div`
  flex: 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
  > *:not(:last-child) {
    margin-right: 8px;
  }
`;
export const Range = styled(Button)`
  && {
    margin: 4px 0;
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
`;
export const ActionsPlaceholder = styled.div`
  display: flex;
  flex: 1;
`;
export const ChosenRange = styled.div`
  font-weight: 500;
  line-height: 24px;
  color: ${(props): string => props.theme.palette['grey-800']};

  .ds-icon svg {
    margin-top: -2px;
    fill: ${(props): string => props.theme.palette['grey-400']};
  }
`;
