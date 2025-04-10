import styled, { css } from 'styled-components';
import { AutoResizeProp } from '@synerise/ds-input';
import { autoresizeConfObjToCss } from '@synerise/ds-input/dist/Input.styles';

const active = () => css`
  transition: ease-in-out all 0.2s, width 0s, min-width 0s, max-width 0s;
  box-shadow: inset 0 0 0 1px ${props => props.theme.palette['blue-600']};
  border: 1px solid ${props => props.theme.palette['blue-600']};
  background-color: ${props => props.theme.palette['blue-050']};
`;

const error = () => css`
  transition: ease-in-out all 0.2s, width 0s, min-width 0s, max-width 0s;
  box-shadow: inset 0 0 0 1px ${props => props.theme.palette['red-600']};
  background: ${props => props.theme.palette['red-050']};
  border: 1px solid ${props => props.theme.palette['red-600']};
`;

const readonly = () => css`
  background-color: ${props => props.theme.palette.white};
  color: ${props => props.theme.palette['grey-700']};
  input {
    cursor: auto;
  }
`;

export const AutocompleteWrapper = styled.div<{ autoResize?: AutoResizeProp }>`
  input {
    font-feature-settings: 'tnum';
  }
  .ant-select-auto-complete {
    width: ${props => (props.autoResize ? '100%' : '200px')};
    ${props => autoresizeConfObjToCss({ ...props, boxSizing: 'border-box' })};
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
      color: ${props => props.theme.palette['grey-600']};
      width: 16px;
      height: 16px;
      margin-top: -7px;
    }

    &.ant-select:not(.ant-select-no-arrow) .ant-select-selection__clear {
      right: 12px;

      &:hover {
        color: ${props => props.theme.palette['grey-700']};
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
    
    ${props => {
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
          .ant-select-selector {
            padding: 0 10px;
          }
          .ant-input {
            transition: ease-in-out all 0.3s, width 0s, min-width 0s, max-width 0s;
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
