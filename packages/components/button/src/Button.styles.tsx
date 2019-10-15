import * as React from 'react';
import styled, { css } from 'styled-components';
import Button from 'antd/lib/button';

const leftIcon = '4px 4px 4px 8px';
const rightIcon = '4px 8px 4px 4px';

const buttonType = {
  secondary: 'secondary',
  tertiary: 'tertiary',
  ghost: 'ghost',
};

const splitType = {
  secondary: 'secondary',
  tertiary: 'tertiary',
};

// eslint-disable-next-line react/jsx-props-no-spreading
export default styled(({ mode, type, loading, ...rest }) => <Button type={type} loading={loading} {...rest} />)`
  && {
    padding: 0 12px;
    ${(props): string =>
      props.type === buttonType[props.type] &&
      css`
        &.ant-btn {
          svg {
            fill: ${(color): string => color.theme.palette['grey-600']};
          }
        }
      `}
    ${(props): string =>
      props.mode === 'split' &&
      css`
        &.ant-btn {
          padding-right: 0;
          > span {
            padding-right: 12px;
            border-right: 1px solid
              ${props.type !== splitType[props.type] ? `rgba(255, 255, 255, 0.15);` : props.theme.palette['grey-300']};
          }
          > div {
            margin: 4px;
          }
        }
      `}
    ${(props): string =>
      props.mode === 'two-icons' &&
      css`
        &.ant-btn {
          padding: 0;
          > div:first-child {
            margin: ${leftIcon};
          }
          > div:last-child {
            margin: ${rightIcon};
          }
        }
      `}
    ${(props): string =>
      props.mode === 'label-icon' &&
      css`
        &.ant-btn {
          padding-right: 0;
          > div {
            margin: ${leftIcon};
          }
        }
      `}
    ${(props): string =>
      props.mode === 'icon-label' &&
      css`
        &.ant-btn {
          padding-left: 0;
          > div {
            margin: ${rightIcon};
          }
        }
      `}
    ${(props): string =>
      props.mode === 'single-icon' &&
      css`
        &.ant-btn {
          padding: 0;
          > div {
            margin: 4px;
          }
        }
      `}
  }
`;
