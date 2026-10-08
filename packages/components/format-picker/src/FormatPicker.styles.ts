import styled, {
  css,
  type FlattenInterpolation,
  type ThemeProps,
} from 'styled-components';

import Button, { type StyledButton } from '@synerise/ds-button';
import { IconContainer } from '@synerise/ds-icon';

// Clear affordance borrowed from `ds-completed-within`: a red Close3S pinned to the trigger's
// right edge, with the trigger padded so the label never runs under it.
export const TriggerButton: StyledButton = styled(Button)`
  transition: padding 0s;
`;

export const ClearButton: StyledButton = styled(Button)`
  &&& {
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

export const FormatPickerWrapper = styled.div<{ withClear: boolean }>`
  display: inline-flex;
  align-items: center;
  position: relative;

  ${(props): FlattenInterpolation<ThemeProps<boolean>> | false =>
    props.withClear &&
    css`
      &&& {
        ${TriggerButton} {
          padding-right: 32px;
        }

        ${ClearButton} {
          background-color: transparent !important;
          position: absolute;
          right: 0;
        }
      }
    `};
`;
