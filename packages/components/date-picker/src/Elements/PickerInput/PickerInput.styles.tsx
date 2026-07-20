import styled, { css } from 'styled-components';

import { Input as DSInput, type StyledInput } from '@synerise/ds-input';

export const Prefixel = styled.div`
  border: 1px solid var(--ds-form-field-affix-border);
  border-radius: 3px 0 0 3px;
  border-right-width: 0;
`;

export const Suffixel = styled.div`
  border: 1px solid var(--ds-form-field-affix-border);
  border-radius: 0 3px 3px 0;
  border-left-width: 0;
`;

// Focus/active field state — adopts the --ds-form-field-* focus tokens.
const activeStyle = css`
  box-shadow: inset 0 0 0 1px var(--ds-form-field-border-focus);
  border-color: var(--ds-form-field-border-focus);
  background: var(--ds-form-field-bg-focus);
`;

export const Input: StyledInput<{ active: boolean }> = styled(DSInput)<{
  active: boolean;
}>`
  & {
    .ant-input {
      ${(props) => !props.autoResize && 'min-width: 150px'};
      ${(props) => !!props.active && activeStyle}
    }
  }
`;

export const PickerInputWrapper = styled.div<{
  prefixel: boolean;
  suffixel: boolean;
}>`
  display: flex;
  align-items: center;

  ${Prefixel}, ${Suffixel} {
    background: var(--ds-form-field-affix-bg);
    display: flex;
    align-items: center;
    align-self: stretch;
    padding: 0 12px;
  }

  ${(props): false | string =>
    props.prefixel &&
    `
    ${Input} input {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  `}

  ${(props): false | string =>
    props.suffixel &&
    `
    ${Input} input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  `}
`;

export const Container = styled.div`
  width: 100%;
`;
// Icons inherit color via currentColor — set color on the wrapper, not svg { fill }.
// Clear (✕) icon is a danger action — no --ds-form-* token, use semantic icon-danger.
export const ClearIconWrapper = styled.div`
  color: var(--ds-color-icon-danger-default);
  &&:hover {
    color: var(--ds-color-icon-danger-default);
  }
`;

// Default calendar icon — adopts --ds-form-icon-color-* by role.
// ⚑ Shift: default grey-400→grey-600, hover grey-600→grey-400 (the hover direction inverts —
//   the form convention lightens on hover, this field previously darkened).
export const DefaultIconWrapper = styled.div`
  color: var(--ds-form-icon-color-default);
  &&:hover {
    color: var(--ds-form-icon-color-hover);
  }
`;
