import styled from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';

export const DefaultFallback = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${(props): string => props.theme.palette['grey-600']};
  background-color: ${(props): string => props.theme.palette['grey-050']};
`;
