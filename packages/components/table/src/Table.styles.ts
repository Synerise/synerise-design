import styled, { keyframes } from 'styled-components';

import { CheckboxWrapper } from '@synerise/ds-checkbox/dist/Checkbox.styles';
import { IconContainer } from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import DSSkeleton from '@synerise/ds-skeleton';
import { Text, macro } from '@synerise/ds-typography';

export const Header = styled.div<{ withBorderTop?: boolean }>`
  background: #ffffff;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  border-top: ${(props): string =>
    props.withBorderTop ? `1px solid ${props.theme.palette['grey-200']}` : '0'};
  border-bottom: 1px solid ${(props): string => props.theme.palette['grey-200']};
`;

export const Size = styled.div`
  ${macro.medium};
  color: #fff;
  b {
    ${macro.h400};
    color: inherit;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  max-width: 100%;
  min-width: 0;

  ${macro.small};
  color: ${(props): string => props.theme.palette['grey-700']};
  padding: 0 24px 0 0;

  strong {
    font-weight: 500;
  }
`;

export const TitlePartEllipsis = styled(Text)`
  font-weight: 500;
`;

export const TitlePart = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const TitleSeparator = styled.span`
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  width: 1px;
  height: 16px;
  margin: 1px 12px 0px 12px;
  background: ${({ theme }): string => theme.palette['grey-200']};
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  > * {
    min-width: 32px;
  }

  &&& .ds-button.btn-search {
    min-width: unset;
  }
`;

export const RightSideWrapper = styled.div``;

export const Icon = styled.div`
  transition: all 0.5s ease;
  position: absolute;
  left: 4px;
  z-index: 1;
`;

export const Input = styled.div<{ isOpen?: boolean }>`
  transition: all 0.2s ease;
  overflow: hidden;
  position: relative;
  right: 0;

  > div {
    margin: 0;
  }
`;

export const InputWrapper = styled.div<{
  isOpen?: boolean;
  searchValue: string | undefined;
}>`
  ${(props): string =>
    props.searchValue !== '' || props.isOpen ? `width: 100%` : 'width: 30px'};
  transition: all 0.5s ease;
  position: relative;
  display: flex;
  align-items: center;
  direction: ltr;

  ${Input} {
    opacity: ${(props): string =>
      props.searchValue || props.isOpen ? '1 !important' : '0'};
    width: ${(props): string =>
      props.searchValue || props.isOpen ? 'auto' : '0'};
  }

  & {
    input {
      padding-left: 32px;
      ${(props): string =>
        props.searchValue !== '' || props.isOpen
          ? `cursor: initial!important;`
          : 'cursor: pointer!important'};
    }
  }

  .search-input {
    width: 0;
  }
`;

export const Selection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 64px;
  margin-right: 24px;
  border-radius: 3px;

  &:hover {
    background-color: ${({ theme }): string => theme.palette['grey-100']};
  }

  .ant-btn.ds-button:first-of-type {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .ant-btn.ds-button:last-of-type {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  ${CheckboxWrapper} {
    padding: 0;
  }
`;

export const SelectionMenu = styled(Menu)`
  padding: 8px;
`;

const spinnerAnimation = keyframes`
  from {
    transform: rotateZ(0deg);
  }
  
  to {
    transform: rotateZ(360deg);
  }
`;

export const Spinner = styled.div`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 10;
  ${IconContainer} {
    animation: ${spinnerAnimation} 1s forwards linear infinite;
    svg {
      color: ${(props): string => props.theme.palette['blue-600']};
      fill: ${(props): string => props.theme.palette['blue-600']};
    }
  }
`;

export const TableWrapper = styled.div<{
  hideColumnNames?: boolean;
  disableColumnNamesLineBreak?: boolean;
}>`
  table {
    .ant-table-thead {
      ${(props): string => (props.hideColumnNames ? 'display: none' : '')};
    }
  }
  .ant-table-wrapper .ant-table {
    z-index: 1;
  }

  .ant-table .ant-table-cell.ant-table-selection-column,
  .ant-table .ant-table-cell.ds-table-star-column {
    padding: 0 8px 0 24px;

    & > button {
      display: inline-block;
    }
  }

  .ant-table
    .ant-table-cell.ant-table-selection-column
    + .ant-table-cell.ds-table-star-column {
    padding-left: 0;
  }

  .ant-table .ant-table-thead th {
    transition:
      background 0.3s,
      border-color 0.3s;
    background-color: ${({ theme }): string => theme.palette.white};
    border-bottom-color: ${({ theme }): string => theme.palette['grey-300']};

    &.ant-table-column-has-sorters {
      cursor: default;
    }

    &.ant-table-column-has-sorters:hover {
      background-color: ${({ theme }): string => theme.palette['grey-050']};
      border-bottom: 2px solid
        ${({ theme }): string => theme.palette['grey-400']};

      > * {
        margin-bottom: -1px;
      }
    }

    > * {
      display: flex;
      width: 100%;
    }

    [class^='ant-table-column-sorters'] {
      width: 100%;
    }

    &.ant-table-column-sort {
      background-color: ${({ theme }): string => theme.palette['blue-050']};
      border-bottom: 2px solid
        ${({ theme }): string => theme.palette['blue-400']};

      &:hover {
        background-color: ${({ theme }): string => theme.palette['blue-100']};
        border-bottom: 2px solid
          ${({ theme }): string => theme.palette['blue-600']};
      }

      & > [class^='ant-table-column-sorters'] {
        overflow: hidden;
      }

      > * {
        margin-bottom: -1px;
      }
    }

    &.ant-table-cell-ellipsis.ant-table-column-has-sorters {
      overflow: visible;
    }

    &:not(.ds-table-column-sort) {
      .ds-table-column-sorter {
        margin-left: 8px;
      }
    }

    &.ds-table-active-column {
      background-color: ${({ theme }): string => theme.palette['yellow-050']};
      border-bottom: 2px solid
        ${({ theme }): string => theme.palette['yellow-400']};
      cursor: default;

      &:hover {
        background-color: ${({ theme }): string => theme.palette['yellow-100']};
        border-bottom: 2px solid
          ${({ theme }): string => theme.palette['yellow-600']};
      }

      .ant-table-column-sorter {
        display: none;
      }

      > * {
        margin-bottom: -1px;
      }
    }
  }

  .ant-table tr.ant-table-row:not(:hover) td.ant-table-column-sort {
    background-color: ${({ theme }): string => theme.palette['blue-050']};
  }

  .ant-table .ant-table-column-sorter {
    margin-left: 8px;
    max-width: 32px;
    min-width: 32px;
  }

  .ant-table-cell .ds-sort-dropdown-button {
    opacity: 0;
  }

  .ant-table-cell:hover .ds-sort-dropdown-button,
  .ant-table-cell.ant-table-column-sort .ds-sort-dropdown-button {
    opacity: 1;
  }

  .ant-table-wrapper.virtual-table.virtual-table-infinite-scroll
    .ant-table
    .ant-table-header {
    box-shadow: 0 4px 12px 0 rgba(35, 41, 54, 0.04);
  }

  .virtual-table:not(.with-sticky-header) .ant-table-container {
    overflow: auto hidden;
  }

  .virtual-table
    .virtual-table-row:not(:hover)
    .virtual-table-cell.ant-table-column-sort {
    background-color: ${({ theme }): string => theme.palette['blue-050']};
  }

  & .ant-table .ant-table-cell-scrollbar {
    box-shadow: none;
  }
  & .ant-table th.ant-table-cell {
    white-space: ${(props): string =>
      props.disableColumnNamesLineBreak ? 'nowrap' : 'normal'};
  }

  &&&
    .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    position: relative;
  }
`;

export const Skeleton = styled(DSSkeleton)<{ skeletonWidth?: string }>`
  padding: 0;
  ${(props) => props.skeletonWidth && `width: ${props.skeletonWidth};`}
`;

export const TableSkeletonCell = styled.div<{
  height?: number;
  width?: string;
}>`
  display: flex;
  height: ${(props) => (props.height ? `${props.height}px` : 'auto')};
  width: ${(props) => `${props.width}` || '50%'};
  align-items: center;
  justify-content: flex-start;
`;
