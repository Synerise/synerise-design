import styled from 'styled-components';

import { CheckboxIndicator } from '@synerise/ds-checkbox';

export const Indicator = styled(CheckboxIndicator)``;

// A non-leading `&` compiles to the static component id, shared by every instance, so the hover
// state is keyed on the button's aria-checked rather than on props.
export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  .ds-button[aria-checked='false']:not([disabled]):hover & ${Indicator} {
    border-color: var(--ds-form-control-border-hover);
  }

  .ds-button[aria-checked='mixed']:not([disabled]):hover & ${Indicator} {
    background-color: var(--ds-color-background-brand-solidhover);
  }
`;

export default { IconWrapper };
