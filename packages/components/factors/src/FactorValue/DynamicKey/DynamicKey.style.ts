import styled, { css } from 'styled-components';

import { Input } from '@synerise/ds-input';

export const DynamicKeyInput = styled(Input)<{
  index: 0 | 1;
  withoutTypeSelector?: boolean;
}>`
  flex: 1;
  &:focus {
    z-index: 2;
  }
  .ant-input {
    ${(props) =>
      props.index === 0
        ? css`
            border-radius: ${props.withoutTypeSelector ? '3px 0 0 3px' : '0'};
          `
        : css`
            border-radius: 0 3px 3px 0;
            margin-left: -1px;
          `}
  }
`;

export const DynamicKey = styled.div<{ withoutTypeSelector: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;
