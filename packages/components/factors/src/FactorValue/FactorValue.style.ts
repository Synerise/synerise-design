import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const FactorInput = styled.div<{ withoutTypeSelector: boolean }>`
  min-width: 144px;
  .ds-autocomplete {
    width: 100%;
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
`;
