import styled from 'styled-components';

import Scrollbar from '@synerise/ds-scrollbar';

export const InputWrapper = styled.div``;
export const SearchResults = styled.div<{ visible?: boolean }>`
  position: relative;
  display: ${(props) => (!props.visible ? 'none' : 'block')};
  width: 100%;
  background: var(--ds-color-background-base-default);
  border-radius: 0 0 3px 3px;
  padding: 8px 0 8px 8px;
  z-index: 10;
`;
export const CascaderScrollbar = styled(Scrollbar)<{ searching?: boolean }>`
  padding-right: ${(props) => (props.searching ? `0` : '8px')};
`;
export const Wrapper = styled.div`
  box-shadow: var(--ds-shadows-shadow-2);
`;
export const BreadcrumbPrefix = styled.div``;
export const DividerContainer = styled.div`
  padding: 8px;
`;
