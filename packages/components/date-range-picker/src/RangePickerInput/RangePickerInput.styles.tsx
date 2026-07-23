import styled, { css } from 'styled-components';

import { InputWrapper } from '@synerise/ds-input/dist/InputMultivalue/InputMultivalue.styles';

export const Container = styled.div``;

// Icons inherit color via currentColor — set color on the wrapper, not svg { fill }.
// Clear (✕) icon is a danger action — no --ds-form-* token, use semantic icon-danger.
export const ClearIconWrapper = styled.div`
  margin-left: 3px;
  color: var(--ds-color-icon-danger-default);
  &:hover {
    color: var(--ds-color-icon-danger-default);
  }
`;

// Default calendar icon — adopts --ds-form-icon-color-* by role.
// ⚑ Shift: hover grey-600→grey-400.
export const DefaultIconWrapper = styled.div`
  margin-left: 3px;
  color: var(--ds-form-icon-color-default);
  &&:hover {
    color: var(--ds-form-icon-color-hover);
  }
`;

export const DateWrapper = styled.div`
  color: var(--ds-form-field-text-placeholder);
`;
// Selected date value text. ⚑ Shift: grey-600→grey-700 (field-text-value).
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
