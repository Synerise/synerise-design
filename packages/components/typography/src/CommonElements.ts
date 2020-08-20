import styled, { css, FlattenInterpolation } from 'styled-components';
import { h200, h300, h400, h700, h500, h600 } from './style/macro-utils';

export const Description = styled.div<{ disabled?: boolean }>`
  color: ${(props): string => props.theme.palette['grey-600']};
  ${(props): string => (props.disabled ? `opacity: 0.4;` : '')}
`;

export const ErrorText = styled.div`
  color: ${(props): string => props.theme.palette['red-600']};
  margin-bottom: 4px;
`;

export const Label = styled.label`
  color: ${(props): string => props.theme.palette['grey-800']};
  font-weight: 500;
  display: block;
  cursor: pointer;
`;

export const H1 = styled.h1`
  ${(): FlattenInterpolation<any> => css`
    ${h700};
  `}
`;

export const H2 = styled.h1`
  ${(): FlattenInterpolation<any> => css`
    ${h600};
  `}
`;

export const H3 = styled.h1`
  ${(): FlattenInterpolation<any> => css`
    ${h500};
  `}
`;

export const H4 = styled.h1`
  ${(): FlattenInterpolation<any> => css`
    ${h400};
  `}
`;

export const H5 = styled.h1`
  ${(): FlattenInterpolation<any> => css`
    ${h300};
  `}
`;

export const H6 = styled.h1`
  ${(): FlattenInterpolation<any> => css`
    ${h200};
  `}
`;
