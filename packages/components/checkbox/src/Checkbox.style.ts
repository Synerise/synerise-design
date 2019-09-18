import styled from 'styled-components';
import BaseAntCheckbox from 'antd/lib/checkbox';

export const AntdCheckbox = styled(BaseAntCheckbox)``;

export const Description = styled.div`
  color: ${(props): string => props.theme.palette['grey-600']};
  ${(props): string => props.disabled && `opacity: 0.4;`}
`;

export const AdditionalData = styled.div`
  margin-left: 32px;
  margin-top: 4px;
`;

export const ErrorText = styled.div`
  color: ${(props): string => props.theme.palette['red-600']};
  margin-bottom: 4px;
`;

export const CheckboxWrapper = styled.div``;
