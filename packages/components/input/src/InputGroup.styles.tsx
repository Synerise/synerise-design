import styled, {
  type FlattenSimpleInterpolation,
  css,
} from 'styled-components';

export const InputGroupItem = styled.div``;

export const InputGroupWrapper = styled.div<{ compact?: boolean }>`
  &&& {
    ${InputGroupItem} {
      .ds-select-container {
        margin-bottom: 0;
      }
    }

    .ant-input.ant-input {
      float: none;
    }

    display: flex;
    min-width: 0;

    ${(props): string => (props.compact ? '' : 'align-items: stretch')};

    ${(props): FlattenSimpleInterpolation =>
      props.compact
        ? css`

      ${InputGroupItem} {
        
        &:only-child {
          flex-grow: 1;
        }

        &:not(:only-child) {
          &:not(:last-child) {
            margin-right: -1px;

            .ant-input,
            .ant-input-number,
            .ant-select-selector {
              border-top-right-radius: 0px;
              border-bottom-right-radius: 0px;
            }
          }
          &:last-child {
            .ant-input,
            .ant-input-number,
            .ant-select-selector {
              border-top-left-radius: 0px;
              border-bottom-left-radius: 0px;
            }
            flex: auto;
          }
        }
      `
        : css`
            ${InputGroupItem}:last-child {
              flex-grow: 1;
            }
            ${InputGroupItem}:not(:last-child) {
              margin-right: 12px;
            }
          `}
  }
`;
