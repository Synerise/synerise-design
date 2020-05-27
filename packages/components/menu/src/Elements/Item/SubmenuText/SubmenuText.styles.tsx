import styled from 'styled-components';
import * as React from 'react';
import { ContentWrapper } from '../Text/Text.styles';
import Text from '../Text/Text';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = (): void=>{};
// eslint-disable-next-line import/prefer-default-export
export const SubmenuText = styled(({ children, disabled, childrenCollapsed, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Text {...rest} onItemHover={NOOP} onClick={NOOP} tabIndex={-1}>
    {children}
  </Text>
))`
  &&& {
    padding: 0;
    &:focus:active {
      background-color: ${(props): string => props.theme.palette['grey-050']};
    }
  }
  & {
    ${ContentWrapper} {
      padding: 0;
    }
  }
`;
