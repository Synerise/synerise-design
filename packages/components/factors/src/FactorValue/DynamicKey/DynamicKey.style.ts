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
  /* raise the focused field so its (blue) border paints over the neighbour */
  &:focus-within {
    z-index: 2;
  }
  input {
    ${(props) =>
      props.index === 0
        ? css`
            border-radius: ${props.withoutTypeSelector ? '3px 0 0 3px' : '0'};
          `
        : css`
            border-radius: 0 3px 3px 0;
            /* drop the left border so the neighbour's right border is the single
               shared divider — no doubled border, no negative margin (factors
               resets the wrapper margin, which would otherwise defeat it) */
            border-left: 0;
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
