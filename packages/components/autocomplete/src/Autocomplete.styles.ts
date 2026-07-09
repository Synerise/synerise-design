import styled, { css } from 'styled-components';

import { type AutoResizeProp } from '@synerise/ds-input';

import { ICON_GAP, ICON_OFFSET } from './Autocomplete.const';
import { getIconsWidth } from './utils/getIconsWidth';

const baseTransition = css`
  transition:
    ease-in-out all 0.2s,
    width 0s,
    min-width 0s,
    max-width 0s;
`;

const active = () => css`
  ${baseTransition};
  box-shadow: inset 0 0 0 1px ${(props) => props.theme.palette['blue-600']};
  border: 1px solid ${(props) => props.theme.palette['blue-600']};
  background-color: ${(props) => props.theme.palette['blue-050']};
`;

const errorStyle = () => css`
  ${baseTransition};
  box-shadow: inset 0 0 0 1px ${(props) => props.theme.palette['red-600']};
  background: ${(props) => props.theme.palette['red-050']};
  border: 1px solid ${(props) => props.theme.palette['red-600']};
`;

const readonly = () => css`
  background-color: ${(props) => props.theme.palette.white};
  color: ${(props) => props.theme.palette['grey-700']};
  cursor: auto;
`;

export const InputContainer = styled.div<{ autoResize?: AutoResizeProp }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  /* autoResize: content-sized (inline-flex) — the autosize hook writes an inline
     width, and because the box is content-sized that width propagates as the
     flex-basis to layout-balancing parents (e.g. Condition). stretchToFit adds a
     PERCENTAGE max-width so the box can never exceed its containing block (the
     flex-allocated slot, already inside any parent padding). A percentage
     max-width is ignored when computing max-content, so the flex-basis stays the
     content width — no circular measurement, no JS, no settling. The min-width
     floor keeps a sensible minimum. non-autoResize: fill the 200px wrapper. */
  width: ${(props) => (props.autoResize ? 'auto' : '100%')};
  ${(props) => {
    const ar = props.autoResize;
    if (!ar || ar === true) {
      return '';
    }
    let maxWidth = '';
    if (ar.maxWidth) {
      maxWidth = `max-width: ${ar.maxWidth};`;
    } else if (ar.stretchToFit) {
      maxWidth = 'max-width: 100%;';
    }
    return css`
      min-width: ${ar.minWidth};
      ${maxWidth}
    `;
  }}
`;

export const NativeInput = styled.input<{
  iconCount?: number;
}>`
  /* The input just fills the InputContainer (which owns the autosize width /
     min / max-width); it's always a plain 32px border-box box. */
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  margin: 0;
  /* Own the padding with doubled specificity so a leaked descendant rule
     (e.g. ds-input OuterWrapper's \`input { padding: 7px 12px }\` when the
     autocomplete sits inside a ds-input InputGroup, as in Factors) cannot
     override it and clobber the icon gutter / vertical box model. */
  && {
    padding: 0 10px;
    padding-right: ${(props) =>
      `${getIconsWidth(props.iconCount || 0) + 10}px`};
  }
  border: 1px solid ${(props) => props.theme.palette['grey-300']};
  border-radius: 3px;
  background-color: ${(props) => props.theme.palette.white};
  color: ${(props) => props.theme.palette['grey-700']};
  /* inherit the DS body font — native inputs don't inherit font-family */
  font-family: inherit;
  font-size: 13px;
  line-height: 1.54;
  font-feature-settings: 'tnum';
  outline: none;
  ${baseTransition};

  &::placeholder {
    color: ${(props) => props.theme.palette['grey-500']};
  }

  &:hover:not(:disabled) {
    border-color: ${(props) => props.theme.palette['grey-400']};
  }

  &:disabled {
    background-color: ${(props) => props.theme.palette['grey-050']};
    color: ${(props) => props.theme.palette['grey-400']};
    cursor: not-allowed;
  }

  &:focus {
    ${active()};
    &:hover {
      ${active()};
    }
  }
`;

export const AutocompleteWrapper = styled.div<{ autoResize?: AutoResizeProp }>`
  /* Non-autoResize: fixed 200px (a consumer style={{ width }} overrides inline).
     autoResize: fill the slot so stretchToFit measures the true available width
     off this element; the InputContainer inside stays content-sized. */
  width: ${(props) => (props.autoResize ? '100%' : '200px')};
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: ${ICON_OFFSET}px;
  top: 0;
  display: flex;
  bottom: 0;
  align-items: center;
  gap: ${ICON_GAP}px;
  z-index: 5;
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${(props) => props.theme.palette['grey-600']};
  font-size: 15px;
  line-height: 1;
  cursor: pointer;
  z-index: 6;

  &:hover {
    color: ${(props) => props.theme.palette['grey-700']};
  }
`;

export const ComponentWrapper = styled.div<{
  error?: boolean;
  readOnly?: boolean;
  iconCount?: number;
}>`
  &&& {
    /* Block (not inline-block) so it fills the flex-allocated slot and becomes
       the InputContainer's containing block — the InputContainer's percentage
       max-width then clamps to the real available width, inside FormField
       padding. inline-block would shrink-wrap the content and break out. */
    ${(props) =>
      props.iconCount
        ? css`
            position: relative;
          `
        : ''};

    ${(props) => {
      if (props.readOnly) {
        return css`
          ${NativeInput} {
            ${readonly()};
            &:hover {
              ${readonly()};
            }
          }
        `;
      }
      if (props.error) {
        return css`
          ${NativeInput} {
            ${errorStyle()};
            &:hover {
              ${errorStyle()};
            }
          }
        `;
      }
      return '';
    }}
  }
`;
