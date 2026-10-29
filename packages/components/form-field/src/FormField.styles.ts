import styled from 'styled-components';

import {
  Description as BaseDescription,
  ErrorText as BaseErrorText,
  Label,
  macro,
} from '@synerise/ds-typography';

export const FormFieldWrapper = styled.div<{ hasContent?: boolean }>`
  ${(props) =>
    props.hasContent &&
    `display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: stretch;
      justify-content: flex-start;
    `}
`;

export const ErrorText = styled(BaseErrorText)`
  margin: 0;
  color: var(--ds-form-error-text-color);
`;

export const Description = styled(BaseDescription)`
  color: var(--ds-form-description-text-color);
`;

export const FormFieldLabelWrapper = styled(Label)`
  ${macro.heading};
  color: var(--ds-form-label-text-color);
  height: 17px;
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const IconWrapper = styled.span`
  display: inline-block;
  color: var(--ds-form-label-icon-color);
  margin-top: -1px;
`;

export const FormFieldComponent = styled.div``;

export const ContentAbove = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 18px;
`;

export const ContentBelow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const RightSide = styled.div`
  font-weight: 500;
  flex: 1 0 auto;
  text-align: end;
  color: var(--ds-form-field-text-counter);
`;
