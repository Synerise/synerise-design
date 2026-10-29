import styled, { css } from 'styled-components';

import Avatar from '@synerise/ds-avatar';

import type { Size } from './AvatarGroup.types';

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
        box-shadow: 0 0 0 2px var(--ds-avatar-group-border);
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
  /* Dedicated avatar-more module tokens for the +N "MoreInfo" counter — these restore the original
     white / grey-300 / grey-400 / grey-500 look (the earlier generic ds-avatar-surface adoption had
     shifted it to grey-100/grey-200/grey-600 + a brand-blue hover border). */
  &&& {
    margin-left: 8px;
    background: var(--ds-avatar-more-bg-default);
    border: 1px solid var(--ds-avatar-more-border-color-default);
    color: var(--ds-avatar-more-text-default);

    span {
      color: var(--ds-avatar-more-text-default) !important;
    }

    ::after,
    ::before {
      display: none;
    }

    &:hover,
    &:active {
      color: var(--ds-avatar-more-text-hover);
      border-color: var(--ds-avatar-more-border-color-hover);
    }
  }
`;
