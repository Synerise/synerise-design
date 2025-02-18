import React, { forwardRef } from 'react';
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

const INPUT_PADDING = 12;
const INPUT_BORDER = 1;
const ICON_SIZE = 24;

type AutoSizeConfProps = {
  autoResize?: AutoResizeProp;
  boxSizing?: 'content-box' | 'border-box';
  iconCount?: number;
};

const getIconsWidth = (iconCount: number) => {
  return iconCount > 0 ? iconCount * ICON_SIZE + (iconCount - 1) * 4 : 0;
};

export function autoresizeConfObjToCss({ autoResize, iconCount, boxSizing = 'content-box' }: AutoSizeConfProps) {
  // autosized inputs have box-sizing set to content-box!
  const elementPadding = boxSizing === 'content-box' ? 2 * (INPUT_PADDING + INPUT_BORDER) : 0;
  const finalPadding = getIconsWidth(iconCount || 0) + elementPadding;

  if (!autoResize) return '';
  if (typeof autoResize === 'object') {
    return css`
      ${autoResize.maxWidth ? `max-width: calc(${autoResize.maxWidth} - ${finalPadding}px);` : ''}
      min-width: calc(${autoResize.minWidth} - ${finalPadding}px);
    `;
  }
  return css`
    max-width: calc(400px - ${finalPadding}px);
    min-width: calc(150px - ${finalPadding}px);
  `;
}

export const Wrapper = styled.div`
  margin-bottom: 24px;
`;

export const InputWrapper = styled.div<{ iconCount?: number }>`
  position: relative;
  && .ant-input {
    padding-right: ${props => {
      return `${getIconsWidth(props.iconCount || 0) + INPUT_PADDING}px`;
    }};
    &::placeholder {
      line-height: 1.29;
    }
  }
  .ant-input-group-addon {
    height: 100%;
  }
`;

export const OuterWrapper = styled.div<
  {
    resetMargin?: boolean;
  } & AutoSizeConfProps
>`
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
    padding: 7px ${INPUT_PADDING}px;
    ${props => autoresizeConfObjToCss(props)}
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
