import styled, { css } from 'styled-components';

import {
  Description as BaseDescription,
  ErrorText as BaseErrorText,
} from '@synerise/ds-typography';

const soloCss = css`
  padding: 4px;
`;

export const CheckboxWrapper = styled.div<{ withoutPadding: boolean }>`
  display: flex;
  padding: ${(props) => (props.withoutPadding ? '0' : '4px 12px 8px 8px')};
  flex-direction: column;
`;

export const AdditionalData = styled.div`
  margin: 2px 12px 0px 28px;
`;

export const ErrorText = styled(BaseErrorText)`
  color: var(--ds-form-error-text-color);
`;

export const Description = styled(BaseDescription)`
  color: var(--ds-form-description-text-color);
`;

/*
 * DS-native checkbox visual, expressed entirely with styled-components — the `ant-checkbox*` /
 * `ds-checkbox-*` class names live on the elements only as hooks (ui-tests / interim external CSS),
 * never as styling selectors. State (checked / indeterminate / disabled / error) is driven by
 * transient `$`-props the component passes in; cross-element rules (hover preview, focus ring) live
 * on `CheckboxLabel` and reference the child styled-components.
 */

export const CheckboxInput = styled.input`
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

export const CheckIcon = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;

  path {
    fill: currentColor;
    stroke: currentColor;
  }
`;

export const CheckboxInner = styled.span<{
  $checked?: boolean;
  $indeterminate?: boolean;
  $disabled?: boolean;
  $error?: boolean;
}>`
  position: relative;
  display: block;
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  background-color: var(--ds-form-control-bg-default);
  border: 1px solid var(--ds-form-control-border-default);
  border-radius: 3px;

  /* checked — tick shown; colour flows to the SVG via currentColor */
  ${(props) =>
    props.$checked &&
    css`
      background-color: var(--ds-form-control-bg-selected);
      border-color: var(--ds-form-control-bg-selected);
      color: var(--ds-form-control-icon-selected);

      ${CheckIcon} {
        opacity: 1;
      }
    `}

  /* indeterminate — horizontal bar */
  ${(props) =>
    props.$indeterminate &&
    css`
      background-color: var(--ds-form-control-bg-selected);
      border-color: var(--ds-form-control-bg-selected);

      ${CheckIcon} {
        opacity: 0;
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 2px;
        background: var(--ds-form-control-icon-selected);
        border-radius: 2px;
        transform: translate(-50%, -50%);
      }
    `}

  /* error border */
  ${(props) =>
    props.$error &&
    css`
      border-color: var(--ds-form-control-border-error);
      border-width: 2px;
    `}
  ${(props) =>
    props.$error &&
    props.$checked &&
    css`
      border-color: var(--ds-form-control-bg-selected);
    `}

  ${(props) =>
    props.$disabled &&
    css`
      opacity: var(--ds-opacity-disabled);
    `}
`;

export const CheckboxText = styled.span<{
  $disabled?: boolean;
}>`
  margin: 0;
  padding-left: 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ds-form-label-text-color);

  ${(props) =>
    props.$disabled &&
    css`
      opacity: var(--ds-opacity-disabled);
    `}
`;

export const CheckboxBox = styled.span`
  position: relative;
  top: 0;
  display: inline-flex;
  flex: none;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label<{
  $solo?: boolean;
  $checked?: boolean;
  $indeterminate?: boolean;
  $disabled?: boolean;
  $error?: boolean;
}>`
  display: flex;
  align-items: center;
  line-height: 1;
  margin: 0;
  cursor: pointer;
  ${(props) => props.$solo && soloCss};

  ${(props) =>
    !props.$checked &&
    !props.$indeterminate &&
    !props.$disabled &&
    css`
      &:hover ${CheckboxInner} {
        border-color: var(--ds-form-control-border-hover);
      }
    `}

  /* hover deepens the indeterminate fill */
  ${(props) =>
    props.$indeterminate &&
    css`
      &:hover ${CheckboxInner} {
        background-color: var(--ds-color-background-brand-solidhover);
      }
    `}

  /* keyboard focus ring */
  ${CheckboxInput}:focus + ${CheckboxInner} {
    border-color: var(--ds-form-control-border-focus);
    box-shadow: inset 0 0 0 1px var(--ds-form-control-border-focus);
  }
  ${(props) =>
    props.$error &&
    css`
      ${CheckboxInput}:focus + ${CheckboxInner} {
        box-shadow: 0 0 0 1px var(--ds-form-control-border-error);
      }
    `}

  ${(props) =>
    props.$disabled &&
    css`
      cursor: not-allowed;

      ${CheckboxBox}, ${CheckboxInput} {
        cursor: not-allowed;
      }
    `}
`;
