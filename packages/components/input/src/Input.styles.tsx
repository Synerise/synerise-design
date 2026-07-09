import React, {
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  forwardRef,
} from 'react';
import styled, {
  type FlattenSimpleInterpolation,
  css,
} from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';

import type { AutoResizeProp, InputSize } from './Input.types';
import { TextareaWrapper } from './Textarea/Textarea.styles';

const errorInputStyle = (props: ThemeProps) => `
  &&& {
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

export function autoresizeConfObjToCss({
  autoResize,
  iconCount,
  boxSizing = 'content-box',
}: AutoSizeConfProps) {
  // autosized inputs have box-sizing set to content-box!
  const elementPadding =
    boxSizing === 'content-box' ? 2 * (INPUT_PADDING + INPUT_BORDER) : 0;
  const finalPadding = getIconsWidth(iconCount || 0) + elementPadding;

  if (!autoResize) {
    return '';
  }
  if (typeof autoResize === 'object') {
    return css`
      ${autoResize.maxWidth
        ? `max-width: calc(${autoResize.maxWidth} - ${finalPadding}px);`
        : ''}
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
  && input {
    padding-right: ${(props) => {
      return `${getIconsWidth(props.iconCount || 0) + INPUT_PADDING}px`;
    }};
    &::placeholder {
      line-height: 1.29;
    }
  }
`;

export const OuterWrapper = styled.div<
  {
    resetMargin?: boolean;
  } & AutoSizeConfProps
>`
  margin: ${(props) => (props.resetMargin ? '0' : '0 0 16px 0')};
  &.active {
    && {
      input {
        box-shadow: inset 0 0 0 1px
          ${(props) => props.theme.palette['blue-600']};
        border-color: ${(props) => props.theme.palette['blue-600']};
        background-color: ${(props) => props.theme.palette['blue-050']};
      }
    }
  }
  /* Do NOT set padding on this descendant \`input\` — NativeInput already owns
     it, and a padding here (0,1,1) overrides NativeInput's $hasInnerPrefix /
     $hasPrefixel / $hasSuffixel adjustments (0,1,0) and leaks onto any nested
     foreign input (e.g. an autocomplete inside an InputGroup). */
  input {
    ${(props) => autoresizeConfObjToCss(props)}
  }

  ${(props) =>
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
      fill: ${(props) => props.theme.palette['grey-600']};
      opacity: ${(props) => (props.disabled ? '0.4' : '')};
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
      fill: ${(props) => props.theme.palette['blue-600']};
      cursor: pointer;
    }
  }
`;

type NativeInputStyledProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> & {
  error?: boolean;
  autoResize?: AutoResizeProp;
  $size?: InputSize;
  $hasPrefixel?: boolean;
  $hasSuffixel?: boolean;
  $hasInnerPrefix?: boolean;
};

/**
 * DS-native text input — replaces the antd `Input`. State (focus / error /
 * disabled / readOnly) is expressed with native pseudo-classes and theme tokens;
 * no antd component, no `.ant-*` styling selectors.
 */
export const NativeInput = styled(
  forwardRef<HTMLInputElement, NativeInputStyledProps>(
    (
      {
        error,
        autoResize,
        $size,
        $hasPrefixel,
        $hasSuffixel,
        $hasInnerPrefix,
        ...props
      },
      ref,
    ) => <input autoComplete="off" {...props} ref={ref} />,
  ),
)<NativeInputStyledProps & { readOnly?: boolean; disabled?: boolean }>`
  box-sizing: ${(props) => (props.autoResize ? 'content-box' : 'border-box')};
  width: 100%;
  /* Pin a fixed height so the box is exactly 32px (default) / 48px (large) —
     line-height can't push it taller and break row alignment (e.g. the
     date-picker trigger read 34px). autoResize is content-box (16/32 content +
     14 padding + 2 border), non-autoResize is border-box (32/48 outright). */
  ${(props) =>
    props.autoResize
      ? `height: ${props.$size === 'large' ? '32' : '16'}px;`
      : `height: ${props.$size === 'large' ? '48' : '32'}px;`}
  margin: 0;
  padding: 7px ${INPUT_PADDING}px;
  ${(props) => props.$hasInnerPrefix && 'padding-left: 32px;'}
  color: ${(props) =>
    props.disabled
      ? props.theme.palette['grey-400']
      : props.theme.palette['grey-700']};
  background-color: ${(props) => props.theme.palette.white};
  border: ${INPUT_BORDER}px solid ${(props) => props.theme.palette['grey-300']};
  border-radius: 3px;
  /* native form controls don't inherit font-family — pull in the DS body font
     so the value glyphs match antd (Graphik) instead of the browser default */
  font-family: inherit;
  font-size: 13px;
  outline: 0;
  grid-area: 1 / 1;
  transition:
    all 0.3s,
    width 0ms,
    min-width 0ms,
    max-width 0ms;
  ${(props) =>
    props.$hasPrefixel &&
    'border-top-left-radius: 0; border-bottom-left-radius: 0;'}
  ${(props) =>
    props.$hasSuffixel &&
    'border-top-right-radius: 0; border-bottom-right-radius: 0;'}

  &::placeholder {
    color: ${(props) => props.theme.palette['grey-500']};
    line-height: 1.29;
  }

  &:hover:not(:disabled) {
    border-color: ${(props) => props.theme.palette['grey-400']};
  }
  &:focus {
    box-shadow: inset 0 0 0 1px ${(props) => props.theme.palette['blue-600']};
    border-color: ${(props) => props.theme.palette['blue-600']};
    background-color: ${(props) => props.theme.palette['blue-050']};
  }
  &:disabled {
    cursor: not-allowed;
    background-color: ${(props) => props.theme.palette['grey-050']};
  }

  ${(props) => (props.error ? errorInputStyle(props) : '')};
  ${(props) => autoresizeConfObjToCss({ autoResize: props.autoResize })};
  ${(props) =>
    props.readOnly &&
    `
      &&& {
        &:hover {
          border-color: ${props.theme.palette['grey-300']};
        }
        &:focus {
          border-color: ${props.theme.palette['grey-300']};
          box-shadow: none;
          background: ${props.theme.palette.white};
        }
      }
    `}
`;

export const InputGroupRow = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
`;

export const Addon = styled.div<{
  $position: 'before' | 'after';
  $size?: InputSize;
}>`
  box-sizing: border-box;
  /* match the input box height so the grey block lines up; content is centred
     and vertically clipped rather than growing the block */
  height: ${(props) => (props.$size === 'large' ? '48' : '32')}px;
  display: flex;
  align-items: center;
  /* don't let the flex row squeeze the addon down to the ellipsis — size it to
     its content instead. No horizontal padding: the prefixel/suffixel content
     owns its own side margin. */
  flex-shrink: 0;
  overflow: hidden;
  padding: 0;
  white-space: nowrap;
  color: ${(props) => props.theme.palette['grey-700']};
  background-color: ${(props) => props.theme.palette['grey-050']};
  border: ${INPUT_BORDER}px solid ${(props) => props.theme.palette['grey-300']};
  ${(props) =>
    props.$position === 'before'
      ? 'border-right: 0; border-radius: 3px 0 0 3px;'
      : 'border-left: 0; border-radius: 0 3px 3px 0;'}
`;

export const ClearButton = styled.button<{ $offset: number }>`
  position: absolute;
  top: 50%;
  right: ${(props) => props.$offset}px;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  color: ${(props) => props.theme.palette['grey-500']};

  &:hover {
    color: ${(props) => props.theme.palette['grey-700']};
  }
`;

/** Inline content rendered inside the input on the left (the `innerPrefix` prop). */
export const InnerAffix = styled.div`
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
`;

export const RawTextArea = styled(
  forwardRef<
    HTMLTextAreaElement,
    TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }
  >(({ error, ...props }, ref) => (
    <textarea autoComplete="off" {...props} ref={ref} />
  )),
)<{ error?: boolean }>`
  && {
    /* A bare textarea is display:inline-block and, without an explicit width,
       falls back to its cols intrinsic width (~20ch). antd's textarea.ant-input
       carried width:100%; the de-antd base dropped it, so the textarea collapsed
       inside its full-width wrapper and text wrapped early (autosize then grew the
       height to fit). Fill the wrapper like NativeInput does. */
    box-sizing: border-box;
    width: 100%;
    color: ${(props) => props.theme.palette['grey-700']};
    /* native textarea doesn't inherit font-family — pull in the DS body font */
    font-family: inherit;
    font-size: 13px;
    /* Matches the previous antd textarea base padding (textarea.ant-input). */
    padding: 8px 12px;
    ${(props) =>
      props.error
        ? `
      box-shadow: inset 0 0 0 1px ${props.theme.palette['red-600']};
      background: ${props.theme.palette['red-050']};
      border-color: ${props.theme.palette['red-600']};
    `
        : ''}
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
    min-height: 65px;
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
  color: ${(props) => props.theme.palette['red-600']};
  margin-bottom: 4px;
`;

export const Label = styled.label`
  color: ${(props) => props.theme.palette['grey-800']};
  font-weight: 500;
  display: block;
`;

export const Counter = styled.div`
  font-weight: 500;
  flex: 1 0 auto;
  text-align: end;
  color: ${(props) => props.theme.palette['grey-500']};
`;

export const Description = styled.div`
  color: ${(props) => props.theme.palette['grey-600']};
`;

export const ContentAbove = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  min-height: 18px;
`;
export const AddonWrapper = styled.div<{ height: number }>`
  background: ${(props) => props.theme.palette['grey-050']};
  display: flex;
  align-items: center;
  height: ${(props) => (props.height ? `${props.height}px` : '30px')};
`;
