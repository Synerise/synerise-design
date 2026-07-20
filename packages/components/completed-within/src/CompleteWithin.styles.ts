import styled, { css } from 'styled-components';

import Button, { type StyledButton } from '@synerise/ds-button';
import { IconContainer } from '@synerise/ds-icon';

export const TriggerButton: StyledButton = styled(Button)`
  transition: padding 0s;
`;

export const ClearButton: StyledButton = styled(Button)`
  &&& {
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.3s ease-in-out,
      width 0.3s ease-in-out;
    ${IconContainer} {
      color: var(--ds-color-icon-danger-default);
    }

    &:focus {
      .btn-focus {
        box-shadow: none;
      }
    }
  }
`;

export const CompletedWithinWrapper = styled.div<{
  withValue: boolean;
  readOnly?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 32px;
  position: relative;

  ${(props) =>
    Boolean(props.withValue) &&
    !props.readOnly &&
    css`
      &&& {
        ${TriggerButton} {
          padding-right: 32px;
        }

        ${ClearButton} {
          background-color: transparent !important;
          position: absolute;
          right: 0;
          opacity: 1;
          pointer-events: all;
        }
      }
    `};
`;
