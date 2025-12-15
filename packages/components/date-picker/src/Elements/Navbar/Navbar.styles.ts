import styled from 'styled-components';

import Button, { type StyledButton } from '@synerise/ds-button';

export const NavButton: StyledButton = styled(Button)`
  .ds-icon > svg {
    fill: ${(props) => props.theme.palette['grey-600']};
  }
`;

export const ArrowPlaceholder = styled.div`
  width: 32px;
  height: 32px;
`;

export const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Text = styled.div`
  flex: 1;
  text-align: center;
  font-weight: 500;
  font-size: 13px;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid ${(props) => props.theme.palette['grey-200']};
  ${ArrowContainer}:first-of-type {
    ${NavButton}, ${ArrowPlaceholder} {
      margin-right: 8px;
    }
  }
  ${ArrowContainer}:last-of-type {
    ${NavButton}, ${ArrowPlaceholder} {
      margin-left: 8px;
    }
  }
`;

export const Link = styled.span`
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: ${(props) => props.theme.palette['blue-600']};
  }

  &:active {
    color: ${(props) => props.theme.palette['blue-600']};
  }
`;
