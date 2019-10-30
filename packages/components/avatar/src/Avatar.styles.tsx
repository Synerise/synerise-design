import * as React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Avatar, { AvatarProps } from 'antd/lib/avatar';
import { macro } from '@synerise/ds-typography';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

const applyBgColors = (props: ThemeProps & { backgroundColor: string }): string => `
  background: ${props.theme.palette[`${props.backgroundColor}-400`]};
`;

const applyDisabledStyles = (props: { disabled: boolean }): string | false =>
  props.disabled &&
  `
  opacity: 0.4;
  pointer-events: none;
`;

const BADGE_POSITION = {
  circlesmall: '3px',
  circledefault: '5px',
  circlelarge: '5px',
  circleextraLarge: '10px',
  squaresmall: '3px',
  squaredefault: '3px',
  squarelarge: '3px',
  squareextraLarge: '3px',
};

const applyBadgePosition = (props: AvatarProps): string => {
  return `
    top:  ${BADGE_POSITION[`${props.shape}${props.size}`]}; 
    right: ${BADGE_POSITION[`${props.shape}${props.size}`]};
  `;
};

// eslint-disable-next-line react/jsx-props-no-spreading
export default styled(({ backgroundColor, hasStatus, ...rest }) => <Avatar {...rest} />)`
  && {
    ${(props): string => applyBgColors(props)};
    ${(props): string | false => applyDisabledStyles(props)};
    transition: background 0.3s ease;

    .ant-avatar-string {
      width: 100%;
      height: 100%;
      ${macro.flexCentered}
    }

    &:hover {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: 2px solid white;
        opacity: 0.3;
        border-radius: inherit;
      }
    }
    ${(props): FlattenSimpleInterpolation | false =>
      props.hasStatus &&
      css`
        & + .ant-badge-dot {
          box-shadow: 0px 0px 0px 2px white inset;
          width: 10px;
          height: 10px;
          ${applyBadgePosition(props)};
        }
      `}

    ${(props): FlattenSimpleInterpolation | false =>
      props.size === 'extraLarge' &&
      css`
        width: 80px;
        height: 80px;

        .ant-avatar-string {
          line-height: 80px;
          ${macro.xlAvatar};
        }

        ${props.icon &&
          css`
            &.ant-avatar-icon {
              ${macro.xlAvatarIcon};
              ${macro.flexCentered}
            }
          `}
      `}
  }
`;
