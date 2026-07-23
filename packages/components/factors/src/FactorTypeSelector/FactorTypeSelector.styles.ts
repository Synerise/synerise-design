import styled from 'styled-components';

import Button from '@synerise/ds-button';

export const FactorTypeList = styled.div`
  padding: 8px;
  background: var(--ds-color-background-base-default);
`;

export const TriggerButton = styled(Button)`
  &&& {
    display: inline-flex;
    border-radius: 3px 0 0 3px;
    min-width: 32px;
  }
`;
