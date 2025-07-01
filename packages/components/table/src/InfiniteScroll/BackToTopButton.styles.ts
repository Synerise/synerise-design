import styled, { css } from 'styled-components';

import Button from '@synerise/ds-button';

export const OffsetButton = styled(Button)<{ isSticky?: boolean }>`
  ${(props) =>
    props.isSticky
      ? css`
          &&& {
            transform: translate(10px, -100%);
          }
        `
      : css`
          &&& {
            position: absolute;
            right: -16px;
            bottom: -16px;
            z-index: 2;
          }
        `}
`;

export default { OffsetButton };
