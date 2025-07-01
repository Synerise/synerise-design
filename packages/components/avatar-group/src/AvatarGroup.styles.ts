import styled, {
  type FlattenSimpleInterpolation,
  css,
} from 'styled-components';

import Avatar from '@synerise/ds-avatar';

import { type Size } from './AvatarGroup.types';

const MARGINS = {
  small: '-8px',
  medium: '-12px',
  large: '-16px',
  extraLarge: '-36px',
};

const applyMarginLeft = (size: Size): FlattenSimpleInterpolation => {
  return css`
    margin-left: ${MARGINS[`${size}`] || '16px'};
  `;
};

export const Group = styled.div<{ size: Size }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  && {
    .ant-badge {
      transition: all 0.3s ease;
      ${(props): FlattenSimpleInterpolation | false =>
        applyMarginLeft(props.size)};
      &:first-of-type {
        margin-left: 0;
      }
      .ant-badge-dot {
        transition: all 0.3s ease;
        opacity: 0;
      }
      .ant-avatar {
        pointer-events: none;
        box-shadow: 0 0 0 2px
          ${(props): string => `${props.theme.palette.white}FF`};
      }
    }
    &:hover {
      .ant-badge {
        margin-left: 8px;
        &:first-of-type {
          margin-left: 0;
        }
        .ant-badge-dot {
          opacity: 1;
        }
        .ant-avatar {
          pointer-events: all;
          box-shadow: 0 0 0 2px
            ${(props): string => `${props.theme.palette.white}00`};
        }
      }
    }
  }
`;

export const MoreInfo = styled(Avatar)<{ onClick: () => void }>`
  && {
    margin-left: 8px;
    background: ${({ theme }): string => theme.palette.white};
    border: 1px solid ${({ theme }): string => theme.palette['grey-300']};
    color: ${({ theme }): string => theme.palette['grey-400']};

    span {
      color: ${({ theme }): string => theme.palette['grey-400']} !important;
    }

    ::after,
    ::before {
      display: none;
    }

    &:hover,
    &:active {
      color: ${({ theme }): string => theme.palette['grey-500']};
      border-color: ${({ theme }): string => theme.palette['grey-500']};
    }
  }
`;
