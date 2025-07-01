import styled, {
  type FlattenInterpolation,
  type ThemeProps,
  css,
} from 'styled-components';

import Button from '@synerise/ds-button';
import { IconContainer } from '@synerise/ds-icon';

export const TriggerButton = styled(Button)`
  transition: padding 0s;
`;

export const ClearButton = styled(Button)`
  &&& {
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.3s ease-in-out,
      width 0.3s ease-in-out;
    ${IconContainer} {
      svg {
        fill: ${(props): string => props.theme.palette['red-600']};
        color: ${(props): string => props.theme.palette['red-600']};
      }
    }
    &:hover {
      ${IconContainer} {
        svg {
          fill: ${(props): string => props.theme.palette['red-600']} !important;
          color: ${(props): string =>
            props.theme.palette['red-600']} !important;
        }
      }
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

  ${(props): FlattenInterpolation<ThemeProps<boolean>> | false =>
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
