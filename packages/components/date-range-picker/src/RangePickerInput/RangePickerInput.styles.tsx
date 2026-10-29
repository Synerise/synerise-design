import styled, { css } from 'styled-components';

import { InputWrapper } from '@synerise/ds-input/dist/InputMultivalue/InputMultivalue.styles';

export const Container = styled.div``;

// Icons inherit color via currentColor — set color on the wrapper, not svg { fill }.
export const ClearIconWrapper = styled.div`
  margin-left: 3px;
  color: var(--ds-form-clear-icon);
  cursor: pointer;
  &:hover {
    color: var(--ds-form-clear-icon);
  }
`;

// Default calendar icon — default colour by form role, hover and cursor match ds-input's icons.
export const DefaultIconWrapper = styled.div`
  margin-left: 3px;
  color: var(--ds-form-icon-color-default);
  cursor: pointer;
  &&:hover {
    color: var(--ds-color-icon-brand-default);
  }
`;

// `highlight` marks the placeholder of the date the user picks next.
export const DateWrapper = styled.div<{ highlight?: boolean }>`
  color: ${(props) =>
    props.highlight
      ? 'var(--ds-form-field-text-active)'
      : 'var(--ds-form-field-text-placeholder)'};
`;
export const DateValue = styled.div`
  color: var(--ds-form-field-text-value);
`;

export const RangeInputWrapper = styled(InputWrapper)<{
  error?: boolean;
  focus?: boolean;
  disabled?: boolean;
  hover?: boolean;
  active?: boolean;
}>`
  display: flex;
  align-items: center;
  & {
    opacity: 1;
    padding: 2px 8px 2px 12px;
  }
  ${(props) =>
    props.disabled &&
    css`
      && {
        background: var(--ds-form-field-bg-disabled);
        color: var(--ds-form-field-text-disabled);
      }
      ${DateWrapper},
      ${DateValue} {
        color: var(--ds-form-field-text-disabled);
      }
      ${DefaultIconWrapper} {
        opacity: var(--ds-opacity-disabled);
      }
    `}
`;
export const IconSeparator = styled.div`
  display: flex;
  flex: 1;
`;
export const SuffixWrapper = styled.div``;
