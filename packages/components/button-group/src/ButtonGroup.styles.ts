import styled, {
  type FlattenSimpleInterpolation,
  type Keyframes,
  css,
  keyframes,
} from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';

const mapButtonsPosition = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};
export const focusAnimation = ({ theme }: ThemeProps): Keyframes => keyframes`
  0% {
      box-shadow: inset 0 0 0 1px inherit;
  }
  50% {
     box-shadow: inset 0 0 0 1px ${theme.palette['blue-600']};
  }
  100% {
     box-shadow: inset 0 0 0 1px inherit;
  }
`;

export const Container = styled.div<{
  options?: boolean;
  fullWidth?: boolean;
  buttonsPosition: string | 'left' | 'center' | 'right';
  disabled?: boolean;
  splitMode?: boolean;
  compact?: boolean;
  error?: boolean;
}>`
  ${(props): string => (props.fullWidth ? 'width: 100%;' : '')};
  .ant-btn-group {
    width: 100%;
    display: flex;
    gap: ${(props): string => (props.compact ? '0px' : '8px')};
    flex-direction: row;
    align-items: stretch;
    justify-content: ${(props): string =>
      mapButtonsPosition[props.buttonsPosition]};
    ${(props): FlattenSimpleInterpolation | false =>
      !!props.splitMode &&
      !props.error &&
      css`
        *:not(:first-child).ds-button.single-icon,
        .ds-button.single-icon.ant-btn-custom-color,
        .ds-button.single-icon.ant-btn-tertiary-white {
          border-left: 1px solid rgba(255, 255, 255, 0.15);
          &:disabled.ds-button.single-icon {
            &.ant-btn-tertiary-white {
              border-left: 1px solid rgba(255, 255, 255, 0.2) !important ;
            }
            &.ant-btn-tertiary {
              border-left: 1px solid rgba(106, 117, 128, 0.1) !important ;
            }
            &.ant-btn-custom-color {
              border-left: 1px solid rgba(255, 255, 255, 0.8) !important ;
            }
            &.ant-btn-primary {
              border-left: 1px solid rgba(255, 255, 255, 0.5) !important ;
            }
          }
        }
        *:not(:first-child).ds-button.single-icon.ant-btn-ghost-primary,
        .ds-button.single-icon.ant-btn-ghost,
        .ds-button.single-icon.ant-btn-ghost-white,
        .ds-button.single-icon.ant-btn-secondary {
          border-left: 0px;
          padding-left: 1px;
        }
        *:not(:first-child).ds-button.single-icon.ant-btn-tertiary {
          border-left: 1px solid rgba(106, 117, 128, 0.2);
        }
        .ds-button.label.ant-btn-tertiary[disabled] {
          color: ${props.theme.palette['grey-500']} !important;
        }
        &:hover:not(:disabled) {
          *:not(:first-child).ds-button.single-icon {
            &.ant-btn-tertiary,
            &.ant-btn-tertiary-white,
            &.ant-btn-primary,
            &.ant-btn-custom-color {
              border-left: transparent !important;
            }
          }
        }
        .ds-button:focus {
          &.ant-btn-primary,
          &.ant-btn-tertiary,
          &.ant-btn-tertiary-white,
          &.ant-btn-custom-color {
            border-color: transparent !important;
            &:active {
              border-color: transparent !important;
            }
          }
        }
      `};
    ${(props): FlattenSimpleInterpolation | false =>
      !!props.splitMode &&
      !!props.error &&
      css`
        *:not(:first-child).ds-button.single-icon,
        .ds-button.single-icon.ant-btn-custom-color,
        .ds-button.single-icon.ant-btn-tertiary-white,
        .ds-button.single-icon.ant-btn-ghost,
        .ds-button.single-icon.ant-btn-ghost-white {
          border-left: 1px solid ${props.theme.palette['red-600']};
        }
        .ds-button:focus {
          &.ant-btn-primary,
          &.ant-btn-tertiary,
          &.ant-btn-tertiary-white,
          &.ant-btn-custom-color,
          &.ant-btn-ghost-primary,
          &.ant-btn-ghost-white,
          &.ant-btn-ghost {
            border-left: 0px;
            &:active {
              border-left: 0px;
            }
          }
        }
        *:not(:first-child).ds-button.single-icon.ant-btn-ghost-primary,
        .ds-button.single-icon.ant-btn-ghost,
        .ds-button.single-icon.ant-btn-ghost-white,
        .ds-button.single-icon.ant-btn-secondary,
        .ds-button.single-icon.ant-btn-tertiary,
        .ds-button.single-icon.ant-btn-tertiary-white,
        .ds-button.single-icon.ant-btn-primary,
        .ds-button.single-icon.ant-btn-custom-color {
          border-left: 0px;
          padding-left: 1px;
        }
        .ds-button:hover:not(:focus) {
          &.ant-btn-tertiary,
          &.ant-btn-ghost,
          &.ant-btn-tertiary-white,
          &.ant-btn-ghost-white {
            box-shadow: inset 0 0 0 1px ${props.theme.palette['red-600']};
          }
        }
      `};

    & > .ant-btn {
      width: auto;
      flex: ${(props): string => (props.fullWidth ? '1' : 'none')};
      border-radius: ${(props): string => (props.compact ? '0px' : '3px')};

      &.ant-btn-primary {
        &:focus {
          z-index: 99999;
        }
      }
    }
  }
`;

export const Title = styled.h4`
  margin: 0 0 8px;
`;

export const Description = styled.p`
  margin: 8px 0 0;
  color: ${(props): string => props.theme.palette['grey-500']};
`;
