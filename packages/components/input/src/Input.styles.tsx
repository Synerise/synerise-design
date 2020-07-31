import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import BaseAntInput from 'antd/lib/input';
import TextArea from 'antd/lib/input/TextArea';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as React from 'react';
import MaskedInput from 'antd-mask-input';

const errorInputStyle = (props: ThemeProps): string => `
  &&, .ant-input {
    border-color: ${props.theme.palette['red-600']};
    box-shadow: inset 0 0 0 1px ${props.theme.palette['red-600']};
    background: ${props.theme.palette['red-050']};
    border-radius: 4px;
  }
`;

export const OuterWrapper = styled.div<{ resetMargin?: boolean }>`
  margin: ${(props): string => (props.resetMargin ? '0' : '0 0 24px 0')};
  &.active {
    && {
      input {
        box-shadow: inset 0 0 0 1px ${(props): string => props.theme.palette['blue-600']};
        border-color: ${(props): string => props.theme.palette['blue-600']};
        background-color: ${(props): string => props.theme.palette['blue-050']};
      }
    }
  }
`;

export const Wrapper = styled.div`
  margin-bottom: 24px;
`;

interface InputWrapperProps {
  icon1: boolean;
  icon2: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  .ant-input {
    padding-right: ${(props): string => {
      if (props.icon1 && props.icon2) return '64px;';
      if (props.icon1 || props.icon2) return '36px;';
      return '12px';
    }};
    ::placeholder {
      line-height:1.29;
    }
  }
  .ant-input::placeholder {
    line-height: 1.39;
  }
  
  .ant-input-group-addon {
    height: 100%;
  }
`;

export const IconsWrapper = styled.div<{ disabled?: boolean }>`
  position: absolute;
  right: 8px;
  top: 0;
  z-index: 2;
  height: 100%;

  .icon {
    svg {
      transition: 0.3s all;
      fill: ${(props): string => props.theme.palette['grey-600']};
      opacity: ${(props): string => (props.disabled ? '0.4' : '')};
    }
  }
`;

export const IconsFlexContainer = styled.div<{ type: string }>`
  ${(props): FlattenSimpleInterpolation => {
    if (props.type === 'input') {
      return css`
        display: flex;
        align-items: center;
        height: 100%;
      `;
    }

    return css`
      display: flex;
      align-items: flex-end;
      height: 100%;
      padding-bottom: 8px;
    `;
  }}
`;
export const IconWrapper = styled.div`
  .icon:hover {
    svg {
      fill: ${(props): string => props.theme.palette['blue-600']};
      cursor: pointer;
    }
  }
`;

export const AntdInput = styled(
  React.forwardRef<BaseAntInput, { error?: boolean }>(
    // eslint-disable-next-line
    ({ error, ...props }, ref) => (
      // eslint-disable-next-line
      <BaseAntInput autoComplete="off" {...props} ref={ref} />
    )
  )
)<{ error?: boolean }>`
  ${(props): string => (props.error ? errorInputStyle(props) : '')};

  && {
    color: ${(props): string => props.theme.palette['grey-700']};
    z-index: 1;

    &::placeholder {
      color: ${(props): string => props.theme.palette['grey-500']};
    }

    .ds-input-prefix {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    .ds-input-suffix {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
  }
`;

export const AntdMaskedInput = styled(
  React.forwardRef<MaskedInput, { error?: boolean; mask: string }>(
    // eslint-disable-next-line
    ({ error, mask, ...props }, ref) => (
      // eslint-disable-next-line
      <MaskedInput autoComplete="off" {...props} ref={ref} mask={mask} />
    )
  )
)<{ error?: boolean }>`
  ${(props): string => (props.error ? errorInputStyle(props) : '')};

  && {
    color: ${(props): string => props.theme.palette['grey-700']};
    z-index: 1;
    letter-spacing: 1.8px;
    &::placeholder {
      letter-spacing: 1.8px;
      color: ${(props): string => props.theme.palette['grey-700']};
    }
  }
`;

export const AntdTextArea = styled(
  React.forwardRef<TextArea, { error?: boolean }>(
    // eslint-disable-next-line
    ({ error, ...props }, ref) => (
      // eslint-disable-next-line
      <BaseAntInput.TextArea autoComplete="off" {...props} ref={ref} />
    )
  )
)<{ error?: boolean }>`
  ${(props): string => (props.error ? errorInputStyle(props) : '')};

  && {
    color: ${(props): string => props.theme.palette['grey-700']};
  }
`;

export const ContentBelow = styled.div`
  margin-top: 8px;
`;

export const ErrorText = styled.div`
  color: ${(props): string => props.theme.palette['red-600']};
  margin-bottom: 4px;
`;

export const Label = styled.label`
  color: ${(props): string => props.theme.palette['grey-800']};
  font-weight: 500;
  display: block;
`;

export const Counter = styled.div`
  font-weight: 500;
`;

export const Description = styled.div`
  color: ${(props): string => props.theme.palette['grey-600']};
`;

export const ContentAbove = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;
export const AddonWrapper = styled.div<{ height: number }>`
  background: ${(props): string => props.theme.palette['grey-050']};
  display: flex;
  align-items: center;
  height: ${(props): string => `${props.height}px` || '30px'};
`;
