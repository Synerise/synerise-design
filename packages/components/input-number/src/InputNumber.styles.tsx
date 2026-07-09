import styled, { css } from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';
import {
  type AutoResizeProp,
  autoresizeConfObjToCss,
} from '@synerise/ds-input';

import {
  ANGLE_DOWN_SVG,
  ANGLE_UP_SVG,
} from './constants/inputNumber.constants';

type SizeProp = 'small' | 'middle' | 'large';

/*
 * DS-native input-number, expressed entirely with styled-components — antd's InputNumber component
 * and its base component LESS are gone. The kept class-name hooks (ui-tests / interim external CSS)
 * live on the elements only via the component's className attributes, never as styling selectors
 * here. State (error / focus / disabled / size) is driven by transient `$`-props and the native
 * `:focus-within`; the steppers, value formatting and autosize live in the component/hook.
 */

const handlerGlyph = css<ThemeProps>`
  position: relative;
  flex: 1 1 50%;
  min-height: 0;
  cursor: pointer;
  user-select: none;

  /* Paint the arrow via a masked pseudo-element rather than masking the element
     itself — a mask on the element clips its OWN border too (mask-clip defaults to
     border-box), which erased HandlerDown's up/down divider. The pseudo carries the
     mask; the element keeps its (unmasked) border. Tint the glyph with a theme token
     so it follows the palette / dark mode instead of a colour baked into the SVG. */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: ${(props) => props.theme.palette['grey-600']};
    mask-repeat: no-repeat;
    mask-position: center;
    /* Explicit size (not 'cover') so the glyph stays centred at layout time and does not scale
       with the 21px-vs-24px handler-width difference between the normal and large sizes. */
    mask-size: 16px 16px;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    -webkit-mask-size: 16px 16px;
  }

  & > svg,
  & > i {
    display: none;
  }
`;

export const HandlerUp = styled.span<{ $disabled?: boolean } & ThemeProps>`
  ${handlerGlyph}
  &::before {
    mask-image: url('${ANGLE_UP_SVG}');
    -webkit-mask-image: url('${ANGLE_UP_SVG}');
  }
  ${(props) =>
    props.$disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.4;
    `}
`;

export const HandlerDown = styled.span<{ $disabled?: boolean } & ThemeProps>`
  ${handlerGlyph}
  &::before {
    mask-image: url('${ANGLE_DOWN_SVG}');
    -webkit-mask-image: url('${ANGLE_DOWN_SVG}');
  }
  /* antd parity: horizontal divider between the up and down steppers */
  border-top: 1px solid ${(props) => props.theme.palette['grey-300']};
  ${(props) =>
    props.$disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.4;
    `}
`;

export const HandlerWrap = styled.div<ThemeProps>`
  position: absolute;
  z-index: 3;
  top: 1px;
  right: 1px;
  width: 22px;
  height: 30px;
  display: flex;
  flex-direction: column;
  /* antd parity: divider line between the steppers and the input value */
  border-left: 1px solid ${(props) => props.theme.palette['grey-300']};
  /* antd parity: handlers are hidden until the field is hovered or focused */
  opacity: 0;
  transition: opacity 0.24s linear 0.1s;
`;

export const InputField = styled.input<
  { $autoResize?: AutoResizeProp } & ThemeProps
>`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 100%;
  text-align: left;
  /* Match ds-input's vertical text model — fill the root, 7px vertical padding, line-height 1 — so the
     text aligns with sibling inputs in an input group. The doubled && raises specificity to beat the
     leaked ds-input group rule (input { padding: 7px }) that applies via the bare element selector. */
  && {
    height: 100%;
    padding: ${(props) => (props.$autoResize ? '0' : '7px 11px')};
    line-height: 1;
  }
  color: inherit;
  /* native inputs don't inherit font-family — pull in the DS body font */
  font-family: inherit;
  font-size: 13px;
  /* tabular figures: every digit shares one advance width so the value doesn't
     jitter horizontally as it changes (e.g. while holding a stepper). */
  font-variant-numeric: tabular-nums;
  background: transparent;
  border: 0;
  outline: 0;
  transition: unset;

  &::placeholder {
    color: ${(props) => props.theme.palette['grey-500']};
  }

  &:focus {
    box-shadow: unset;
  }
`;

export const InputFieldWrap = styled.div<{ $size?: SizeProp }>`
  /* fill the root height so the input is a full 32px / 48px box like ds-input; keep the 2px horizontal
     inset (text/border gap) but no vertical inset, so the input's vertical model matches ds-input */
  height: 100%;
  margin: 0 2px;
`;

export const Addon = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  padding: 0 12px;
  background-color: ${(props) => props.theme.palette['grey-050']};
  border: 1px solid ${(props) => props.theme.palette['grey-300']};

  &:first-child {
    border-radius: 3px 0 0 3px;
    border-right-width: 0;
  }
  &:last-child {
    border-radius: 0 3px 3px 0;
    border-left-width: 0;
  }
`;

export const Group = styled.div`
  display: inline-flex;
  width: 100%;
  vertical-align: top;
`;

export const GroupWrapper = styled.div`
  /* antd parity: antd's .ant-input-number-group-wrapper is display: inline-block,
     so a prefixed/suffixed input-number shrinks to its content (input's intrinsic
     width + addon) instead of stretching to fill the parent. block made every
     addon field expand to the full slot width (all fields ending at the same
     right edge); inline-block restores the content-sized, left-aligned box. */
  display: inline-block;
`;

export const InputNumberRoot = styled.div<
  {
    $error?: boolean;
    $disabled?: boolean;
    $size?: SizeProp;
    $hasPrefix?: boolean;
    $hasSuffix?: boolean;
  } & ThemeProps
>`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: ${(props) => (props.$size === 'large' ? '48px' : '32px')};
  line-height: 1.38;
  color: ${(props) => props.theme.palette['grey-700']};
  background: ${(props) =>
    props.$error ? props.theme.palette['red-050'] : props.theme.palette.white};
  border: 0;
  /* Square the corners that butt against a prefix/suffix addon so the input's
     inset-box-shadow border meets the addon's square edge flush (no rounded
     notch). Shorthand order: top-left top-right bottom-right bottom-left. */
  border-radius: ${(props) =>
    `${props.$hasPrefix ? '0' : '3px'} ${props.$hasSuffix ? '0' : '3px'} ${
      props.$hasSuffix ? '0' : '3px'
    } ${props.$hasPrefix ? '0' : '3px'}`};
  box-shadow: ${(props) =>
    props.$error
      ? `inset 0px 0px 0px 2px ${props.theme.palette['red-600']}`
      : `inset 0px 0px 0px 1px ${props.theme.palette['grey-300']}`};

  &:focus-within {
    box-shadow: ${(props) =>
      props.$error
        ? `inset 0px 0px 0px 2px ${props.theme.palette['red-600']}`
        : `inset 0px 0px 0px 2px ${props.theme.palette['blue-600']}`};
    /* Match ds-input's focus: light-blue tint behind the value (red-050 stays
       for the error state so its red background isn't overridden on focus). */
    background: ${(props) =>
      props.$error
        ? props.theme.palette['red-050']
        : props.theme.palette['blue-050']};
  }

  /* hover border matches ds-input (grey-400); skip when error/disabled/focused
     so their own borders win */
  ${(props) =>
    !props.$error &&
    !props.$disabled &&
    css`
      &:hover:not(:focus-within) {
        box-shadow: inset 0px 0px 0px 1px ${props.theme.palette['grey-400']};
      }
    `}

  /* reveal the steppers on hover / focus (antd parity) */
  &:hover ${HandlerWrap}, &:focus-within ${HandlerWrap} {
    opacity: 1;
  }

  /* focused / error tighten the handler-wrap onto the 2px inset border */
  &:focus-within ${HandlerWrap} {
    width: 21px;
    height: 28px;
    top: 2px;
    right: 2px;
  }

  ${(props) =>
    props.$error &&
    css`
      ${HandlerWrap} {
        width: 21px;
        height: 28px;
        top: 2px;
        right: 2px;
      }
    `}

  ${(props) =>
    props.$size === 'large' &&
    css`
      ${HandlerWrap} {
        width: 24px;
        height: 44px;
      }
      &:focus-within ${HandlerWrap} {
        height: 44px;
      }
    `}

  ${(props) =>
    props.$disabled &&
    css`
      cursor: not-allowed;
      background: ${props.theme.palette['grey-050']};
      ${InputField} {
        cursor: not-allowed;
        color: ${props.theme.palette['grey-400']};
      }
    `}
`;

export const InputNumberWrapper = styled.div`
  display: block;
`;

export const InputNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
`;

export const InputNumberAutosize = styled.div<{ $autoResize?: AutoResizeProp }>`
  ${(props) => css`
    ${InputNumberRoot} {
      width: ${props.$autoResize ? '100%' : '200px'};
      ${autoresizeConfObjToCss({
        autoResize: props.$autoResize,
        boxSizing: 'border-box',
      })};
      grid-area: 1 / 1;
    }
  `}

  ${InputField} {
    text-indent: 4px;
    letter-spacing: normal;
    /* Keep the base InputField's tabular figures here too. The autosize sizer
       mirrors font-variant-numeric (see ds-input useAutosizeWidth), so tabular
       digits are measured tabular — no clipping. */
    font-variant-numeric: tabular-nums;
  }
`;
