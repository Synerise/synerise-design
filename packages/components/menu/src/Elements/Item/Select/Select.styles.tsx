import styled from 'styled-components';
import * as React from 'react';
import { SuffixWraper } from '../Text/Text.styles';
import Text from '../Text/Text';


// eslint-disable-next-line import/prefer-default-export
export const SelectItem = styled(({ children, disabled, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Text disabled={disabled} tabIndex={-1} {...rest}>
    {children}
  </Text>
))
  // Safari doesn't support animating opacity yet, therefore I am using filter property to simulate fading
  `
  & {
    ${SuffixWraper} > * {
      filter: opacity(0); 
      transition: filter 0.3s ease-in-out, color 0.3s ease-in-out;
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
