import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Container } from '@synerise/ds-date-picker/dist/Elements/PickerInput/PickerInput.styles';

const DEFAULT_WIDTH = {
  'text-autocomplete': '147px',
  'text-default': '147px',
  'text-expansible': '123px',
};
// eslint-disable-next-line import/prefer-default-export
export const FactorInput = styled.div<{ withoutTypeSelector: boolean; inputTextType?: string; inputType?: string }>`
  && {
    ${(props): FlattenSimpleInterpolation | false => {
      const { inputType, inputTextType = 'default' } = props;
      if (inputType) {
        if (inputType === 'array') {
          return css`
            &&& {
              min-width: 173px;
              input {
                min-width: 123px;
              }
            }
          `;
        }
        if (inputType === 'dateRange') {
          return css`
            &&& {
              min-width: 173px;
            }
          `;
        }
        if (inputType === 'text' && DEFAULT_WIDTH[`${inputType}-${inputTextType}`]) {
          return css`
            &&& {
              input {
                min-width: ${DEFAULT_WIDTH[`${inputType}-${inputTextType}`]};
              }
            }
          `;
        }
      }
      return false;
    }};

    ${Container} {
      width: auto;
    }

    li.ds-menu-item {
      border-radius: ${(props): string => (props.withoutTypeSelector ? '3px' : '0')};
    }

    .ant-menu-item {
      border-radius: ${(props): string => (props.withoutTypeSelector ? '3px' : '0')};
    }

    .ds-autocomplete {
      display: flex;
      > * {
        min-width: 0;
        flex-grow: 1;
      }
      .ant-select {
        width: 100%;
      }
      .ant-select-selection-placeholder {
        padding: 0;
      }
      .ant-select-selector {
        border-radius: ${(props): string => (props.withoutTypeSelector ? '3px' : '0 3px 3px 0')};
      }
    }
    .ant-dropdown-trigger {
      input {
        border-radius: ${(props): string => (props.withoutTypeSelector ? '3px' : '0 3px 3px 0')};
      }
    }
  }
`;
