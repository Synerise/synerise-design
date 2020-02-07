import * as React from 'react';
import styled, { css, FlattenInterpolation, FlattenSimpleInterpolation, keyframes } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Button from 'antd/lib/button';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';

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

const spinnerAnimation = keyframes`
  from {
    transform: rotateZ(0deg);
  }
  
  to {
    transform: rotateZ(360deg);
  }
`;

export const Spinner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: inherit;
  border-radius: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  ${IconContainer} {
    animation: ${spinnerAnimation} 1s forwards linear infinite;
  }
`;

// eslint-disable-next-line react/jsx-props-no-spreading
export default styled(({ mode, type, loading, justifyContent, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Button type={type} loading={loading} {...rest} />
))`  
  && {
    border: 0;
    display: inline-flex;
    align-items: center;
    padding: 0 12px;
    justify-content: ${(props): FlattenInterpolation<ThemeProps> | false => props.justifyContent};
    ${(props): FlattenInterpolation<ThemeProps> | false =>
      props.spinner &&
      css`
        > * {
          visibility: hidden;
        }
        ${Spinner} {
          visibility: visible;
        }
      `};
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
            position: relative;
            &:after {
              content: '';
              background-color: ${props.type !== splitType[props.type]
                ? `rgba(255, 255, 255, 0.15);`
                : props.theme.palette['grey-300']};
              width: 1px;
              top: 0;
              bottom: 0;
              right: 0;
              position: absolute;
              transition: all 0.3s ease;
            }
          }
          > ${IconContainer} {
            margin: 0 4px 0 4px;
          }
          &:focus {
            &:not(:active) {
              & > span {
                &:after {
                  top: 1px;
                  bottom: 1px;
                }
              }
            }
          }
        }
      `}
    ${(props): FlattenSimpleInterpolation | false =>
      props.mode === 'two-icons' &&
      css`
        &.ant-btn {
          padding: 0;
          > ${IconContainer}:first-of-type {
            margin: ${leftIcon};
          }
          > ${IconContainer}:nth-of-type(2) {
            margin: ${rightIcon};
          }
        }
      `}
    ${(props): FlattenSimpleInterpolation | false =>
      props.mode === 'label-icon' &&
      css`
        &.ant-btn {
          padding-right: 0;
          > ${IconContainer} {
            margin: ${rightIcon};
          }
        }
      `}
    ${(props): FlattenSimpleInterpolation | false =>
      props.mode === 'icon-label' &&
      css`
        &.ant-btn {
          padding-left: 0;
          > ${IconContainer} {
            margin: ${leftIcon};
          }
        }
      `}
    ${(props): FlattenSimpleInterpolation | false =>
      props.mode === 'single-icon' &&
      css`
        &.ant-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          width: 32px;
          > ${IconContainer} {
            margin: 0 4px 0 4px;
          }
        }
      `}
    ${(props): FlattenSimpleInterpolation | false => css`
      &.ant-btn {
        box-shadow: none;
        &:focus {
          box-shadow: inset 0 0 0 2px ${props.theme.palette['blue-700']};
        }
      }
    `}
  }
`;
