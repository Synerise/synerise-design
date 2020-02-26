import * as React from 'react';
import styled, { css, FlattenInterpolation, FlattenSimpleInterpolation, keyframes } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Button from 'antd/lib/button';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';

export const RIPPLE_ANIMATION_TIME = 500;

const leftIcon = '0 4px 0 8px';
const rightIcon = '0 8px 0 4px';
const rippleInitialSize = 20;

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

const rippleAnimation = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(20);
  }
`;

export const Spinner = styled.div`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: transparent;
  border-radius: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  ${IconContainer} {
    animation: ${spinnerAnimation} 1s forwards linear infinite;
  }
`;

export const RippleEffect = styled.span`
  && {
    display: flex;
    width: ${rippleInitialSize}px;
    height: ${rippleInitialSize}px;
    top: 50%;
    left: 50%;
    position: absolute !important;
    border-radius: 50%;
    padding: 0 !important;
    margin: -${rippleInitialSize / 2}px 0 0 -${rippleInitialSize / 2}px !important;
    z-index: 0;
    opacity: 0;
    visibility: visible !important;
    &.animate {
      opacity: 1;
      animation: ${rippleAnimation} ${RIPPLE_ANIMATION_TIME}ms ease-in;
      animation-iteration-count: 1;
    }
    &::after {
      display: none;
    }
  }
`;

export const ButtonFocus = styled.div`
  content: '';
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transition: box-shadow 0.3s ease;
  border-radius: inherit;
  z-index: 99;
  box-shadow: inset 0 0 0 0px transparent;
`;

// eslint-disable-next-line react/jsx-props-no-spreading
export default styled(({ mode, type, loading, justifyContent, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Button type={type} {...rest} />
))`  
  && {
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    border: 0;
    display: inline-flex;
    align-items: center;
    padding: 0 12px;
    position: relative;
    overflow: hidden;
    justify-content: ${(props): FlattenInterpolation<ThemeProps> | false => props.justifyContent};
    ${(props): FlattenInterpolation<ThemeProps> | false =>
      props.shape &&
      props.shape === 'circle' &&
      css`
        border-radius: 50%;
      `};
    > *:not(.btn-focus) {
      position: relative;
    }
    > .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      width: 24px;
      height: 24px;
    }
    ${(props): FlattenInterpolation<ThemeProps> | false =>
      props.loading &&
      css`
        > *:not(.btn-focus) {
          opacity: 0;
          visibility: hidden;
        }
        ${Spinner} {
          opacity: 1;
          visibility: visible;
        }
      `};
    ${(props): FlattenInterpolation<ThemeProps> | false =>
      props.type === buttonType[props.type] &&
      css`
        &.ant-btn {
          &:not(:disabled) {
            svg {
              fill: ${(color): string => color.theme.palette['grey-600']};
            }
          }
        }
      `}
    ${(props): FlattenSimpleInterpolation | false =>
      props.mode === 'split' &&
      css`
        &.ant-btn {
          padding-right: 0;
          > span:not(.btn-focus) {
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
          > ${IconContainer}, > .icon {
            margin: 0 4px 0 3px;
          }
        }
      `}
    ${(props): FlattenSimpleInterpolation | false =>
      props.mode === 'two-icons' &&
      css`
        &.ant-btn {
          padding: 0;
          > ${IconContainer}:first-of-type, > .icon:first-of-type {
            margin: ${leftIcon};
          }
          > ${IconContainer}:nth-of-type(2),
          > .icon:nth-of-type(2) {
            margin: ${rightIcon};
          }
        }
      `}
    ${(props): FlattenSimpleInterpolation | false =>
      props.mode === 'label-icon' &&
      css`
        &.ant-btn {
          padding-right: 0;
          > ${IconContainer}, > .icon {
            margin: ${rightIcon};
          }
        }
      `}
    ${(props): FlattenSimpleInterpolation | false =>
      props.mode === 'icon-label' &&
      css`
        &.ant-btn {
          padding-left: 0;
          > ${IconContainer}, > .icon {
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
          > ${IconContainer}, > .icon {
            margin: 0 4px 0 4px;
          }
        }
      `}
      ${(props): FlattenSimpleInterpolation | false =>
        props.mode === 'single-icon' &&
        props.size === 'large' &&
        css`
          &.ant-btn {
            width: 48px;
          }
        `}
    ${(props): FlattenSimpleInterpolation | false =>
      props.groupVariant === 'squared' &&
      css`
        &.ant-btn {
          border-radius: 0;
        }
      `}
    ${(props): FlattenSimpleInterpolation | false =>
      props.groupVariant === 'left-rounded' &&
      css`
        &.ant-btn {
          border-radius: 3px 0 0 3px;
        }
      `}
     ${(props): FlattenSimpleInterpolation | false =>
       props.groupVariant === 'right-rounded' &&
       css`
         &.ant-btn {
           border-radius: 0 3px 3px 0;
         }
       `}
  }
`;
