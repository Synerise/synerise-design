import styled from 'styled-components';

import { PopoverTrigger } from '@synerise/ds-popover';

export const DateRangePickerWrapper = styled.div``;
export const DateRangePickerOverlay = styled.div`
  background: ${(props) => props.theme.palette['white']};
  box-shadow: ${(props) => props.theme.variables['box-shadow-2']};
  border-radius: 3px;
  overflow: hidden;
  max-width: 700px;
  font-weight: unset; /// ???
`;

export const Container = styled.div`
  width: 636px;
  pointer-events: all;
  user-select: none;
`;

export const Separator = styled.div`
  margin: 0;
  border-top: 1px solid ${(props): string => props.theme.palette['grey-200']};
`;

export const Addon = styled.div<{ last?: boolean }>`
  ${(props): string | false =>
    !props.last &&
    `border-bottom: 1px solid ${props.theme.palette['grey-200']};`}
`;

export const PickerWrapper = styled.div``;
export const PickerTrigger = styled(PopoverTrigger)`
  display: block;
`;

export const OverlayContainer = styled.div<{ visible?: boolean }>`
  display: ${(props): string => (props.visible ? 'flex' : 'none')};
`;
