import { VariableSizeList } from 'react-window';
import styled, { css } from 'styled-components';

import Dropdown from '@synerise/ds-dropdown';
import { Label as DropdownBackActionLabel } from '@synerise/ds-dropdown/dist/components/BackAction/BackAction.styles';
import DSEmptyStates from '@synerise/ds-empty-states';
import DSLoader from '@synerise/ds-loader';
import Scrollbar from '@synerise/ds-scrollbar';
import { PlaceholderWrapper } from '@synerise/ds-search-bar/dist/SearchBar.styles';
import DropdownSkeleton from '@synerise/ds-skeleton';

import { LIST_INNER_PADDING } from './constants';

export const ListWrapper = styled.div<{
  wrapperHeight?: number;
  centered?: boolean;
  offsetSpace: number;
}>`
  position: relative;
  flex: 1 0 calc(100% - ${(props) => props.offsetSpace}px);
  ${(props) =>
    props.wrapperHeight !== undefined &&
    `height: ${props.wrapperHeight + LIST_INNER_PADDING}px;`}
  ${(props) =>
    props.centered &&
    css`
      display: flex;
      flex-direction: column;
    `}

  ${DropdownBackActionLabel} {
    min-width: 0;
  }
`;

export const ListContainer = styled(Dropdown.Wrapper)<{
  containerHeightMode?: 'fillSpace' | 'fitContent' | 'preset';
  wrapperHeight: string;
}>`
  width: 100%;
  height: ${(props) => props.wrapperHeight};
  display: flex;
  flex-direction: column;

  ${PlaceholderWrapper} span {
    display: flex;
    gap: 8px;
    align-items: center;
  }
`;

export const SearchWrapper = styled.div`
  flex: 0 0 52px;
`;
export const EmptyStates = styled(DSEmptyStates)`
  width: 260px;
  margin: auto;
`;

export const IconWrapper = styled.div`
  margin-right: 4px;
  svg {
    fill: ${(props): string => props.theme.palette['grey-600']};
  }
`;

export const FooterWrapper = styled.div`
  background-color: ${(props): string => props.theme.palette['grey-050']};
  padding: 0 8px;
  height: 48px;
  flex: 0 0 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props): string => props.theme.palette['grey-600']};
  font-weight: 500;
  border-top: solid 1px ${(props): string => props.theme.palette['grey-100']};
  &:hover {
    color: ${(props): string => props.theme.palette['blue-600']};
    ${IconWrapper} {
      svg {
        fill: ${(props): string => props.theme.palette['blue-600']};
      }
    }
  }
`;

export const FooterWrapperRight = styled.div``;
export const FooterWrapperLeft = styled.div``;

export const ScrollContent = styled.div`
  padding-right: ${LIST_INNER_PADDING}px;
`;

export const StyledScrollbar = styled(Scrollbar)<{
  withSectionHeader?: boolean;
}>`
  padding: ${LIST_INNER_PADDING}px 0 0 ${LIST_INNER_PADDING}px;
  height: ${(props) =>
    props.withSectionHeader ? 'calc(100% - 53px)' : '100%'};
  && {
    .ps__rail-y {
      left: unset !important;
      right: 0;
    }
  }
`;

export const StyledList = styled(VariableSizeList)<{ maxHeight?: number }>`
  overflow-x: unset;
  overflow-y: unset;
  height: auto !important;
  ${(props) =>
    props.maxHeight !== undefined && `max-height: ${props.maxHeight}px;`}

  &:after {
    content: '';
    height: 8px;
    display: block;
  }
`;
export const Skeleton = styled(DropdownSkeleton)`
  padding: 0;
  width: 70%;
`;

export const SkeletonWrapper = styled.div<{ wrapperHeight?: number }>`
  ${(props) =>
    props.wrapperHeight !== undefined && `height: ${props.wrapperHeight}px;`}
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  ${Skeleton}:nth-child(odd) {
    width: 50%;
  }
`;

export const Title = styled.div`
  font-size: 10px;
  line-height: 1.6;
  font-weight: 500;
  text-transform: uppercase;
  color: ${(props): string => props.theme.palette['grey-500']};
  padding: 8px 12px;
`;

export const SectionTitleWrapper = styled.div``;

export const InfiniteLoaderItemWrapper = styled.div``;

export const Loader = styled(DSLoader)`
  justify-content: flex-start;
`;
