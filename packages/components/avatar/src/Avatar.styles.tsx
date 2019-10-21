import * as React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Avatar from 'antd/lib/avatar';
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

// eslint-disable-next-line react/jsx-props-no-spreading
export default styled(({ backgroundColor, hasStatus, ...rest }) => <Avatar {...rest} />)`
  && {
    ${(props): string => applyBgColors(props)};
    ${(props): string | false => applyDisabledStyles(props)};
    transition: background 0.3s ease;

    .ant-avatar-string {
      ${macro.flexCentered}
    }

    ${(props): FlattenSimpleInterpolation | false =>
      props.hasStatus &&
      css`
        & + .ant-badge-dot {
          box-shadow: 0px 0px 0px 2px white inset;
          top: 5px;
          right: 5px;
          width: 10px;
          height: 10px;
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
