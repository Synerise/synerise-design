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
  /* Icon colour flows through the wrapper's \`color\` (DS icons default to
     fill: currentColor), so no explicit svg fill rule is needed. */
  color: var(--ds-color-icon-base-default);
`;

export const FooterWrapper = styled.div`
  background-color: var(--ds-dropdown-footer-bg);
  padding: 0 8px;
  height: 48px;
  flex: 0 0 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* Footer action text default. dropdown module has no footer-text token
     → exact semantic grey-600. DS follow-up: add a dropdown footer-text token. */
  color: var(--ds-dropdown-text-additional);
  font-weight: 500;
  border-top: solid 1px var(--ds-dropdown-footer-border);
  &:hover {
    color: var(--ds-color-text-brand-default);
    ${IconWrapper} {
      color: var(--ds-color-icon-brand-default);
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
  color: var(--ds-divider-header-text-color);
  padding: 8px 12px;
`;

// The path text stays in one element, so the separator's spaces are not trimmed as flex items.
export const TitleWithTooltip = styled.div`
  display: flex;
  align-items: center;
`;

// The negative margin keeps the 24px icon inside the title's 16px line: the row stays as
// tall as a title without one, which is what its height estimate assumes.
export const TitleTooltipIcon = styled.div`
  display: flex;
  margin: -4px 0;
  color: ${(props): string => props.theme.palette['grey-400']};
`;

export const SectionTitleWrapper = styled.div``;

export const InfiniteLoaderItemWrapper = styled.div``;

export const Loader = styled(DSLoader)`
  justify-content: flex-start;
`;
