import styled, { keyframes, Keyframes } from 'styled-components';
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
}>`
  width: 100%;
  .ant-btn-group {
    margin: 4px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${(props): string => mapButtonsPosition[props.buttonsPosition]};
     *:not(:first-child).ds-button.single-icon {
      border-left: 1px solid rgba(255, 255, 255, 0.15);
    }
    *:not(:first-child).ds-button.single-icon.ant-btn-custom-color {
      border-left: 1px solid rgba(255, 255, 255, 0.15);
    }
    *:not(:first-child).ds-button.single-icon.ant-btn-secondary {
      border-left: 0px;
    }
    *:not(:first-child).ds-button.single-icon.ant-btn-ghost-primary {
      border-left: 0px;
    }
    *:not(:first-child).ds-button.single-icon.ant-btn-ghost {
      border-left: 0px;
    }
    *:not(:first-child).ds-button.single-icon.ant-btn-ghost-white {
      border-left: 0px;
    }
    *:not(:first-child).ds-button.single-icon.ant-btn-tertiary {
      border-left: 1px solid rgba(106, 117, 128, 0.2);
    }


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
