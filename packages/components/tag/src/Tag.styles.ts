import { ThemeProps, ThemePropsVars } from '@synerise/ds-core';
import styled, { css } from 'styled-components';
import { TagShape } from './Tag.types';

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
export const getColorText = (theme: ThemePropsVars, color?: string): string => {
  return color === theme.palette['grey-200'] ? theme.palette['grey-600'] : theme.palette.white;
};

type InsertShapeStyles = {
  shape?: TagShape;
  textColor?: string;
  color?: string;
  removable?: boolean;
  isActionable?: boolean;
  preffixel?: boolean;
  suffixel?: boolean;
  hasImage?: boolean;
} & ThemeProps;

const getWidthOnHover = (props: InsertShapeStyles): string => {
  if ((props.suffixel && props.preffixel) || props.hasImage) {
    return 'calc(100% - 23px)';
  }
  if (props.preffixel) {
    return 'calc(100% - 35px)';
  }
  if (props.suffixel) {
    return 'calc(100% - 4px)';
  }
  return 'calc(100% - 10px)';
};
const getFilterColor = (props: TagProps): string => {
  if (props.iconHover && props.color === props.theme.palette['grey-200']) {
    return 'brightness(100%)';
  }
  if (props.color === props.theme.palette['grey-200']) {
    return 'brightness(90%)';
  }
  if (props.iconHover) {
    return 'brightness(100%)';
  }
  return 'brightness(110%)';
};
const addonStyles = (props: ThemeProps): string => `
  border: 1px solid;
  border-radius: 10px;
  height: 50%;
  padding: 0 3px;
  border-color: ${props.theme.palette.white};
  font-size: 9px;
  line-height: 10px;
  text-align: center;
`;

export const TagName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const RemoveButton = styled.div`
  color: ${({ color, theme }) => getColorText(theme, color)};
  height: 18px;
  width: 18px;
  border-radius: 10px;
  padding: 0;
  border: none;
  outline: none;
  margin: 3px 3px 3px 5px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: none;
  opacity: 0.8;

  &:before {
    color: ${props => props.color || props.theme.palette['red-600']};
    filter: brightness(70%);
    opacity: 0.3;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &&&:hover {
    .ds-icon svg {
      fill: ${props => props.theme.palette['red-600']} !important;
    }
  }
  .icon {
    && {
      transform: translate(1px, -3px);
    }
  }
`;

const insertShapeStyles = (props: InsertShapeStyles) => {
  switch (props.shape) {
    case TagShape.SMALL_SQUARE:
      return css`
        color: ${props.textColor || '#fff'};
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
        color: ${props.textColor || '#fff'};
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
        color: ${props.textColor || getColorText(props.theme, props.color)};
        ${defaultStatusStyles}
      `;

    case TagShape.DEFAULT_ROUND:
      return css`
        color: ${props.textColor || getColorText(props.theme, props.color)};
        border-radius: 12px;
        font-size: 13px;
        height: 24px;
        line-height: 24px;

        padding: ${props.removable ? '0' : '0 12px'};

        ${TagName} {
          padding: ${props.removable ? '0 12px' : '0'};
          padding-left: ${props.removable && props.preffixel && '4px'};
          padding-right: ${props.removable && props.suffixel && '4px'};
        }

        ${props.isActionable &&
        css`
          &:hover {
            padding: ${props.removable && props.suffixel && '0 15px 0 0px'};

            ${TagName} {
              display: inline-block;
              padding: ${props.removable ? '0 7px 0 12px' : '0'};
              padding-left: ${props.removable && props.preffixel && '4px'};
              padding-right: ${props.removable && props.suffixel && '10px'};
              width: ${getWidthOnHover(props)};
            }
            padding-right: ${!props.suffixel && '5px'};

            ${RemoveButton} {
              margin-left: 0px;
              margin-right: ${props.suffixel ? '2px' : '-2px'};
              .icon {
                position: absolute;
                left: -3px;
                top: -3px;
              }
            }
          }
        `}
      `;

    case TagShape.DEFAULT_SQUARE:
      return css`
        color: ${props.textColor || getColorText(props.theme, props.color)};
        border-radius: 3px;
        font-size: 13px;
        height: 24px;
        line-height: 24px;
        padding: ${props.removable ? '0' : '0 12px'};

        ${TagName} {
          padding: ${props.removable ? '0 12px' : '0'};
          padding-left: ${props.removable && props.preffixel && '4px'};
          padding-right: ${props.removable && props.suffixel && '4px'};
        }

        ${props.isActionable &&
        css`
          &:hover {
            padding-right: ${props.removable && props.suffixel && '15px'};

            ${TagName} {
              display: inline-block;
              padding: ${props.removable ? '0 7px 0 12px' : '0'};
              padding-left: ${props.removable && props.preffixel && '4px'};
              padding-right: ${props.removable && props.suffixel && '10px'};
              width: ${getWidthOnHover(props)};
            }
            padding-right: ${!props.suffixel && '5px'};

            ${RemoveButton} {
              margin-left: 0px;
              margin-right: ${props.suffixel ? '2px' : '-2px'};
              .icon {
                position: absolute;
                left: -3px;
                top: -3px;
              }
            }
          }
        `}
      `;

    case TagShape.SINGLE_CHARACTER_ROUND:
      return css`
        color: ${props.textColor || getColorText(props.theme, props.color)};
        border-radius: 12px;
        font-size: 13px;
        height: 24px;
        width: 24px;
        line-height: 24px;
        justify-content: center;
      `;

    case TagShape.SINGLE_CHARACTER_SQUARE:
      return css`
        color: ${props.textColor || getColorText(props.theme, props.color)};
        border-radius: 3px;
        font-size: 13px;
        height: 24px;
        width: 24px;
        line-height: 24px;
        justify-content: center;
      `;

    case TagShape.STATUS_NEUTRAL:
      return css`
        border: 1px solid ${props.color || props.theme.palette['grey-500']};
        color: ${props.textColor || props.color || props.theme.palette['grey-500']};
        ${defaultStatusStyles}
      `;

    case TagShape.STATUS_SUCCESS:
      return css`
        border: 1px solid ${props.theme.palette['green-600']};
        color: ${props.theme.palette['green-600']};
        ${defaultStatusStyles}
      `;

    case TagShape.STATUS_ERROR:
      return css`
        border: 1px solid ${props.theme.palette['red-600']};
        color: ${props.theme.palette['red-600']};
        ${defaultStatusStyles}
      `;

    case TagShape.STATUS_WARNING:
      return css`
        border: 1px solid ${props.theme.palette['yellow-600']};
        color: ${props.theme.palette['yellow-600']};
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
  hasImage?: boolean;
  iconHover?: boolean;
  asPill?: boolean;
  dashed?: boolean;
} & ThemeProps;

export const Content = styled.div<{ iconHover?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 1;
  max-width: 100%;
  ${props =>
    !!props.iconHover &&
    `
    &&& {
     color:${props.theme.palette['red-600']};
   }
`}
`;
export const PrefixWrapper = styled.div<{ iconHover?: boolean }>`
  ${props => addonStyles(props)};
  ${props =>
    !!props.iconHover &&
    `.ant-scroll-number{ 
    color: ${props.theme.palette['red-600']}!important;
    box-shadow: 0 0 0 1px ${props.theme.palette['red-600']}!important;
    }
  .ds-icon svg {
  fill: ${props.theme.palette['red-600']};
}`}
`;
export const SuffixWrapper = styled.div`
  ${props => addonStyles(props)};
`;
export const DefaultSuffixWrapper = styled.div``;
export const DefaultPrefixWrapper = styled.div<{ iconHover?: boolean }>`
  ${props =>
    !!props.iconHover &&
    `.ant-scroll-number{ 
    color: ${props.theme.palette['red-600']}!important;
    box-shadow: 0 0 0 1px ${props.theme.palette['red-600']}!important;
    }
.ds-icon svg {
  fill: ${props.theme.palette['red-600']};
}`}
`;

export const Tag = styled.div<TagProps>`
  position: relative;
  margin: 4px;
  display: inline-flex;
  font-weight: 500;
  overflow: hidden;
  cursor: default;

  ${(props: TagProps) =>
    !props.asPill &&
    css`
      cursor: pointer;
      &:hover:before {
        filter: ${getFilterColor};
      }
    `}

  ${props => insertShapeStyles(props)};
  ${props =>
    !!props.iconHover &&
    `
    &&&:before{
     background-color:${props.theme.palette['red-050']};
   }
`}

  ${(props: TagProps) =>
    !!props.disabled &&
    css`
      opacity: 0.4;
      cursor: not-allowed;
    `}

  ${(props: TagProps) =>
    !props.isStatusShape &&
    css`
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${props.color || props.theme.palette['grey-500']};
      }

      ${props.isActionable &&
      css`
        &:hover:before {
          filter: ${getFilterColor};
        }
      `};
    `}


  .icon1 {
    margin: 0 -2px 0 1px;
  }

  ${props =>
    !!props.isActionable &&
    css`
      &:hover {
        ${SuffixWrapper},${DefaultSuffixWrapper} {
          display: none;
        }
        ${RemoveButton} {
          position: absolute;
          top: 0;
          right: ${props.removable && props.suffixel ? '-15px' : '0'};
          display: inline-block;
        }
      }
    `};

  &:last-of-type {
    margin-right: 0;
  }
  ${SuffixWrapper},${DefaultSuffixWrapper} {
    margin: ${props => (!props.removable && props.suffixel ? '0px -8px 3px 5px' : '0 4px 3px 1px')};
  }
  ${PrefixWrapper},${DefaultPrefixWrapper} {
    margin: ${props => (!props.removable && props.preffixel ? '0px 5px 3px -8px' : '0 1px 3px 4px')};
  }
`;

export const DeleteButton = styled.div``;
