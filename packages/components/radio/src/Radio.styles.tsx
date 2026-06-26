import styled, { css } from 'styled-components';

import { FormFieldLabel } from '@synerise/ds-form-field';
import { macro } from '@synerise/ds-typography';

export const RadioWrapper = styled.div`
  display: block;
  margin-bottom: 15px;
`;

export const Description = styled.div<{ disabled?: boolean }>`
  color: ${(props) => props.theme.palette['grey-600']};
  ${(props) => (props.disabled ? 'opacity: 0.4;' : '')}
  ${macro.small}
`;

export const Label = styled(FormFieldLabel)<{ disabled?: boolean }>`
  ${(props) => (props.disabled ? 'opacity: 0.4;' : '')}
`;

export const AdditionalData = styled.div`
  margin: 4px 8px 15px 28px;
`;

/*
 * DS-native radio-dot visual, expressed entirely with styled-components — the `ant-radio*` /
 * `ds-radio-*` class names live on the elements only as hooks (ui-tests / interim external CSS),
 * never as styling selectors. State (checked / disabled) is driven by transient `$`-props the
 * component passes in; cross-element rules (hover preview, focus ring) live on `RadioLabel` and
 * reference the child styled-components.
 */

export const RadioInput = styled.input`
  position: absolute;
  inset: 0;
  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
`;

export const RadioInner = styled.span<{
  $checked?: boolean;
  $disabled?: boolean;
}>`
  position: relative;
  display: block;
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.palette.white};
  border: 1px solid ${(props) => props.theme.palette['grey-300']};
  border-radius: 50%;

  &::after {
    content: '';
    position: absolute;
    /* Center the dot with auto margins (layout-time, stable) rather than
     * top/left:50% + translate(-50%,-50%): the translate centering is rounded
     * at the compositing stage and lands off-center on some platforms (Linux
     * Chromium in VR runs), unlike antd which centered via margins. The
     * transform is kept for the scale animation only. */
    inset: 0;
    margin: auto;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.palette['blue-600']};
    transform: scale(0);
    transition: transform 0.2s ease;
  }

  ${(props) =>
    props.$checked &&
    css`
      border-color: ${props.theme.palette['blue-600']};
      border-width: 2px;

      &::after {
        transform: scale(1);
      }
    `}

  ${(props) =>
    props.$disabled &&
    css`
      border-color: ${props.theme.palette['grey-200']} !important;
      background-color: ${props.theme.palette['grey-050']} !important;

      &::after {
        background-color: ${props.theme.palette['grey-400']};
      }
    `}
`;

export const RadioText = styled.span<{
  $checked?: boolean;
  $disabled?: boolean;
}>`
  flex-grow: 1;
  margin: 0 12px;
  padding: 0;
  font-weight: 500;
  color: ${(props) =>
    props.$checked
      ? props.theme.palette['grey-800']
      : props.theme.palette['grey-700']};

  ${(props) =>
    props.$disabled &&
    css`
      color: ${props.theme.palette['grey-600']};
      opacity: 0.4;
    `}
`;

export const RadioBox = styled.span`
  position: relative;
  top: 0;
  display: inline-flex;
  flex: none;
  height: 16px;
  cursor: pointer;
`;

export const RadioLabel = styled.label<{
  $checked?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: flex-start;
  /* antd's .ant-radio-wrapper carried a default 8px right margin (inter-radio spacing) — keep it */
  margin: 0 8px 0 0;
  cursor: pointer;
  white-space: normal;

  /* hover preview */
  ${RadioInput}:hover + ${RadioInner} {
    border-color: ${(props) => props.theme.palette['grey-400']};
  }

  /* keyboard focus ring (white centre once checked) */
  ${RadioInput}:focus + ${RadioInner} {
    border-color: ${(props) => props.theme.palette['blue-600']};
    background-color: ${(props) =>
      props.$checked
        ? props.theme.palette.white
        : props.theme.palette['blue-050']};
    border-width: 2px;
  }

  ${(props) =>
    props.$disabled &&
    css`
      cursor: not-allowed;

      ${RadioBox}, ${RadioInput} {
        cursor: not-allowed;
      }
    `}
`;

/*
 * Segmented `Radio.Button`. Each button owns its own styles (including the connected-border
 * `:first-child` / `:last-child` rules, which read its position among its siblings). `RadioGroupWrapper`
 * only lays the buttons out; it no longer styles them through `.ant-radio-button-*` selectors.
 */

export const RadioButtonInput = styled.input`
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
`;

const BUTTON_HEIGHT = { small: '24px', middle: '32px', large: '40px' } as const;

export const RadioButtonLabel = styled.label<{
  $checked?: boolean;
  $disabled?: boolean;
  $solid?: boolean;
  $size?: 'small' | 'middle' | 'large';
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => BUTTON_HEIGHT[props.$size ?? 'middle']};
  margin: 0;
  padding: 0 16px;
  color: ${(props) => props.theme.palette['grey-700']};
  background-color: ${(props) => props.theme.palette['grey-050']};
  border: 1px solid ${(props) => props.theme.palette['grey-300']};
  border-left-width: 0;
  cursor: pointer;

  &:first-child {
    border-left: 1px solid ${(props) => props.theme.palette['grey-300']};
    border-radius: 3px 0 0 3px;
  }
  &:last-child {
    border-radius: 0 3px 3px 0;
  }

  &:hover {
    background-color: ${(props) => props.theme.palette.white};
  }

  /*
   * Focus ring via an inset box-shadow (not a border-width bump) so the button keeps its 1px border
   * and doesn't change width when focused.
   */
  &:focus-within {
    border-color: ${(props) => props.theme.palette['blue-600']};
    box-shadow: inset 0 0 0 1px ${(props) => props.theme.palette['blue-600']};
    z-index: 2;
  }

  ${(props) =>
    props.$checked &&
    css`
      /* '&&' beats ':first-child' so the first checked button's left border is blue, not grey */
      && {
        color: ${props.theme.palette['blue-600']};
        border-color: ${props.theme.palette['blue-600']};
        box-shadow: -1px 0 0 0 ${props.theme.palette['blue-600']};
        z-index: 1;
      }
    `}

  ${(props) =>
    props.$disabled &&
    css`
      color: ${props.theme.palette['grey-700']};
      opacity: 0.4;
      cursor: not-allowed;

      ${RadioButtonInput} {
        cursor: not-allowed;
      }
    `}

  ${(props) =>
    props.$solid &&
    props.$checked &&
    !props.$disabled &&
    css`
      /* '&&' matches the checked block's specificity and, coming later, restores white text on the
         solid (blue) background — otherwise the checked block's blue 'color' would win. */
      && {
        color: ${props.theme.palette.white};
        background-color: ${props.theme.palette['blue-600']};
        border-color: ${props.theme.palette['blue-600']};

        &:hover {
          background-color: ${props.theme.palette['blue-500']};
          border-color: ${props.theme.palette['blue-500']};
          box-shadow: -1px 0 0 0 ${props.theme.palette['blue-500']};
        }
      }
    `}
`;

/**
 * The `Radio.Group` container. Lays out the children and owns the `fullWidth`/`big` layout.
 */
export const RadioGroupWrapper = styled.div<{
  fullWidth?: boolean;
  big?: boolean;
}>`
  /*
   * antd's '.ant-radio-group' is 'inline-block' (not flex): block-level radio wrappers stack
   * vertically, while inline-level segmented buttons flow horizontally on one line. 'fullWidth'
   * opts into 'display: flex' explicitly below.
   */
  display: inline-block;

  ${(props) =>
    props.fullWidth &&
    css`
      && {
        display: flex;
        width: 100%;

        ${RadioLabel}, ${RadioButtonLabel} {
          flex: 1;
          height: ${props.big ? '48px' : '32px'};
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
        }
      }
    `}
`;
