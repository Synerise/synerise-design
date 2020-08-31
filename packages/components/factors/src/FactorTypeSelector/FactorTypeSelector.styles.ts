import styled from 'styled-components';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';

// eslint-disable-next-line import/prefer-default-export
export const FactorTypeList = styled(Menu)`
  padding: 8px;

  .ds-menu-item {
    padding: 0;
  }
`;

export const TriggerButton = styled(Button)`
  &&& {
    display: inline-flex;
    border-radius: 3px 0 0 3px;
    &:focus {
      .btn-focus {
        box-shadow: inset 0 0 0 1px #dbe0e3;
      }
    }
  }
`;
