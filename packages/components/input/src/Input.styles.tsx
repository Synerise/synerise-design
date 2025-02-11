import React, { forwardRef, ReactNode } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

import BaseAntInput, { InputProps, InputRef } from 'antd/lib/input';
import TextArea, { TextAreaProps, TextAreaRef } from 'antd/lib/input/TextArea';

import { ThemeProps } from '@synerise/ds-core';
import { SizeType } from 'antd/es/config-provider/SizeContext';

import { TextareaWrapper } from './Textarea/Textarea.styles';

import type { AutoResizeProp } from './Input.types';

const errorInputStyle = (props: ThemeProps) => `
  &&&, && .ant-input {
    border-color: ${props.theme.palette['red-600']};
    box-shadow: inset 0 0 0 1px ${props.theme.palette['red-600']};
    background: ${props.theme.palette['red-050']};
  }
`;

export type AutoResizeInputProps = {
  autoResize?: AutoResizeProp;
  suffixel?: ReactNode;
  prefixel?: ReactNode;
  icon1?: ReactNode;
  icon2?: ReactNode;
};

const getPaddingAutoResize = (props: AutoResizeInputProps) => {
  if (props.prefixel || props.suffixel) {
    return '0 43px';
  }
  if (props.icon1 || props.icon2) {
    return '0 25px';
  }
  return '0 13px';
};

export function autoresizeConfObjToCss({ autoResize }: { autoResize?: AutoResizeProp }) {
  if (!autoResize) return '';
  if (typeof autoResize === 'object') {
    return `
      ${autoResize.maxWidth ? `max-width: ${autoResize.maxWidth};` : ''}
      min-width: ${autoResize.minWidth};
    `;
  }
  return `max-width: 400px; min-width: 150px;`;
}

export const Wrapper = styled.div`
  margin-bottom: 24px;
`;

export const InputWrapper = styled.div<{ icon1?: boolean; icon2?: boolean; icon3?: boolean }>`
  position: relative;
  && .ant-input {
    padding-right: ${props => {
      const iconsCount = Number(props.icon1) + Number(props.icon2) + Number(props.icon3);
      if (iconsCount === 3) return '92px;';
      if (iconsCount === 2) return '64px;';
      if (iconsCount === 1) return '36px;';
      return '12px';
    }};
    &::placeholder {
      line-height: 1.29;
    }
  }
  .ant-input-group-addon {
    height: 100%;
  }
`;

export const OuterWrapper = styled.div<{
  resetMargin?: boolean;
  autoResize?: AutoResizeProp;
}>`
  margin: ${props => (props.resetMargin ? '0' : '0 0 16px 0')};
  &.active {
    && {
      input {
        box-shadow: inset 0 0 0 1px ${props => props.theme.palette['blue-600']};
        border-color: ${props => props.theme.palette['blue-600']};
        background-color: ${props => props.theme.palette['blue-050']};
      }
    }
  }
  input {
    ${(props: AutoResizeInputProps) => autoresizeConfObjToCss(props)}
  }
  ${props =>
    props.autoResize &&
    `
    ${InputWrapper} {
      display: inline-block;
    }`}
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
      fill: ${props => props.theme.palette['grey-600']};
      opacity: ${props => (props.disabled ? '0.4' : '')};
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
      fill: ${props => props.theme.palette['blue-600']};
      cursor: pointer;
    }
  }
`;

export const AntdInput = styled(
  forwardRef<InputRef, InputProps & { error?: boolean; size?: SizeType }>(
    // eslint-disable-next-line
    ({ error, ...props }, ref) => <BaseAntInput autoComplete="off" {...props} ref={ref} />
  )
)<{ error?: boolean; readOnly?: boolean; autoResize?: AutoResizeProp; disabled?: boolean }>`
  ${props => (props.error ? errorInputStyle(props) : '')};

  &&& {
    min-height: ${props => (props.autoResize ? '16' : '32')}px;
    transition: all 0.3s, width 0ms, min-width 0ms, max-width 0ms;
    grid-area: 1 / 1;
    color: ${props => (props.disabled ? props.theme.palette['grey-500'] : props.theme.palette['grey-700'])};
    z-index: 1;
    &::placeholder {
      color: ${props => props.theme.palette['grey-500']};
    }
    &::-moz-placeholder {
      line-height: ${props => (props.size === 'large' ? `2.49` : `1.29`)};
    }
    .ds-input-prefix {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    .ds-input-suffix {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
    ${({ readOnly, theme }) =>
      readOnly
        ? `
            &:hover {
              border-color: ${theme.palette['grey-300']};
            }
            &:focus {
              border-color: ${theme.palette['grey-300']};
              box-shadow: none;
              background: #fff;
            }
          `
        : ''}
  }
`;

export const AntdTextArea = styled(
  forwardRef<TextAreaRef, TextAreaProps & { error?: boolean }>(
    // eslint-disable-next-line
    ({ error, ...props }, ref) => <TextArea autoComplete="off" {...props} ref={ref} />
  )
)<{ error?: boolean }>`
  ${props => (props.error ? errorInputStyle(props) : '')};

  && {
    color: ${props => props.theme.palette['grey-700']};
  }
`;

export const ExpandableWrapper = styled.div<{ expanded: boolean }>`
  position: relative;
  overflow: visible;

  ${TextareaWrapper} {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    resize: none;
    max-height: 124px;
    min-width: 282px;

    ${(props): FlattenSimpleInterpolation => {
      if (props.expanded) {
        return css`
          pointer-events: initial;
          display: block;
        `;
      }
      return css`
        pointer-events: none;
        display: none;
      `;
    }}
  }
`;

export const ContentBelow = styled.div`
  margin-top: 8px;
`;
export const WrapperAutoResize = styled.div<{
  autoResize?: AutoResizeProp;
}>`
  display: inline-grid;
  align-items: center
  justify-items: start;
  ${(props: AutoResizeInputProps) => autoresizeConfObjToCss(props)}
`;
export const AutoResize = styled.div<AutoResizeInputProps>`
  max-height: 32px;
  grid-area: 1 / 1;
  visibility: hidden;
  white-space: pre;
  padding: ${props => getPaddingAutoResize(props)};
  ${(props: AutoResizeInputProps) => (props.autoResize && props.suffixel ? autoresizeConfObjToCss(props) : '')};
  @media (max-width: 1420px) {
    max-width: 300px;
  }
  @media (max-width: 1150px) {
    max-width: 200px;
  }
  @media (max-width: 1100px) {
    max-width: 150px;
  }
`;
export const ErrorText = styled.div`
  color: ${props => props.theme.palette['red-600']};
  margin-bottom: 4px;
`;

export const Label = styled.label`
  color: ${props => props.theme.palette['grey-800']};
  font-weight: 500;
  display: block;
`;

export const Counter = styled.div`
  font-weight: 500;
  flex: 1 0 auto;
  text-align: end;
  color: ${props => props.theme.palette['grey-500']};
`;

export const Description = styled.div`
  color: ${props => props.theme.palette['grey-600']};
`;

export const ContentAbove = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  min-height: 18px;
`;
export const AddonWrapper = styled.div<{ height: number }>`
  background: ${props => props.theme.palette['grey-050']};
  display: flex;
  align-items: center;
  height: ${props => `${props.height}px` || '30px'};
`;
