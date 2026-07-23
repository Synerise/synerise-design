import styled from 'styled-components';

import { PopoverTrigger } from '@synerise/ds-popover';

export const DateRangePickerWrapper = styled.div``;
export const DateRangePickerOverlay = styled.div`
  background: var(--ds-dropdown-bg);
  box-shadow: var(--ds-dropdown-shadow);
  border-radius: 3px;
  overflow: hidden;
  overflow-y: auto;
  max-width: 700px;
  max-height: 100vh;
  font-weight: unset; /// ???
`;

export const Container = styled.div`
  width: 636px;
  pointer-events: all;
  user-select: none;
`;

export const Separator = styled.div`
  margin: 0;
  border-top: 1px solid var(--ds-color-border-base-default);
`;

export const Addon = styled.div<{ last?: boolean }>`
  ${(props): string | false =>
    !props.last &&
    `border-bottom: 1px solid var(--ds-color-border-base-default);`}
`;

export const PickerWrapper = styled.div``;
export const PickerTrigger = styled(PopoverTrigger)`
  && {
    display: block;
  }
`;

export const OverlayContainer = styled.div<{ visible?: boolean }>`
  display: ${(props): string => (props.visible ? 'flex' : 'none')};
`;
