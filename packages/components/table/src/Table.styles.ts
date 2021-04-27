import styled, { keyframes } from 'styled-components';
import { macro } from '@synerise/ds-typography';
import { CheckboxWrapper } from '@synerise/ds-checkbox/dist/Checkbox.styles';
import Menu from '@synerise/ds-menu';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';

export const Header = styled.div<{ withBorderTop?: boolean }>`
  background: #ffffff;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  border-top: ${(props): string => (props.withBorderTop ? `1px solid ${props.theme.palette['grey-200']}` : '0')};
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

export const Title = styled.div`
  ${macro.small};
  color: ${(props): string => props.theme.palette['grey-700']};
  padding: 0 24px 0 0;

  strong {
    font-weight: 500;
  }
`;

export const TitleSeparator = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 1px;
  height: 16px;
  margin: -2px 12px 0px 12px;
  background: ${({ theme }): string => theme.palette['grey-200']};
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  > * {
    margin-left: 8px;
    min-width: 32px;
  }
`;

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

export const InputWrapper = styled.div<{ isOpen?: boolean; searchValue: string | undefined }>`
  ${(props): string => (props.searchValue !== '' || props.isOpen ? `width: 100%` : 'width: 30px')};
  transition: all 0.5s ease;
  position: relative;
  display: flex;
  align-items: center;
  direction: ltr;

  ${Input} {
    opacity: ${(props): string => (props.searchValue || props.isOpen ? '1 !important' : '0')};
    width: ${(props): string => (props.searchValue || props.isOpen ? 'auto' : '0')};
  }

  & {
    input {
      padding-left: 32px;
      ${(props): string =>
        props.searchValue !== '' || props.isOpen ? `cursor: initial!important;` : 'cursor: pointer!important'};
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
  width: 64px;
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

export const TableWrapper = styled.div<{ hideColumnNames?: boolean }>`
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

  .ant-table .ant-table-cell.ant-table-selection-column + .ant-table-cell.ds-table-star-column {
    padding-left: 0;
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
`;
