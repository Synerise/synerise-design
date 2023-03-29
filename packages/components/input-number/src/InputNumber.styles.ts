import styled from 'styled-components';
import BaseAntInputNumber from 'antd/lib/input-number';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

export const InputNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
`;

export const AntdInputNumber = styled(BaseAntInputNumber)`
  color: ${(props): string => props.theme.palette['grey-700']};

  input,
  input:focus {
    ${(props: { error: boolean } & ThemeProps): string | false =>
      !!props.error &&
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
  color: ${(props: ThemeProps): string => props.theme.palette['grey-800']};
  font-weight: 500;
  display: block;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  .ds-icon > svg {
    margin-top: -1px;
    fill: ${(props): string => props.theme.palette['grey-400']};
  }
`;

export const Description = styled.div`
  color: ${(props: ThemeProps): string => props.theme.palette['grey-600']};
`;

export const ContentBelow = styled.div`
  margin-top: 8px;
`;

export const ErrorText = styled.div`
  color: ${(props: ThemeProps): string => props.theme.palette['red-600']};
  margin-bottom: 4px;
`;

export const Prefixel = styled.div`
  border: 1px solid ${(props: ThemeProps): string => props.theme.palette['grey-300']};
  border-radius: 3px 0 0 3px;
  border-right-width: 0;
`;

export const Suffixel = styled.div`
  border: 1px solid ${(props: ThemeProps): string => props.theme.palette['grey-300']};
  border-radius: 0 3px 3px 0;
  border-left-width: 0;
`;

export const InputNumberWrapper = styled.div<{ prefixel: boolean; suffixel: boolean }>`
  display: flex;
  align-items: center;

  ${Prefixel}, ${Suffixel} {
    background: ${(props: ThemeProps): string => props.theme.palette['grey-050']};
    display: flex;
    align-items: center;
    align-self: stretch;
    padding: 0 12px;
  }

  ${(props): false | string =>
    props.prefixel &&
    `
    ${AntdInputNumber} {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  `}

  ${(props): false | string =>
    props.suffixel &&
    `
    ${AntdInputNumber} {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  `}
`;
