import styled from 'styled-components';

export const FormulaButton = styled.div<{ withoutTypeSelector: boolean }>`
  .ds-button {
    border-radius: ${(props): string =>
      props.withoutTypeSelector ? '3px' : '0 3px 3px 0'};
    .ant-badge {
      padding: 0 8px 0 12px;
    }
  }
`;
