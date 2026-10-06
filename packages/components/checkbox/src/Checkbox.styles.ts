import styled, { css } from 'styled-components';

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
  background-color: var(--ds-form-checkbox-bg-default);
  border: 1px solid var(--ds-form-checkbox-border-color-default);
  border-radius: 3px;

  /* checked — tick shown; colour flows to the SVG via currentColor */
  ${(props) =>
    props.$checked &&
    css`
      background-color: var(--ds-form-checkbox-bg-selected);
      border-color: var(--ds-form-checkbox-bg-selected);
      color: var(--ds-color-text-base-onsolid);

      ${CheckIcon} {
        opacity: 1;
      }
    `}

  /* indeterminate — horizontal bar */
  ${(props) =>
    props.$indeterminate &&
    css`
      background-color: var(--ds-form-checkbox-bg-selected);
      border-color: var(--ds-form-checkbox-border-color-blocked);

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
        background: var(--ds-color-background-base-default);
        border-radius: 2px;
        transform: translate(-50%, -50%);
      }
    `}

  /* error border */
  ${(props) =>
    props.$error &&
    css`
      border-color: var(--ds-form-checkbox-border-color-error);
      border-width: 2px;
    `}
  ${(props) =>
    props.$error &&
    props.$checked &&
    css`
      border-color: var(--ds-form-checkbox-bg-selected);
    `}

  /* disabled — bg/border use the blocked module tokens (see flag: currently mis-valued blue) */
  ${(props) =>
    props.$disabled &&
    css`
      border-color: var(--ds-form-checkbox-border-color-blocked) !important;
      background-color: var(--ds-form-checkbox-bg-blocked) !important;

      ${
        props.$checked &&
        css`
        color: var(--ds-color-icon-base-muted);
      `
      }
    `}
`;

export const CheckboxText = styled.span<{
  $checked?: boolean;
  $disabled?: boolean;
}>`
  margin: 0;
  padding-left: 12px;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) =>
    props.$checked
      ? 'var(--ds-form-checkbox-text-label-selected)'
      : 'var(--ds-form-checkbox-text-label-default)'};

  ${(props) =>
    props.$disabled &&
    css`
      color: var(--ds-form-checkbox-text-label-disabled);
      opacity: var(--ds-form-checkbox-disabled-opacity);
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

  &:hover ${CheckboxText} {
    color: var(--ds-form-checkbox-text-label-hover);
  }

  /* hover preview of the tick on an unchecked, enabled box */
  ${(props) =>
    !props.$checked &&
    !props.$indeterminate &&
    !props.$disabled &&
    css`
      &:hover ${CheckboxInner} {
        border-color: var(--ds-form-checkbox-border-color-hover);
        color: var(--ds-color-icon-brand-default);

        ${CheckIcon} {
          opacity: 1;
        }
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
    border-color: var(--ds-form-checkbox-border-color-focused);
    box-shadow: inset 0 0 0 1px var(--ds-form-checkbox-border-color-focused);
  }
  ${(props) =>
    props.$error &&
    css`
      ${CheckboxInput}:focus + ${CheckboxInner} {
        box-shadow: 0 0 0 1px var(--ds-form-checkbox-border-color-error);
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
