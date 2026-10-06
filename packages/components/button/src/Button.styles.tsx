import styled, { css, keyframes } from 'styled-components';

import { IconContainer } from '@synerise/ds-icon';
import DSTag from '@synerise/ds-tag';
import {
  type CustomColorShade,
  resolveCustomColor,
  toCssSize,
} from '@synerise/ds-utils';

import BaseButton from './BaseButton';
import { getVariantStyles } from './Button.variants';

export const RIPPLE_ANIMATION_TIME = 500;
export const ACTIVE_DELAY = 200;

const leftIcon = '0 4px 0 8px';
const rightIcon = '0 8px 0 4px';
const rippleInitialSize = 20;

const splitTypes = ['secondary', 'tertiary'];

// Resolve a categorical `customColor`/`iconColor` family ('red', 'blue', …) to its reversible,
// theme-aware custom-colour token at `shade`: a bare family maps to that shade, an explicit hex/var
// passes through, an unmapped value falls back to the default red family (the `color` default).
const customColorToken = (
  color: string | undefined,
  shade: CustomColorShade,
): string =>
  resolveCustomColor(
    color,
    resolveCustomColor('red', 'transparent', { defaultShade: shade }),
    {
      defaultShade: shade,
      passthroughResolved: true,
    },
  );

// `single-icon` is a square button, so its width has to track `size` exactly as the height does via
// `ant-btn-lg` / `ant-btn-sm`. Resolving it in JS rather than as a second CSS rule is deliberate:
// the previous override lost the cascade to the base rule's `:not(.ds-expander)` and was dead for
// years. One declaration cannot be outranked.
const SINGLE_ICON_WIDTHS: Record<string, string> = {
  small: '28px',
  large: '48px',
};
const SINGLE_ICON_DEFAULT_WIDTH = '32px';

const singleIconWidth = ({
  block,
  size,
}: Pick<StyledButtonProps, 'block' | 'size'>): string => {
  if (block) {
    return '100%';
  }
  return (size && SINGLE_ICON_WIDTHS[size]) || SINGLE_ICON_DEFAULT_WIDTH;
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
  box-shadow: inset 0 0 0 0 transparent;
`;

export const Tag = styled(DSTag)`
  margin: 0 0 0 8px;
  flex: 0 0 auto;
`;

export const ButtonLabel = styled.div<{ withTooltip?: boolean }>`
  display: flex;
  align-items: center;
  flex-grow: 1;
  min-width: 0;
  z-index: 1;
  position: relative;
  justify-content: center;
  ${(props) =>
    props.withTooltip &&
    `
    && {
      pointer-events: all;
    }`}
`;
type StyledButtonProps = {
  mode?: string;
  groupVariant?: string;
  iconColor?: string;
  error?: boolean;
  customColor?: string;
  readOnly?: boolean;
  type: string;
  size?: string;
  block?: boolean;
  loading?: boolean | { delay?: number };
  fluidMinWidth?: string | number;
};

export const StyledButton = styled(BaseButton)<StyledButtonProps>`
  && {
    ${(props) => getVariantStyles(props.type, props.theme.palette)}
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    display: inline-flex;
    align-items: center;
    padding: 0 12px;
    position: relative;
    overflow: hidden;

    ${ButtonLabel} > *:not(.btn-focus) {
      position: relative;
      z-index: 1;
    }
    ${ButtonLabel} > .ds-icon,
    > .ds-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      width: 24px;
      height: 24px;
    }

    ${(props) =>
      props.mode !== 'single-icon' &&
      css`
        &.ant-btn:not(.ds-expander):not(.ds-button-creator):not(
            .btn-search
          ):not(.btn-search-open) {
          min-width: 54px;
        }
      `}

    &&.ant-btn-default:not(.ds-expander):not(.ds-button-creator):not(.read-only):not([disabled]),
    &&.ant-btn-secondary:not(.ds-expander):not(.ds-button-creator):not(.read-only):not([disabled]) {
      .btn-ripple {
        background-color: var(--ds-color-background-brand-subtlehover);
      }
      &.pressed {
        color: var(--ds-buttons-variant-secondary-text-active);
        background: var(--ds-buttons-variant-secondary-bg-active);
        &.ant-btn .btn-focus {
          box-shadow: inset 0 0 0 1px var(--ds-color-border-brand-strong);
        }
        ${ButtonLabel} > .ds-icon:before {
          background-color: ${(props): string =>
            props.theme.palette['blue-200']};
        }
      }
      &:focus-visible:not(.pressed) {
        color: ${(props): string =>
          props.error
            ? 'var(--ds-color-text-danger-default)'
            : 'var(--ds-buttons-variant-secondary-text-focus)'};
        background: var(--ds-buttons-variant-secondary-bg-focus);
      }
      &:hover:not(:disabled):not(:focus-visible):not(.pressed) {
        background-color: var(--ds-buttons-variant-secondary-bg-hover);
        &.ant-btn .btn-focus {
          box-shadow: inset 0 0 0 1px var(--ds-color-border-brand-strong);
        }
        ${ButtonLabel} > .ds-icon:before {
          background-color: ${(props): string =>
            props.theme.palette['blue-200']};
        }
      }
    }
    ${(props) =>
      props.readOnly &&
      props.type !== 'custom-color-ghost' &&
      css`
        &&.ant-btn {
          cursor: default;
          transition: none;
        }
        &&.ant-btn-secondary {
          &:hover,
          &:focus-visible {
            background: var(--ds-buttons-variant-secondary-bg-default);
            .btn-focus {
              box-shadow: inset 0 0 0 1px
                var(--ds-buttons-variant-secondary-border-default);
            }
            color: var(--ds-buttons-variant-secondary-text-default);
          }
        }
        &&.ant-btn-primary {
          &:hover,
          &:focus-visible {
            background: var(--ds-buttons-variant-primary-bg-default);
            .btn-focus {
              box-shadow: inset 0 0 0 1px
                var(--ds-buttons-variant-primary-bg-default);
            }
            color: var(--ds-buttons-variant-primary-text-default);
          }
        }
        &&.ant-btn-tertiary {
          &:hover,
          &:focus-visible {
            background: var(--ds-buttons-variant-tertiary-bg-default);
            .btn-focus {
              box-shadow: none;
            }
            color: var(--ds-buttons-variant-tertiary-text-default);
          }
        }
        &&.ant-btn-tertiary-white {
          &:hover,
          &:focus-visible {
            background: var(--ds-buttons-variant-tertiary-white-bg-default);
            .btn-focus {
              box-shadow: none;
            }
            color: var(--ds-buttons-variant-tertiary-white-text-default);
          }
        }
        &&.ant-btn-ghost-primary {
          &:hover,
          &:focus-visible {
            background: var(--ds-buttons-variant-ghost-primary-bg-default);
            .btn-focus {
              box-shadow: none;
            }
            color: var(--ds-buttons-variant-ghost-primary-text-default);
          }
        }
        &&.ant-btn-ghost {
          &:hover,
          &:focus-visible {
            background: var(--ds-buttons-variant-ghost-secondary-bg-default);
            .btn-focus {
              box-shadow: none;
            }
            color: var(--ds-buttons-variant-ghost-secondary-text-default);
          }
        }
        &&.ant-btn-ghost-white {
          &:hover,
          &:focus-visible {
            background: var(
              --ds-buttons-variant-ghost-secondary-white-bg-default
            );
            .btn-focus {
              box-shadow: none;
            }
            color: var(--ds-buttons-variant-ghost-secondary-white-text-default);
          }
        }
        &&.ant-btn-danger {
          &:hover,
          &:focus-visible {
            background: var(--ds-buttons-variant-primary-danger-bg-default);
            .btn-focus {
              box-shadow: none;
            }
            color: var(--ds-buttons-variant-primary-danger-text-default);
          }
        }
        &&.ant-btn-success {
          &:hover,
          &:focus-visible {
            background: var(--ds-buttons-variant-primary-success-bg-default);
            .btn-focus {
              box-shadow: none;
            }
            color: var(--ds-buttons-variant-primary-success-text-default);
          }
        }
        &&.ant-btn-warning {
          &:hover,
          &:focus-visible {
            background: var(--ds-buttons-variant-primary-warning-bg-default);
            .btn-focus {
              box-shadow: none;
            }
            color: var(--ds-buttons-variant-primary-warning-text-default);
          }
        }
      `}
    ${(props) =>
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
    ${(props) =>
      props.iconColor &&
      css`
        &.ant-btn:not(:disabled) {
          color: ${customColorToken(props.iconColor, '600')};
          &:hover {
            color: inherit;
          }
        }
      `}
    ${(props) =>
      props.mode === 'split' &&
      css`
        &.ant-btn {
          padding-right: 0;
          transition: 0s;
          ${ButtonLabel} {
            position: relative;
          }
          ${ButtonLabel} > .ds-icon {
            margin: 0 4px 0 15px;
            position: relative;
            &:before {
              content: '';
              background-color: ${
                !splitTypes.includes(props.type)
                  ? `rgba(255, 255, 255, 0.15);`
                  : 'var(--ds-color-border-base-strong)'
              };
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
    ${(props) =>
      props.mode === 'two-icons' &&
      css`
        &.ant-btn {
          padding: 0;
          transition: 0s;
          ${ButtonLabel} > ${IconContainer}:first-of-type,
          ${ButtonLabel} > .ds-icon:first-of-type,
          & > ${IconContainer}:first-of-type,
          & > .ds-icon:first-of-type {
            margin: ${leftIcon};
          }
          ${ButtonLabel} > ${IconContainer}:nth-of-type(2),
          ${ButtonLabel} > .ds-icon:nth-of-type(2),
          & > ${IconContainer}:nth-of-type(2),
          & > .ds-icon:nth-of-type(2) {
            margin: ${rightIcon};
          }
        }

        ${Tag} {
          margin: 0 12px 0 0;
        }
      `}
    ${(props) =>
      props.mode === 'label-icon' &&
      css`
        &.ant-btn {
          padding-right: 0;
          transition: 0s;
          ${ButtonLabel} > ${IconContainer},
          ${ButtonLabel} > .ds-icon,
          & > ${IconContainer},
          & > .ds-icon {
            margin: ${rightIcon};
          }
        }
        ${Tag} {
          margin: 0 12px 0 0;
        }
      `}
    ${(props) =>
      props.mode === 'icon-label' &&
      css`
        &.ant-btn {
          padding-left: 0;
          transition: 0s;
          ${ButtonLabel} > ${IconContainer}, ${ButtonLabel} > .ds-icon,
          & > ${IconContainer}, & > .ds-icon {
            margin: ${leftIcon};
          }
        }
      `}
    ${(props) =>
      props.mode === 'single-icon' &&
      css`
        &.ant-btn:not(.ds-expander) {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition: 0s;
          width: ${singleIconWidth(props)};

          ${ButtonLabel} > ${IconContainer},
          ${ButtonLabel} > .ds-icon,
          & > ${IconContainer},
          & > .ds-icon {
            margin: 0 4px 0 4px;
          }
        }
      `}
    ${(props) =>
      props.groupVariant === 'squared' &&
      css`
        &.ant-btn {
          border-radius: 0;
        }
      `}
    ${(props) =>
      props.groupVariant === 'left-rounded' &&
      css`
        &.ant-btn {
          border-radius: 3px 0 0 3px;
        }
      `}
    ${(props) =>
      props.groupVariant === 'right-rounded' &&
      css`
        &.ant-btn {
          border-radius: 0 3px 3px 0;
        }
      `}

      ${(props) =>
        props.error &&
        css`
        &.ant-btn {
          background-color: var(--ds-buttons-error-bg-default);
          box-shadow: inset 0 0 0 1px var(--ds-buttons-error-border);
          color: var(--ds-buttons-error-text-default);
          .btn-focus {
            box-shadow: none;
          }
          &&:hover:not(:disabled):not(:focus-visible):not(.pressed) {
            background-color: var(--ds-buttons-error-bg-hover);
            box-shadow: inset 0 0 0 1px var(--ds-buttons-error-border);
            color: var(--ds-buttons-error-text-default);
          }
          &.pressed {
            background-color: var(--ds-buttons-error-bg-pressed);
            box-shadow: none;
            color: var(--ds-buttons-error-text-pressed);
          }
          &&:focus-visible:not(.pressed) {
            border: none !important;
            background-color: var(--ds-buttons-error-bg-default);
            color: var(--ds-buttons-error-text-default);
            .btn-focus {
              box-shadow: inset 0 0 0 2px var(--ds-color-focus-base-default);
            }
          }
        }
        ${RippleEffect} {
          background-color: var(--ds-buttons-error-bg-pressed);
        }
      `}
          ${(props) =>
            props.error &&
            props.type === 'secondary' &&
            css`
        &&&.ant-btn {
          color: var(--ds-buttons-error-text-default);
          .btn-focus {
            box-shadow: none;
          }

          &&&:hover {
            background-color: var(--ds-buttons-error-bg-hover);
            .btn-focus {
              box-shadow: none;
            }
          }
          &&&:focus-visible:not(.pressed) {
            .btn-focus {
              box-shadow: inset 0 0 0 2px var(--ds-color-focus-base-default);
            }
          }
          &&&.pressed {
            background-color: var(--ds-buttons-error-bg-pressed);
            color: var(--ds-buttons-error-text-pressed);
          }
          ${RippleEffect} {
            background-color: var(--ds-buttons-error-bg-pressed);
          }
        }
      `}


    ${(props) =>
      props.type === 'custom-color' &&
      !props.error &&
      css`
        &.ant-btn {
          background-color: ${customColorToken(props.customColor, '600')};
          border: 0 solid transparent;
          color: var(--ds-buttons-variant-custom-color-text-default);

          ${ButtonFocus} {
            box-shadow: inset 0 0 0 0px transparent;
          }

          ${RippleEffect} {
            background-color: ${customColorToken(props.customColor, '700')};
          }

          &:focus-visible:not(.read-only) {
            ${ButtonFocus} {
              box-shadow: inset 0 0 0 2px var(--ds-color-focus-base-default);
            }
          }

          &:hover:not(:disabled):not(:focus-visible):not(.pressed) {
            background-color: ${
              props.readOnly
                ? customColorToken(props.customColor, '600')
                : customColorToken(props.customColor, '500')
            };
            color: var(--ds-buttons-variant-custom-color-text-hover);
          }

          &.pressed {
            background-color: ${customColorToken(props.customColor, '700')};
            color: var(--ds-buttons-variant-custom-color-text-active);
          }

          &:disabled {
            opacity: var(--ds-buttons-disabled-opacity);
            background-color: ${customColorToken(props.customColor, '600')};
            color: var(--ds-buttons-variant-custom-color-text-disabled);
          }
        }
      `}
      ${(props) =>
        props.type === 'custom-color-ghost' &&
        !props.error &&
        css`
        && {
          color: ${customColorToken(props.customColor, '600')};
          &:hover:not(:disabled) {
            color: ${customColorToken(props.customColor, '600')};
          }
          &:disabled {
            opacity: var(--ds-buttons-disabled-opacity);
            color: ${customColorToken(props.customColor, '600')};
          }
        }
      `}
        ${(props) =>
          props.readOnly &&
          props.type === 'custom-color-ghost' &&
          css`
        &&.ant-btn {
          cursor: default;
          transition: none;
        }
        &&.ant-btn-custom-color-ghost {
          &:hover,
          &:focus-visible {
            background: var(--ds-color-background-base-default);
            .btn-focus {
              box-shadow: inset 0 0 0 0 var(--ds-color-background-base-default);
            }
            color: ${customColorToken(props.customColor, '600')};
          }
        }
      `}

    &:hover:not(:disabled):not(:focus-visible):not(.pressed) {
      ${Tag} span {
        color: var(--ds-color-text-base-onsolid);
        cursor: inherit;
      }
    }

    ${(props) =>
      props.fluidMinWidth !== undefined &&
      css`
        ${ButtonLabel} {
          min-width: ${toCssSize(props.fluidMinWidth)};
          max-width: none;
        }
      `}
  }
`;
