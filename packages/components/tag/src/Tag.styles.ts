import styled, { css } from 'styled-components';

import type { ThemeProps } from '@synerise/ds-core';
import { resolveCustomColor } from '@synerise/ds-utils';

import { TagShape } from './Tag.types';

/**
 * DS-specific styling props that must NOT be forwarded to the DOM element.
 * `dashed` is intentionally consumed-and-ignored (deprecated) — the dashed border is
 * applied by ds-status's styled(Tag) wrapper, not Tag itself; kept only for API compat.
 */
const dsProps = new Set([
  'isStatusShape',
  'shape',
  'color',
  'textColor',
  'removable',
  'disabled',
  'isActionable',
  'suffixel',
  'preffixel',
  'iconHover',
  'asPill',
  'dashed',
  'isHovered',
]);

const defaultStatusStyles = css`
  border-radius: 9px;
  font-size: 10px;
  height: 18px;
  font-weight: 500;
  line-height: 18px;
  text-transform: uppercase;
  letter-spacing: 0.1px;
  padding: 0 8px;
  line-height: 18px;
`;
const LIGHT_GREY = resolveCustomColor('grey-200');

const isLightGrey = (color?: string, theme?: ThemeProps['theme']): boolean =>
  !!color &&
  (color === LIGHT_GREY || color === theme?.tokens['--ds-color-grey-200']);

// Text pairs with the tag body. No `color` → the body is the grey variant, so
// the text is the grey variant token too (`textColor` does not apply). A custom
// `color` → `textColor`, else the colour variant's text token, or muted text on
// a light-grey body where white would not read.
export const getColorText = (
  color?: string,
  textColor?: string,
  theme?: ThemeProps['theme'],
): string => {
  if (!color) {
    return 'var(--ds-tag-variant-gray-text)';
  }
  if (textColor) {
    return textColor;
  }
  return isLightGrey(color, theme)
    ? 'var(--ds-color-text-base-muted)'
    : 'var(--ds-tag-variant-color-text)';
};

const LABEL_PADDING = 12;
export const HUG_PADDING = 4;
const BADGE_GAP = 4;
export const REMOVE_BUTTON_SIZE = 24;
const PREFIXEL_SLOT_SIZE = 24;
const PREFIXEL_IMAGE_SIZE = 16;

type InsertShapeStyles = {
  shape?: TagShape;
  textColor?: string;
  color?: string;
  removable?: boolean;
  isActionable?: boolean;
  preffixel?: boolean;
  suffixel?: boolean;
  isHovered?: boolean;
} & ThemeProps;

const getFilterColor = (props: TagProps): string => {
  if (props.iconHover) {
    return 'brightness(100%)';
  }
  if (isLightGrey(props.color, props.theme)) {
    return 'brightness(90%)';
  }
  return 'brightness(110%)';
};
// No `color` (and not a small pill shape) → the body is the grey variant, so hover
// swaps to its hover token. A custom `color` has no hover token: keep the filter.
const usesGrayVariant = (props: TagProps): boolean =>
  !props.color &&
  props.shape !== TagShape.SMALL_SQUARE &&
  props.shape !== TagShape.SMALL_ROUND;
const getHoverStyles = (props: TagProps): string =>
  usesGrayVariant(props)
    ? 'background-color: var(--ds-tag-variant-gray-bg-hover);'
    : `filter: ${getFilterColor(props)};`;
const addonStyles = (): string => `
  border: 1px solid;
  border-radius: 10px;
  height: 50%;
  padding: 0 3px;
  border-color: var(--ds-color-background-base-default);
  font-size: 9px;
  line-height: 10px;
  text-align: center;
`;

export const TagName = styled.span`
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const RemoveButton = styled.div`
  /* The ✕ matches the tag text: inherit what getColorText (or textColor) set on the tag. */
  color: inherit;
  display: none;
  flex: 0 0 ${REMOVE_BUTTON_SIZE}px;
  height: ${REMOVE_BUTTON_SIZE}px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: var(--ds-tag-remove-opacity);

  &&&:hover {
    .ds-icon {
      color: var(--ds-tag-remove-icon);
    }
  }
`;

// The ✕ takes the suffixel's place, so it gets the suffixel's 4px padding.
const defaultShapeStyles = (props: InsertShapeStyles, borderRadius: string) => {
  const showRemove = props.isActionable && props.isHovered;
  return css`
    color: ${getColorText(props.color, props.textColor, props.theme)};
    border-radius: ${borderRadius};
    font-size: 13px;
    height: 24px;
    line-height: 24px;
    padding-left: ${props.preffixel ? HUG_PADDING : LABEL_PADDING}px;
    padding-right: ${props.suffixel || showRemove ? HUG_PADDING : LABEL_PADDING}px;

    ${
      showRemove &&
      css`
        ${SuffixWrapper}, ${DefaultSuffixWrapper} {
          display: none;
        }
        ${RemoveButton} {
          display: flex;
        }
      `
    }
  `;
};

const insertShapeStyles = (props: InsertShapeStyles) => {
  switch (props.shape) {
    case TagShape.SMALL_SQUARE:
      return css`
        color: ${props.textColor || 'var(--ds-tag-pill-text)'};
        border-radius: 3px;
        font-size: 10px;
        height: 14px;
        line-height: 14px;
        text-transform: uppercase;
        font-weight: 500;
        letter-spacing: 0.1px;
        padding: 0 4px;
      `;

    case TagShape.SMALL_ROUND:
      return css`
        color: ${props.textColor || 'var(--ds-tag-pill-text)'};
        border-radius: 8px;
        font-size: 10px;
        height: 14px;
        line-height: 14px;
        text-transform: uppercase;
        letter-spacing: 0.1px;
        padding: 0 4px;
      `;

    case TagShape.MEDIUM_ROUND:
      return css`
        color: ${getColorText(props.color, props.textColor, props.theme)};
        ${defaultStatusStyles}
      `;

    case TagShape.DEFAULT_ROUND:
      return defaultShapeStyles(props, '12px');

    case TagShape.DEFAULT_SQUARE:
      return defaultShapeStyles(props, '3px');

    case TagShape.SINGLE_CHARACTER_ROUND:
      return css`
        color: ${getColorText(props.color, props.textColor, props.theme)};
        border-radius: 12px;
        font-size: 13px;
        height: 24px;
        width: 24px;
        line-height: 24px;
        justify-content: center;
      `;

    case TagShape.SINGLE_CHARACTER_SQUARE:
      return css`
        color: ${getColorText(props.color, props.textColor, props.theme)};
        border-radius: 3px;
        font-size: 13px;
        height: 24px;
        width: 24px;
        line-height: 24px;
        justify-content: center;
      `;

    case TagShape.STATUS_NEUTRAL:
      return css`
        border: 1px solid
          ${props.color || 'var(--ds-status-pill-variant-neutral-border-solid)'};
        color: ${
          props.textColor ||
          props.color ||
          'var(--ds-status-pill-variant-neutral-text)'
        };
        ${defaultStatusStyles}
      `;

    case TagShape.STATUS_SUCCESS:
      return css`
        border: 1px solid var(--ds-status-pill-variant-success-border-solid);
        color: var(--ds-status-pill-variant-success-text);
        ${defaultStatusStyles}
      `;

    case TagShape.STATUS_ERROR:
      return css`
        border: 1px solid var(--ds-status-pill-variant-error-border-solid);
        color: var(--ds-status-pill-variant-error-text);
        ${defaultStatusStyles}
      `;

    case TagShape.STATUS_WARNING:
      return css`
        border: 1px solid var(--ds-status-pill-variant-warning-border-solid);
        color: var(--ds-status-pill-variant-warning-text);
        ${defaultStatusStyles}
      `;

    default:
      return css``;
  }
};

type TagProps = {
  isStatusShape?: boolean;
  shape?: TagShape;
  color?: string;
  textColor?: string;
  removable?: boolean;
  disabled?: boolean;
  isActionable?: boolean;
  suffixel?: boolean;
  preffixel?: boolean;
  iconHover?: boolean;
  isHovered?: boolean;
  asPill?: boolean;
  dashed?: boolean;
} & ThemeProps;

export const Content = styled.div.withConfig({
  shouldForwardProp: (prop) => !dsProps.has(prop as string),
})<{ iconHover?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 1;
  min-width: 0;
  max-width: 100%;
  ${(props) =>
    !!props.iconHover &&
    `
    &&& {
     color: var(--ds-color-text-danger-default);
   }
`}
`;
export const PrefixWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !dsProps.has(prop as string),
})<{ iconHover?: boolean }>`
  ${addonStyles()};
  margin-right: ${BADGE_GAP}px;
  ${(props) =>
    !!props.iconHover &&
    `.ds-badge-scroll-number{
    color: var(--ds-color-text-danger-default)!important;
    box-shadow: 0 0 0 1px var(--ds-color-border-danger-default)!important;
    }
  .ds-icon {
  color: var(--ds-color-icon-danger-default);
}`}
`;
export const SuffixWrapper = styled.div`
  ${addonStyles()};
  margin-left: ${BADGE_GAP}px;
`;
export const DefaultSuffixWrapper = styled.div`
  display: flex;
  align-items: center;

  > .ds-badge {
    margin-left: ${BADGE_GAP}px;
  }
`;
export const DefaultPrefixWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !dsProps.has(prop as string),
})<{ iconHover?: boolean }>`
  display: flex;
  align-items: center;

  > .ds-badge {
    margin-right: ${BADGE_GAP}px;
  }

  > img {
    display: block;
    width: ${PREFIXEL_IMAGE_SIZE}px;
    height: ${PREFIXEL_IMAGE_SIZE}px;
    margin: 0 ${(PREFIXEL_SLOT_SIZE - PREFIXEL_IMAGE_SIZE) / 2}px;
    object-fit: cover;
  }
  ${(props) =>
    !!props.iconHover &&
    `.ds-badge-scroll-number{
    color: var(--ds-color-text-danger-default)!important;
    box-shadow: 0 0 0 1px var(--ds-color-border-danger-default)!important;
    }
.ds-icon {
  color: var(--ds-color-icon-danger-default);
}`}
`;

export const Tag = styled.div.withConfig({
  shouldForwardProp: (prop) => !dsProps.has(prop as string),
})<TagProps>`
  position: relative;
  box-sizing: border-box;
  margin: 4px;
  display: inline-flex;
  font-weight: 500;
  overflow: hidden;
  cursor: default;

  ${(props) =>
    !props.asPill &&
    css`
      cursor: pointer;
      &:hover:before {
        ${getHoverStyles}
      }
    `}

  ${(props) => insertShapeStyles(props)};
  ${(props) =>
    !!props.iconHover &&
    `
    &&&:before{
     background-color: var(--ds-color-background-danger-subtle);
   }
`}

  ${(props) =>
    !!props.disabled &&
    css`
      opacity: var(--ds-tag-disabled-opacity);
      cursor: not-allowed;
    `}

  ${(props) =>
    !props.isStatusShape &&
    css`
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${
          props.color ||
          (props.shape === TagShape.SMALL_SQUARE ||
          props.shape === TagShape.SMALL_ROUND
            ? 'var(--ds-tag-pill-bg-gray)'
            : 'var(--ds-tag-variant-gray-bg-default)')
        };
      }

      ${
        props.isActionable &&
        css`
        &:hover:before {
          ${getHoverStyles}
        }
      `
      };
    `}
`;

export const DeleteButton = styled.div``;
