import styled, { css, FlattenInterpolation } from 'styled-components';

import { ThemeProps } from '@synerise/ds-core';

export const LabelWrapper = styled.div`
  margin: 0px 0px 8px 0px;
`;

export const ErrorWrapper = styled.div`
  margin: 8px 0px 4px 0px;
`;

export const DescWrapper = styled.div`
  margin: 8px 0px 0px 0px;
`;
export const LoaderWrapper = styled.div`
  margin-right: 10px;
`;

const active = (): FlattenInterpolation<ThemeProps> => css`
  transition: ease-in-out all 0.2s;
  box-shadow: inset 0 0 0 1px ${(props): string => props.theme.palette['blue-600']};
  border: 1px solid ${(props): string => props.theme.palette['blue-600']};
  background-color: ${(props): string => props.theme.palette['blue-050']};
`;

const error = (): FlattenInterpolation<ThemeProps> => css`
  transition: ease-in-out all 0.2s;
  box-shadow: inset 0 0 0 1px ${(props): string => props.theme.palette['red-600']};
  background: ${(props): string => props.theme.palette['red-050']};
  border: 1px solid ${(props): string => props.theme.palette['red-600']};
`;

const readonly = (): FlattenInterpolation<ThemeProps> => css`
  background-color: ${(props): string => props.theme.palette.white};
  color: ${(props): string => props.theme.palette['grey-700']};
  input {
    cursor: auto;
  }
`;
export type AutoResizeProps = {
  autoResize?: boolean | { minWidth: string; maxWidth: string };
};
function autoresizeConfObjToCss({
  autoResize,
}: {
  autoResize?: boolean | { minWidth: string; maxWidth: string };
}): string {
  if (!autoResize) return '';
  if (typeof autoResize === 'object') {
    return `max-width: ${autoResize.maxWidth}; min-width: ${autoResize.minWidth}`;
  }
  return `max-width: 400px; min-width: 150px;`;
}

export const AutocompleteWrapper = styled.div<{ autoResize?: boolean | { minWidth: string; maxWidth: string } }>`
  .ant-select-auto-complete {
    width: ${(props): string => (props.autoResize ? '100%' : '200px')};
    ${(props: AutoResizeProps): string => autoresizeConfObjToCss(props)};
    grid-area: 1 / 1;
  }
  .ant-select > span {
    position: absolute;
    left: 0;
    top: 0;
  }

  .ant-select-dropdown {
    .ant-select-selection__rendered {
      margin: 0;
    }

    .ant-select-selection:hover .ant-select-selection__rendered {
      margin-right: 10px;
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

    .ant-select-dropdown-menu-item {
      font-weight: normal;

      strong {
        font-weight: 500;
      }
    }
  }
  .ant-select-selection-search-input {
    padding: 0;
  }
`;

export const ComponentWrapper = styled.div<{ error?: boolean; readOnly?: boolean }>`
&&& {
  .ant-select-auto-complete {
    
    ${(props): FlattenInterpolation<ThemeProps> => {
      if (props.readOnly) {
        return css`
          .ant-select-selector {
            &:hover {
              ${readonly()}
            }
            ${readonly()}
          }
        `;
      }
      if (props.error) {
        return css`
          .ant-select-selector {
            &:hover {
              ${error()}
            }
            ${error()}
          }
        `;
      }
      return css`
        &.ant-select {
          .ant-input {
            transition: ease-in-out all 0.3s;
            &:focus {
              ${active()}
              &:hover {
                ${active()}
              }
            }
          }
        }
      `;
    }}

      
    }   
  }
}
`;
