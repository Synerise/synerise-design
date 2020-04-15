import styled from 'styled-components';

export const ColorBox = styled.div<{color: string}>`
  width: 100%;
  height: 20px;
  background-color: ${(props): string => props.color};
`;

export const ColorName = styled.span`
  font-weight: 600;
  font-size: 11px;
  margin: 16px 0 8px;
  color: ${(props): string => props.theme.palette['grey-600']};
`;

export const ColorHex = styled.span`
  font-weight: normal;
  font-size: 10px;
  line-height: 1.25;
  color: ${(props): string => props.theme.palette['grey-600']};
`;
