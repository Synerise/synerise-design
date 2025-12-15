import styled, { css } from 'styled-components';

import { Input, type StyledInput } from '@synerise/ds-input';

type ExtraProps = {
  index: 0 | 1;
  withoutTypeSelector?: boolean;
};

export const DynamicKeyInput: StyledInput<ExtraProps> = styled(
  Input,
)<ExtraProps>`
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
