import styled from 'styled-components';

export const DynamicKey = styled.div<{ withoutTypeSelector: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  .ant-input {
    flex: 1;
    &:focus {
      z-index: 2;
    }
    &:first-of-type {
      border-radius: ${(props): string =>
        props.withoutTypeSelector ? '3px 0 0 3px' : '0'};
    }
    &:last-of-type {
      border-radius: 0 3px 3px 0;
      margin-left: -1px;
    }
  }
`;
