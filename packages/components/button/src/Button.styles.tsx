import * as React from 'react';
import styled, { css, FlattenInterpolation, FlattenSimpleInterpolation } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Button from 'antd/lib/button';

const leftIcon = '0 4px 0 8px';
const rightIcon = '0 8px 0 4px';

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
export default styled(({ mode, type, loading, justifyContent, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Button type={type} loading={loading} {...rest} />
))`  
  && {
    display: inline-flex;
    align-items: center;
    padding: 0 12px;
    justify-content: ${(props): FlattenInterpolation<ThemeProps> | false => props.justifyContent};
    ${(props): FlattenInterpolation<ThemeProps> | false =>
      props.type === buttonType[props.type] &&
      css`
        &.ant-btn {
          svg {
            fill: ${(color): string => color.theme.palette['grey-600']};
          }
        }
      `}
    ${(props): FlattenSimpleInterpolation | false =>
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
            margin: 0 4px 0 4px;
          }
        }
      `}
    ${(props): FlattenSimpleInterpolation | false =>
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
    ${(props): FlattenSimpleInterpolation | false =>
      props.mode === 'label-icon' &&
      css`
        &.ant-btn {
          padding-right: 0;
          > div {
            margin: ${leftIcon};
          }
        }
      `}
    ${(props): FlattenSimpleInterpolation | false =>
      props.mode === 'icon-label' &&
      css`
        &.ant-btn {
          padding-left: 0;
          > div {
            margin: ${rightIcon};
          }
        }
      `}
    ${(props): FlattenSimpleInterpolation | false =>
      props.mode === 'single-icon' &&
      css`
        &.ant-btn {
          padding: 0;
          > div {
            margin: 0 4px 0 4px;
          }
        }
      `}
    ${(props): FlattenSimpleInterpolation | false => css`
      &.ant-btn {
        box-shadow: none;
        &:focus {
          box-shadow: inset 0 0 0 1px ${props.theme.palette['blue-700']};
        }
      }
    `}
  }
`;
