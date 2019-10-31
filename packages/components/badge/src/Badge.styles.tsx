import * as React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Badge from 'antd/lib/badge';
import { macro } from '@synerise/ds-typography';

// eslint-disable-next-line react/jsx-props-no-spreading
export default styled(({ flag, outlined, ...rest }) => <Badge {...rest} />)`
&& {
  .ant-scroll-number-only{
    height: 18px;
    & > p {
      ${macro.h200};
      color: inherit;
      line-height: 18px;
      height: 18px;
    }
  }
  .ant-badge-count {
    box-shadow: none;
    height: 18px;
    padding: 0 5px;
    line-height: 18px;
    min-width: 18px;
  }
  ${(props): FlattenSimpleInterpolation | false =>
    css`
      ${props.outlined &&
        css`
          .ant-badge-count {
            box-shadow: 0 0 0 1px ${props.theme.palette.white};
          }
        `}
      ${props.flag &&
        css`
          .ant-badge-dot {
            box-shadow: none;
            &.ant-badge-status-processing {
              width: 6px;
              height: 6px;
              display: inline-block;
              position: absolute;
              border: 0;
            }
          }
          .ant-badge-dot,
          .ant-badge-status-dot {
            overflow: visible;
            &::before {
              display: flex;
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 10px;
              height: 10px;
              background-color: inherit;
              opacity: 0.35;
              border-radius: 50%;
              transform: translate3d(-2px, -2px, 0);
            }
            &::after {
              display: flex;
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 16px;
              height: 16px;
              background-color: inherit;
              opacity: 0.2;
              border-radius: 50%;
              transform: translate3d(-5px, -5px, 0);
              animation: none;
            }
          }
        `};
    `}
`;
