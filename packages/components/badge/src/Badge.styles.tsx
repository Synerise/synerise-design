import * as React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Badge from 'antd/lib/badge';

// eslint-disable-next-line react/jsx-props-no-spreading
export default styled(({ flag, ...rest }) => <Badge {...rest} />)`
&& {
  ${(props): FlattenSimpleInterpolation | false =>
    css`
      ${props.flag &&
        css`
          .ant-badge-dot {
            box-shadow: none;
            &.ant-badge-status-processing {
              width: 6px;
              height: 6px;
              display: inline-block;
              position: absolute;
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
