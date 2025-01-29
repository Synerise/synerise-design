import styled from 'styled-components';
import Button from '@synerise/ds-button';

export const FactorTypeList = styled.div`
  padding: 8px;
  background: ${props => props.theme.palette.white};
`;

export const TriggerButton = styled(Button)`
  &&& {
    display: inline-flex;
    border-radius: 3px 0 0 3px;
    min-width: 32px;
    &:focus {
      .btn-focus {
        box-shadow: inset 0 0 0 1px ${(props): string => props.theme.palette['grey-300']};
      }
    }
  }
`;
