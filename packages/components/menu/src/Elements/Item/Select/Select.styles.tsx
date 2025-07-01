import React from 'react';
import styled from 'styled-components';

import Text from '../Text/Text';
import { SuffixWraper } from '../Text/Text.styles';

export const SelectItem = styled(({ children, disabled, ...rest }) => (
  <Text disabled={disabled} {...rest}>
    {children}
  </Text>
))`
  // Safari doesn't support animating opacity yet, therefore I am using filter property to simulate fading
  & {
    ${SuffixWraper} > * {
      filter: opacity(0);
      transition:
        filter 0.3s ease-in-out,
        color 0.3s ease-in-out;
    }
  }
  &:hover,
  &:focus {
    ${SuffixWraper} > * {
      filter: opacity(100%);
      color: ${(props): string => props.theme.palette['blue-600']};
    }
  }
`;
