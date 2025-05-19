import styled from 'styled-components';
import { ErrorText as BaseErrorText, Description as BaseDescription, Label, macro } from '@synerise/ds-typography';

export const FormFieldWrapper = styled.div<{ hasContent?: boolean }>`
  ${props =>
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
`;

export const Description = styled(BaseDescription)``;

export const FormFieldLabelWrapper = styled(Label)`
  ${macro.heading};
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
  color: ${(props): string => props.theme.palette['grey-400']};
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
  color: ${props => props.theme.palette['grey-500']};
`;
