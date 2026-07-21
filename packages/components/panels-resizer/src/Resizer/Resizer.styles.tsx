import styled, { css } from 'styled-components';

import Icon, { type StyledIcon } from '@synerise/ds-icon';

export const Handler = styled.div<{ isHorizontal: boolean }>`
  display: flex;
  align-items: center;
  ${(props) =>
    props.isHorizontal
      ? css`
          width: 100%;
          height: 16px;
          justify-content: center;
        `
      : css`
          height: 100%;
          width: 16px;
        `}
  flex-grow: 1;
  z-index: 5;
  /* ⚑ Shift: grip-bar bg grey-200 → grey-100 (lighter; per UX 2026-07-21). */
  background-color: var(--ds-color-background-base-muted);

  &:hover {
    ${(props) =>
      props.isHorizontal
        ? css`
            cursor: ns-resize;
          `
        : css`
            cursor: ew-resize;
          `}
    background-color: var(--ds-color-background-brand-subtlehover);
  }
`;

export const HandlerIcon: StyledIcon<{ isHorizontal?: boolean }> = styled(
  Icon,
)<{ isHorizontal?: boolean }>`
  svg {
    fill: var(--ds-color-icon-base-default);

    ${(props) =>
      props.isHorizontal &&
      css`
        -webkit-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        transform: rotate(90deg);
      `}
  }

  &:hover {
    color: var(--ds-color-icon-brand-default);
  }
`;
