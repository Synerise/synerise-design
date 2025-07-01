import React from 'react';
import styled from 'styled-components';

import Text from '../Text/Text';
import { ContentWrapper } from '../Text/Text.styles';

const NOOP = (): void => {};
export const SubtitleItemWrapper = styled.ul`
  display: flex;
  flex: 1;
`;

export const SubmenuText = styled(
  ({ children, disabled, childrenCollapsed, ...rest }) => (
    <Text {...rest} disabled={disabled} onClick={NOOP} tabIndex={-1}>
      {children}
    </Text>
  ),
)`
  &&& {
    padding: 0;
    &:focus:active {
      background-color: ${(props): string => props.theme.palette['grey-050']};
    }
    display: flex;
    flex: 1;
  }
  & {
    ${ContentWrapper} {
      padding: 0;
    }
  }
`;
