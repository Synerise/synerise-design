import styled, {
  type FlattenSimpleInterpolation,
  css,
} from 'styled-components';

import { Container } from '@synerise/ds-date-picker/dist/Elements/PickerInput/PickerInput.styles';

const DEFAULT_WIDTH = {
  'text-autocomplete': '147px',
  'text-default': '147px',
  'text-expansible': '123px',
};

export const FactorInput = styled.div<{
  withoutTypeSelector: boolean;
  inputTextType?: 'autocomplete' | 'default' | 'expansible';
  inputType?: string;
}>`
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
        if (
          inputType === 'text' &&
          DEFAULT_WIDTH[`${inputType}-${inputTextType}`]
        ) {
          // The native autocomplete is content-box and autosizes itself. A
          // min-width on its <input> is a CONTENT min that, once padding + the
          // icon gutter are added, over-constrains the control and pins it from
          // resizing. Apply the min to the control wrapper (border-box) instead.
          if (inputTextType === 'autocomplete') {
            return css`
              &&& .ds-autocomplete {
                min-width: ${DEFAULT_WIDTH['text-autocomplete']};
              }
            `;
          }
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

    .ds-autocomplete {
      display: flex;
      /* The de-antd autocomplete carries its width on .ds-autocomplete itself
         (AutocompleteWrapper defaults to 200px when autoResize is unset) and no
         longer renders an inner .ant-select. Force the wrapper to fill the
         FactorValue slot — restores the master-era override that used to sit on
         the inner .ant-select (width 100%). */
      width: 100%;
      > * {
        min-width: 0;
        flex-grow: 1;
      }
      .ant-select-selection-placeholder {
        padding: 0;
      }
      .ant-select-selector {
        border-radius: ${(props): string =>
          props.withoutTypeSelector ? '3px' : '0 3px 3px 0'};
      }
    }
  }
`;
