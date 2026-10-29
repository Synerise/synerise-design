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
  color: var(--ds-form-label-text-color);
  cursor: pointer;
  transition: 0.3s ease;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const BelowLabel = styled.div``;

// The label fades with the adjacent disabled switch; its colour stays --ds-form-label-text-color.
export const LabelSwitchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  ${Toggle}:disabled + ${Texts} ${Label} {
    opacity: var(--ds-opacity-disabled);
  }
`;

export const Error = styled.div`
  color: var(--ds-form-error-text-color);
  margin-bottom: 4px;
`;

export const Description = styled.div<{ $disabled?: boolean }>`
  color: var(--ds-form-description-text-color);
  transition: 0.3s ease;
  ${(props) => props.$disabled && 'opacity: var(--ds-opacity-disabled);'}
`;

export const DescriptionWrapper = styled.div`
  justify-content: space-between;
  padding-left: 28px;
`;
