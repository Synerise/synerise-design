import styled, { css, FlattenInterpolation } from 'styled-components';

import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

export const LabelWrapper = styled.div`
  margin: 0px 0px 8px 4px;
`;

export const ErrorWrapper = styled.div`
  margin: 8px 0px 4px 4px;
`;

export const DescWrapper = styled.div`
  margin: 4px 0px 0px 4px;
`;

const active = (): FlattenInterpolation<ThemeProps> => css`
  box-shadow: inset 0 0 0 1px ${(props): string => props.theme.palette['blue-600']};
  border: 1px solid ${(props): string => props.theme.palette['blue-600']};
  background-color: ${(props): string => props.theme.palette['blue-050']};
`;

const error = (): FlattenInterpolation<ThemeProps> => css`
  box-shadow: inset 0 0 0 1px ${(props): string => props.theme.palette['red-600']};
  background: ${(props): string => props.theme.palette['red-050']};
  border: 1px solid ${(props): string => props.theme.palette['red-600']};
`;

export const AutocompleteWrapper = styled.div`
  .ant-select-auto-complete {
    &:focus,
    &:hover {
      .ant-select-selection {
        ${active()}
      }
    }

    &.error {
      .ant-select-selection {
        ${error()}
      }

      .ant-input {
        border-color: ${(props): string => props.theme.palette['red-600']};
      }
    }

    .ant-select-selection__rendered {
      margin: 0;
    }

    .ant-select-selection:hover .ant-select-selection__rendered {
      margin-right: 0;
    }

    &.ant-select .ant-input {
      padding: 8px 12px;
    }

    .ant-select-selection__clear {
      font-size: 15px;
      color: ${(props): string => props.theme.palette['grey-600']};
      width: 16px;
      height: 16px;
      margin-top: -7px;
    }

    &.ant-select:not(.ant-select-no-arrow) .ant-select-selection__clear {
      right: 12px;

      &:hover {
        color: ${(props): string => props.theme.palette['grey-700']};
      }
    }

    .ant-select-dropdown {
      padding: 8px;
    }

    .ant-select-dropdown-menu-item {
      font-weight: normal;

      strong {
        font-weight: 500;
      }
    }

    .ant-select-dropdown-menu-item-active:not(.ant-select-dropdown-menu-item-disabled) {
      font-weight: 500;
    }
  }
`;
