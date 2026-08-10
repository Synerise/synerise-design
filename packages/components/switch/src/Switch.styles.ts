import styled from 'styled-components';

import { FormFieldLabel } from '@synerise/ds-form-field';
import { macro } from '@synerise/ds-typography';

import { Toggle } from './RawSwitch.styles';

export const SwitchWrapper = styled.div<{ formElementMargin: boolean }>`
  display: flex;
  gap: 3px 0;
  flex-direction: column;
  justify-content: space-between;
  ${(props) => (props.formElementMargin ? 'margin: 0 0 16px 0' : '')};
`;

export const Texts = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Label = styled(FormFieldLabel)`
  ${macro.heading};
  color: var(--ds-color-text-base-subtle);
  cursor: pointer;
  transition: 0.3s ease;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const BelowLabel = styled.div``;

// Label colour reacts to the adjacent switch state (was the antd `.ant-switch + .switch-texts` mixin).
export const LabelSwitchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  ${Toggle}:hover:not(:disabled) + ${Texts} ${Label} {
    color: var(--ds-form-switch-text-label);
  }

  ${Toggle}:disabled + ${Texts} ${Label} {
    color: var(--ds-color-text-base-muted);
    opacity: var(--ds-form-switch-disabled-opacity);
  }
`;

export const Error = styled.div`
  color: var(--ds-form-switch-text-error);
  margin-bottom: 4px;
`;

export const Description = styled.div`
  color: var(--ds-form-switch-text-description);
  transition: 0.3s ease;
`;

export const DescriptionWrapper = styled.div`
  justify-content: space-between;
  padding-left: 28px;
`;
