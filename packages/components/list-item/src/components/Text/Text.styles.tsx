import { type ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { IconContainer } from '@synerise/ds-icon';

import { LIST_ITEM_SIZE_MAPPING } from '../../ListItem.const';
import { type ItemSize } from '../../ListItem.types';
import { INDENT_WIDTH } from './ItemLabel.const';

const TRANSITION_FN = '0.2s ease-out';

const hiddenElementStyle = () => css`
  opacity: 0;
  pointer-events: none;
`;

const visibleElementStyle = () => css`
  opacity: 1;
  pointer-events: all;
`;

type StyledListItemProps = {
  disabled?: boolean;
  selected?: boolean;
  prefixel?: ReactNode;
  suffixel?: boolean;
  ordered?: boolean;
  active?: boolean;
  indentLevel?: number;
  visible?: boolean;
  highlight?: boolean;
  noHover?: boolean;
  inTooltip?: boolean;
  size?: ItemSize;
  featured?: boolean;
};

export const SuffixWrapper = styled.div<{
  visible?: boolean;
  disabled?: boolean;
}>`
  display: flex;
  order: 10;
  justify-content: flex-end;
  ${(props) => (props.visible ? visibleElementStyle() : hiddenElementStyle())};
`;

export const PrefixWrapper = styled.div<{
  visible?: boolean;
  disabled?: boolean;
}>`
  display: flex;
  order: 1;
  ${(props) => (props.visible ? visibleElementStyle() : hiddenElementStyle())};
  transition: opacity ${TRANSITION_FN};
  margin-top: -7px;
  margin-bottom: -7px;
  margin-left: -4px;
  margin-right: 12px;
  align-items: center;
`;
export const Highlight = styled.span``;

const getPaddingFromIndentLevel = (indentLevel = 0) => {
  return indentLevel * INDENT_WIDTH;
};
const calculatePadding = (indentLevel = 0, withPrefixel = false) => {
  return getPaddingFromIndentLevel(indentLevel) + (withPrefixel ? 8 : 12);
};

const baseStyles = css<StyledListItemProps>`
  display: flex;
  align-items: center;
  margin: 0;
  padding-left: ${(props) =>
    calculatePadding(props.indentLevel, !!props.prefixel)}px;

  padding-right: 12px;
  font-size: 13px;
  line-height: 1.39;
  font-weight: 500;
  user-select: none;
  border-radius: 3px;
  transition:
    background-color 0.2s ease-out,
    color 0.2s ease-out;
  min-height: ${(props) => LIST_ITEM_SIZE_MAPPING[props.size || 'default']}px;
  background: ${(props) => props.theme.palette.white};
  border: none;
  color: ${(props) => props.theme.palette['grey-700']};
  cursor: pointer;
  opacity: 1;
`;

export const ArrowRight = styled.div`
  order: 3;
`;

export const Inner = styled.div`
  flex-grow: 1;
  min-width: 0;
  &::after {
    content: '';
    flex-grow: 1;
    order: 4;
  }
`;

const selectedStyle = css<StyledListItemProps>`
  background: ${(props) => props.theme.palette['blue-050']};
  color: ${(props) => props.theme.palette['blue-600']};
  ${PrefixWrapper} {
    svg {
      fill: ${(props) => props.theme.palette['blue-600']};
    }
  }
`;

const highlightStyle = css`
  font-weight: 400;
  .ds-list-item-highlight {
    font-weight: 600;
  }
`;

const orderedStyle = css`
  &::before {
    content: none;
  }
`;
export const Content = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  order: 2;
`;

export const Wrapper = styled.div<StyledListItemProps>`
  display: flex;
  min-width: 173px;
  ${(props) =>
    props.inTooltip &&
    css`
      height: 100%;
    `}

  ${({ featured, disabled, selected, theme }) =>
    featured &&
    css`
      && {
        ${PrefixWrapper} > .ds-icon > svg,
      ${PrefixWrapper} ${IconContainer} > svg,
      ${SuffixWrapper} > .ds-icon > svg,
      ${SuffixWrapper} ${IconContainer} > svg,
      ${ArrowRight} svg,
      ${Content} {
          fill: ${theme.palette['blue-600']};
          color: ${theme.palette['blue-600']};
        }
      }

      &:hover,
      &:active,
      &:focus-visible:not(:active) {
        && {
          ${PrefixWrapper} > .ds-icon > svg,
        ${PrefixWrapper} ${IconContainer} > svg,
        ${SuffixWrapper} > .ds-icon > svg,
        ${SuffixWrapper} ${IconContainer} > svg,
        ${ArrowRight} svg,
        ${Content} {
            fill: ${theme.palette['blue-700']};
            color: ${theme.palette['blue-700']};
          }

          &:focus-visible:not(:active) ${Inner} {
            box-shadow: inset 0 0 0 2px ${theme.palette['blue-700']};
          }
        }
      }

      ${disabled &&
      css`
        &:hover {
          && {
            ${PrefixWrapper} > .ds-icon > svg,
          ${PrefixWrapper} ${IconContainer} > svg,
          ${SuffixWrapper} > .ds-icon > svg,
          ${SuffixWrapper} ${IconContainer} > svg,
          ${Content} {
              fill: ${theme.palette['blue-600']};
              color: ${theme.palette['blue-600']};
            }
          }
        }
      `}

      ${selected &&
      css`
        &:hover {
          && {
            ${PrefixWrapper} > .ds-icon > svg,
          ${PrefixWrapper} ${IconContainer} > svg,
          ${SuffixWrapper} > .ds-icon > svg,
          ${SuffixWrapper} ${IconContainer} > svg,
          ${Content} {
              fill: ${theme.palette['blue-700']};
              color: ${theme.palette['blue-700']};
            }
          }
        }
      `}
    `}
  ${(props) =>
    props.disabled
      ? css`
          cursor: not-allowed;
          opacity: 0.4;
          svg {
            fill: ${props.theme.palette['grey-600']};
          }
          &:hover {
            ${ArrowRight} {
              opacity: 1;
              svg {
                fill: ${props.theme.palette['grey-600']};
              }
            }
          }
        `
      : css`
		      ${PrefixWrapper} > .ds-icon > svg {
            fill: ${props.theme.palette['grey-600']};
          }
          &:hover {
            ${Inner} {
              background: ${props.theme.palette['grey-050']};
              ${
                !props.noHover &&
                css`
                  & {
                    color: ${props.noHover
                      ? props.theme.palette['grey-700']
                      : props.theme.palette['blue-600']};
                  }

                  ${PrefixWrapper} {
                    ${IconContainer} > svg {
                      fill: ${props.theme.palette['blue-600']};
                    }
                  }
                  ${ArrowRight} {
                    opacity: 1;
                    svg {
                      fill: ${props.theme.palette['blue-600']};
                    }
                  }
                `
              };
            }
          }
          &:focus-visible:not(:active) {
            ${Inner} {
              box-shadow: inset 0 0 0 2px ${props.theme.palette['blue-600']};
            }
          }

          &:focus-visible:active,
          &:active {
            ${Inner} {
              background: ${props.theme.palette['blue-050']};
              ${
                !props.noHover &&
                css`
                  color: ${props.theme.palette['blue-600']};

                  ${PrefixWrapper} {
                    ${IconContainer} > svg {
                      fill: ${props.theme.palette['blue-600']};
                    }
                  }
                `
              }
            }
          }
        }
    `}

  ${Inner} {
    ${(props) =>
      props.ordered &&
      css`
        &::before {
          font-weight: 400;
          color: ${props.theme.palette['grey-500']};
          counter-increment: ds-list-items 1;
          content: '0' counter(ds-list-items) '.  \\00A0';
        }
      `}
    ${baseStyles}

    ${ArrowRight} {
      transition: all ${TRANSITION_FN};
      opacity: ${(props) => (props.disabled ? '1' : '0')};
    }

    ${(props) => props.selected && selectedStyle}

    &.ant-menu-item-selected,
    &.-item-selected {
      ${selectedStyle}
    }

    ${(props) => props.highlight && highlightStyle}
    ${(props) => !props.ordered && orderedStyle}
    
    .ds-checkbox,
    .ds-checkbox > .ant-checkbox-wrapper {
      padding: 0;
    }
  }
`;

export const Divider = styled.div`
  flex-grow: 1;
`;

export const DynamicLabelMain = styled.div``;

export const DynamicLabelAlternate = styled.div``;

export const DynamicLabelWrapper = styled.div<{ showAlternative?: boolean }>`
  ${(props) =>
    props.showAlternative
      ? css`
          ${DynamicLabelMain} {
            height: 0;
            visibility: hidden;
          }
          ${DynamicLabelAlternate} {
            height: auto;
            visibility: visible;
          }
        `
      : css`
          ${DynamicLabelMain} {
            height: auto;
            visibility: visible;
          }
          ${DynamicLabelAlternate} {
            height: 0;
            visibility: hidden;
          }
        `}
`;

export const Description = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${(props) => props.theme.palette['grey-600']};
  font-weight: normal;
  line-height: 1.39;
  font-size: 13px;
  width: 100%;
`;
