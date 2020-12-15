import styled, { css, FlattenSimpleInterpolation, keyframes, Keyframes } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

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
}>`
  width: 100%;
  .ant-btn-group {
    margin: 4px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${(props): string => mapButtonsPosition[props.buttonsPosition]};
    ${(props): FlattenSimpleInterpolation | false =>
      !!props.splitMode &&
      css`
        *:not(:first-child).ds-button.single-icon,
        .ds-button.single-icon.ant-btn-custom-color,
        .ds-button.single-icon.ant-btn-tertiary-white {
          border-left: 1px solid rgba(255, 255, 255, 0.15);
          &:disabled.ds-button.single-icon.ant-btn-tertiary-white {
            border-left: 1px solid rgba(255, 255, 255, 0.2) !important ;
          }
          &:disabled.ds-button.single-icon.ant-btn-tertiary {
            border-left: 1px solid rgba(106, 117, 128, 0.1) !important ;
          }
          &:disabled.ds-button.single-icon.ant-btn-custom-color {
            border-left: 1px solid rgba(255, 255, 255, 0.8) !important ;
          }
          &:disabled.ds-button.single-icon.ant-btn-primary {
            border-left: 1px solid rgba(255, 255, 255, 0.5) !important ;
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
          .ds-button {
            &.ant-btn-tertiary {
              border-color: rgba(106, 117, 128, 0) !important;
            }
            &.ant-btn-tertiary-white {
              border-color: rgba(219, 224, 227, 0) !important;
            }
          }
          .ant-btn-primary {
            border-color: transparent !important ;
          }
          .ant-btn-custom-color {
            border-color: transparent !important ;
          }
        }

        .ant-btn-primary:focus {
          border-left: 1px solid transparent !important ;
        }

        .ds-button {
          &.ant-btn-tertiary:focus {
            border-color: rgba(106, 117, 128, 0) !important;
          }
          &.ant-btn-tertiary-white:focus {
            border-color: rgba(219, 224, 227, 0) !important;
          }
        }
        .ant-btn-custom-color:focus {
          border-left: 1px solid transparent !important ;
        }
        .ant-btn-primary:active {
          border-left: 1px solid transparent !important ;
        }
        .ds-button {
          &.ant-btn-tertiary:active {
            border-color: rgba(106, 117, 128, 0) !important;
          }
          &.ant-btn-tertiary-white:active {
            border-color: rgba(219, 224, 227, 0) !important;
          }
        }
        .ant-btn-custom-color:active {
          border-left: 1px solid transparent !important ;
        }
      `};

    & > .ant-btn {
      width: auto;
      flex: ${(props): string => (props.fullWidth ? '1' : 'none')};
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
