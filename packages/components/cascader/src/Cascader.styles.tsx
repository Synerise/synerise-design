import styled from 'styled-components';
import Scrollbar from '@synerise/ds-scrollbar';

export const InputWrapper = styled.div`
  box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.05);
`;
export const Dropdown = styled.div<{ visible?: boolean; maxHeight?: number }>`
  display: ${(props): string => (!props.visible ? 'none' : 'block')};
  width: 100%;
  background: ${(props): string => props.theme.palette.white};
  border-radius: 0 0 3px 3px;
  padding: 8px 0 8px 8px;
  box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.05);
  z-index: 10;
  ${(props): string | false => !!props.maxHeight && `max-height:${props.maxHeight}px;`}
`;
export const DropdownScroll = styled(Scrollbar)<{ searching?: boolean }>`
  padding-right: ${(props): string => (props.searching ? `0` : '8px')};
`;
export const Wrapper = styled.div`
`;
export const BreadcrumbPrefix = styled.div``;
export const DividerContainer = styled.div`
  padding: 8px;
`;
