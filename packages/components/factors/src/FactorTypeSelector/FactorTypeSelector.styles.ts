import styled from 'styled-components';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';

export const FactorTypeList = styled(Menu)`
  padding: 8px;

  .ds-factor-type {
    padding: 0;
  }
`;

export const TriggerButton = styled(Button)`
  &&& {
    display: inline-flex;
    border-radius: 3px 0 0 3px;
    &:focus {
      .btn-focus {
        box-shadow: inset 0 0 0 1px ${(props): string => props.theme.palette['grey-300']};
      }
    }
  }
`;
