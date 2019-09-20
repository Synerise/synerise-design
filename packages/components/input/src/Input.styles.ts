import styled from 'styled-components';
import BaseAntInput from 'antd/lib/input';

const errorInputStyle = (props): string => `
  && {
    border-color: ${props.theme.palette['red-600']};
    box-shadow: inset 0 0 0 1px ${props.theme.palette['red-600']};
    background: ${props.theme.palette['red-050']};
  }
`;

export const AntdInput = styled(BaseAntInput)`
  ${(props): string => props.error && errorInputStyle(props)}
`;

export const AntdTextArea = styled(BaseAntInput.TextArea)`
  ${(props): string => props.error && errorInputStyle(props)}
`;

export const ContentBelow = styled.div`
  margin-top: 8px;
`;

export const ErrorText = styled.div`
  color: ${(props): string => props.theme.palette['red-600']};
`;

export const Label = styled.label`
  color: ${(props): string => props.theme.palette['grey-800']};
  font-weight: 600;
  display: block;
`;

export const Counter = styled.div`
  font-weight: 600;
`;

export const Description = styled.div`
  color: ${(props): string => props.theme.palette['grey-500']};
`;

export const ContentAbove = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;
