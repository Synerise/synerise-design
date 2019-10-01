import styled from 'styled-components';
import BaseAntInputNumber from 'antd/lib/input-number';

export const AntdInputNumber = styled(BaseAntInputNumber)`
  color: ${(props): string => props.theme.palette['grey-700']};

  input {
    ${(props): string =>
      props.error &&
      `
      background: ${props.theme.palette['red-050']};
      border: 0;
    `};
  }
`;

export const ContentAbove = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const Label = styled.label`
  color: ${(props): string => props.theme.palette['grey-800']};
  font-weight: 500;
  display: block;
`;

export const Description = styled.div`
  color: ${(props): string => props.theme.palette['grey-500']};
`;

export const ContentBelow = styled.div`
  margin-top: 8px;
`;

export const ErrorText = styled.div`
  color: ${(props): string => props.theme.palette['red-600']};
  margin-bottom: 4px;
`;
