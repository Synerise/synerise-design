import styled from 'styled-components';
import Scrollbar from '@synerise/ds-scrollbar';

export const InputWrapper = styled.div`
  box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.05);
`;
export const SearchResults = styled.div<{ visible?: boolean }>`
  display: ${props => (!props.visible ? 'none' : 'block')};
  width: 100%;
  background: ${props => props.theme.palette.white};
  border-radius: 0 0 3px 3px;
  padding: 8px 0 8px 8px;
  box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.05);
  z-index: 10;
`;
export const CascaderScrollbar = styled(Scrollbar)<{ searching?: boolean }>`
  padding-right: ${props => (props.searching ? `0` : '8px')};
`;
export const Wrapper = styled.div`
  && {
    .ant-menu-inline, .-inline {
      border-right: none;
    }
  }
`;
export const BreadcrumbPrefix = styled.div``;
export const DividerContainer = styled.div`
  padding: 8px;
`;
