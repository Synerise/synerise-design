import styled from 'styled-components';
import * as React from 'react';
import { SuffixWraper } from '../Text/Text.styles';
import Text from '../Text/Text';

// eslint-disable-next-line import/prefer-default-export
export const SelectItem = styled(({ children, disabled, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Text disabled={disabled} {...rest}>
    {children}
  </Text>
))`
  & {
    ${SuffixWraper} > * {
      opacity:0;
      transition: opacity 0.3s ease, color 0.3s ease;
    }
  }
  &:hover , &:focus {
    ${SuffixWraper} > * {
    opacity:1;
      color: ${(props): string => props.theme.palette['blue-600']};
    }
  }
`;
