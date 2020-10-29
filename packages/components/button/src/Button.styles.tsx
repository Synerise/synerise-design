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
const pressedStyles = (props: ThemeProps): FlattenSimpleInterpolation => css`
  color: ${props.theme.palette['blue-600']};
  background: ${props.theme.palette['blue-100']};
  svg {
    fill: ${props.theme.palette['blue-600']};
  }
  &.ant-btn .btn-focus {
    box-shadow: inset 0 0 0 1px ${props.theme.palette['blue-200']};
  }
  > span:not(.btn-focus) + .ds-icon:before {
    background-color: ${props.theme.palette['blue-200']};
  }
`;
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
export const AntdButton = styled(
  ({
    mode,
    type,
    loading,
    justifyContent,
    groupVariant,
    customColor,
    rightIconSize,
    leftIconSize,
    pressed,
    size,
    ...rest
  }) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Button type={type === 'custom-color-ghost' ? 'ghost-primary' : type} size={size} {...rest} />;
  }
)`  
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
    > .ds-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      width: 24px;
      height: 24px;
    }
    &&.ant-btn-secondary:not(.ds-expander):not(.ds-button-creator){
      &:active{
        ${(props): FlattenSimpleInterpolation => pressedStyles(props)}
      }
      &:focus:not(:active) {
              color: ${(props): string => props.theme.palette['blue-600']};
        svg {
          fill: ${(props): string => props.theme.palette['blue-600']};
        }
        background: ${(props): string => props.theme.palette['blue-050']};
      }
      &:hover:not(:disabled):not(:focus) {
        background-color:${(props): string => props.theme.palette['blue-050']};
        &.ant-btn .btn-focus {
        box-shadow: inset 0 0 0 1px ${(props): string => props.theme.palette['blue-200']};
        }
        > span:not(.btn-focus) +.ds-icon:before {
        background-color: ${(props): string => props.theme.palette['blue-200']};
        }
        ${(props): FlattenSimpleInterpolation => props.pressed && pressedStyles(props)}
      }
      &:active{
        color: ${(props): string => props.theme.palette['blue-600']};
        svg {
          fill: ${(props): string => props.theme.palette['blue-600']}; !important;
        }
      }
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
          }
          > span:not(.btn-focus) + .ds-icon {
            margin: 0 4px 0 3px;
            position: relative;
            &:before {
              content: '';
              background-color: ${props.type !== splitType[props.type]
                ? `rgba(255, 255, 255, 0.15);`
                : props.theme.palette['grey-300']};
              top: ${props.size === 'large' ? '-12px' : '-4px'};
              height: ${props.size === 'large' ? '48px' : '32px'};
              width: 1px;
              left: -4px;
              position: absolute;
              transition: all 0.3s ease;
            }
          }
        }
      `}
    ${(props): FlattenSimpleInterpolation | false =>
      props.mode === 'two-icons' &&
      css`
        &.ant-btn {
          padding: 0;
          > ${IconContainer}:first-of-type, > .ds-icon:first-of-type {
            margin: ${leftIcon};
          }
          > ${IconContainer}:nth-of-type(2),
          > .ds-icon:nth-of-type(2) {
            margin: ${rightIcon};
          }
        }
      `}
    ${(props): FlattenSimpleInterpolation | false =>
      props.mode === 'label-icon' &&
      css`
        &.ant-btn {
          padding-right: 0;
          > ${IconContainer}, > .ds-icon {
            margin: ${rightIcon};
          }
        }
      `}
    ${(props): FlattenSimpleInterpolation | false =>
      props.mode === 'icon-label' &&
      css`
        &.ant-btn {
          padding-left: 0;
          > ${IconContainer}, > .ds-icon {
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
          > ${IconContainer}, > .ds-icon {
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

    ${(props): FlattenSimpleInterpolation | false =>
      props.type === 'custom-color' &&
      css`
        &.ant-btn {
          background-color: ${props.theme.palette[`${props.customColor}-600`]};
          border: 0 solid transparent;

          span {
            color: ${props.theme.palette.white};
          }

          svg {
            color: ${props.theme.palette.white};
            fill: ${props.theme.palette.white};
          }

          ${ButtonFocus} {
            box-shadow: inset 0 0 0 0px transparent;
          }

          ${RippleEffect} {
            background-color: ${props.theme.palette[`${props.customColor}-700`]};
          }

          &:focus {
            ${ButtonFocus} {
              box-shadow: inset 0 0 0 2px ${props.theme.palette['blue-600']};
            }
          }

          &:hover:not(:disabled):not(:focus) {
            background-color: ${props.theme.palette[`${props.customColor}-500`]};
            span {
              color: ${props.theme.palette.white};
            }
            svg {
              color: ${props.theme.palette.white} !important;
              fill: ${props.theme.palette.white} !important;
            }
          }

          &:disabled {
            opacity: 0.4;
            background-color: ${props.theme.palette[`${props.customColor}-600`]};
            span {
              color: ${props.theme.palette.white};
            }

            svg {
              color: ${props.theme.palette.white} !important;
              fill: ${props.theme.palette.white} !important;
            }
          }
        }
      `}
      ${(props): FlattenSimpleInterpolation | false =>
        props.type === 'custom-color-ghost' &&
        css`
          color: ${props.theme.palette[`${props.customColor}-600`]};
          .ds-icon > svg {
            fill: ${props.theme.palette[`${props.customColor}-600`]};
          }
          &:hover:not(:disabled):not(:focus) {
            color: ${props.theme.palette[`${props.customColor}-500`]};
            span {
              color: ${props.theme.palette[`${props.customColor}-500`]};
            }
            svg {
              fill: ${props.theme.palette[`${props.customColor}-500`]} !important;
            }
          }
          &:disabled {
            opacity: 0.4;
            color: ${props.theme.palette[`${props.customColor}-600`]};
            .ds-icon > svg {
              fill: ${props.theme.palette[`${props.customColor}-600`]} !important;
            }
          }
        `}
  }
`;
