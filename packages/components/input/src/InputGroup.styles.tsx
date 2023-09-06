import styled, { FlattenSimpleInterpolation, css } from 'styled-components';

export const InputGroupItem = styled.div`
  &:not(:last-child) {
    margin-right: 12px;
  }
  &:last-child {
    flex-grow: 1;
  }
`;

export const InputGroupWrapper = styled.div<{ compact?: boolean }>`
  && {
    display: flex;
    align-items: ${(props): string => (props.compact ? '' : 'stretch')};

    ${(props): FlattenSimpleInterpolation | false =>
      !!props.compact &&
      css`
        ${InputGroupItem}:not(:last-child) {
          margin-right: -1px;

          .ant-input,
          .ant-input-number,
          .ant-select-selector {
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
          }
        }
        ${InputGroupItem}:last-child {
          .ant-input,
          .ant-input-number,
          .ant-select-selector {
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;
          }

          flex-grow: 0;
        }
      `}
  }
`;
