import styled, { css } from 'styled-components';

import Avatar from '@synerise/ds-avatar';

import { type Size } from './AvatarGroup.types';

const MARGINS: Record<Size, string> = {
  small: '-8px',
  medium: '-12px',
  large: '-16px',
};

const applyMarginLeft = (size?: Size) => {
  return css`
    margin-left: ${size ? MARGINS[size] : '16px'};
  `;
};

export const Group = styled.div<{ size?: Size }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  && {
    .ds-badge {
      transition: all 0.3s ease;
      ${(props) => applyMarginLeft(props.size)};
      &:first-of-type {
        margin-left: 0;
      }
      .ds-badge-dot {
        transition: all 0.3s ease;
        opacity: 0;
      }
      .ant-avatar {
        pointer-events: none;
        box-shadow: 0 0 0 2px var(--ds-color-background-base-default);
      }
    }
    &:hover {
      .ds-badge {
        margin-left: 8px;
        &:first-of-type {
          margin-left: 0;
        }
        .ds-badge-dot {
          opacity: 1;
        }
        .ant-avatar {
          pointer-events: all;
          box-shadow: 0 0 0 2px transparent;
        }
      }
    }
  }
`;

export const MoreInfo = styled(Avatar)<{ onClick: () => void }>`
  /* &&& outspecs ds-avatar's own \`&& \${AvatarString} { color: … !important }\`
     rule (0,3,0) so the +N counter keeps its grey text instead of white-on-white. */
  /* ⚑ Shifts (adopt by role — the +N avatar reuses the ds-avatar module surface; per UX 2026-07-21):
     bg white → grey-100, border grey-300 → grey-200, text grey-400 → grey-600,
     hover text grey-500 → grey-600, hover border grey-500 → brand blue-600. */
  &&& {
    margin-left: 8px;
    background: var(--ds-avatar-bg-default);
    border: 1px solid var(--ds-avatar-border-color-default);
    color: var(--ds-avatar-text-default);

    span {
      color: var(--ds-avatar-text-default) !important;
    }

    ::after,
    ::before {
      display: none;
    }

    &:hover,
    &:active {
      color: var(--ds-avatar-text-hover);
      border-color: var(--ds-avatar-border-color-hover);
    }
  }
`;
