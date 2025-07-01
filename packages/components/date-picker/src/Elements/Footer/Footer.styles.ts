import styled from 'styled-components';

import Button from '@synerise/ds-button';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
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
