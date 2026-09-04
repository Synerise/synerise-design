import styled from 'styled-components';

import Button, { type StyledButton } from '@synerise/ds-button';

export const TabsContainer = styled.div<{
  block?: boolean;
  $topPadding?: number;
}>`
  padding-top: ${({ $topPadding }): number => $topPadding ?? 8}px;
  display: flex;
  flex-direction: row;
  align-items: ${(props): string | false =>
    props.block ? `center` : `flex-end`};
  justify-content: flex-start;
  max-width: 100%;
  overflow-x: hidden;
  margin-bottom: -1px;
`;

export const TabsDropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: var(--ds-color-background-base-default);
  opacity: 1;
  padding: 8px;
`;

export const TabsDropdownDivider = styled.div`
  margin: 7.5px 0;
  height: 1px;
  width: 100%;
  box-sizing: content-box;
  background-image: linear-gradient(
    to right,
    var(--ds-color-background-base-default) 66%,
    var(--ds-color-border-base-strong) 34%
  );
  background-position: top;
  background-size: 5px 1px;
  background-repeat: repeat-x;
`;

export const ShowHiddenTabsTrigger: StyledButton = styled(Button)`
  margin-bottom: 4px;
`;

export const HiddenTabs = styled.div`
  position: absolute;
  display: flex;
  visibility: hidden;
  pointer-events: none;
`;
