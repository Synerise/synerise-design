import type React from 'react';
import styled, {
  type FlattenSimpleInterpolation,
  css,
} from 'styled-components';
import is, { isNot } from 'styled-is';

import { type ThemeProps } from '@synerise/ds-core';
import Tag from '@synerise/ds-tag';

import {
  type CardSelectAlignType,
  type CardSelectSizeType,
} from './CardSelect.types';

const TRANSITION = `
  TRANSITION-timing-function: ease-in-out;
  transition-duration: 0.2s;
  transition-property: border-color, background-color;
`;
const MAIN_PADDING = 8;
const RADIO_WIDTH = 20;
const RADIO_SMALL_WIDTH = 16;
const RADIO_BORDER_WIDTH = 1;

const TAG_LEFT_OFFSET = 32;
const TAG_LEFT_OFFSET_TICK_SMALL = 44;
const TAG_LEFT_OFFSET_TICK_LARGE = 68;

const MAP_ELEMENTS_POSITION = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};

const getVar =
  (name: string) =>
  (props: ThemeProps): string =>
    props.theme.palette[name];
const getTransformValues = (
  props: ThemeProps & {
    elementsPosition: CardSelectAlignType;
    size?: CardSelectSizeType;
  },
): string => {
  if (props.size === 'small') {
    return 'translate(-2px,-2px)';
  }
  if (props.elementsPosition === 'left') {
    return 'translate(3px,-3px)';
  }
  return 'translate( -3px, -3px)';
};

const sizeCondition = (
  smallValue: number | string,
  mediumValue: number | string,
  props: {
    size?: CardSelectSizeType;
  },
): React.ReactText => (props.size === 'small' ? smallValue : mediumValue);

export const RadioShape = styled.div<{ size?: CardSelectSizeType }>`
  ${TRANSITION};
  width: ${(props): string | number =>
    sizeCondition(RADIO_SMALL_WIDTH, RADIO_WIDTH, props)}px;
  height: ${(props): string | number =>
    sizeCondition(RADIO_SMALL_WIDTH, RADIO_WIDTH, props)}px;
  border-radius: 50%;
  border-width: ${RADIO_BORDER_WIDTH}px;
  border-style: solid;
  border-color: ${getVar('grey-300')};
  margin: 2px;

  &:hover {
    border-color: ${getVar('grey-400')};
  }
`;
export const Title = styled.div<{
  hasIcon: boolean;
  size?: CardSelectSizeType;
}>`
  text-align: center;
  color: ${getVar('grey-800')};
  font-weight: ${(props): string | number =>
    sizeCondition('400', '500', props)};
  width: 100%;
  font-size: ${(props): string | number =>
    sizeCondition('13px', '14px', props)};

  ${(props): FlattenSimpleInterpolation | false =>
    props.size === 'small' &&
    props.hasIcon &&
    css`
      margin-top: 4px;
    `}
`;
export const Description = styled.div<{
  hasTitle?: boolean;
  hasIcon?: boolean;
  size?: CardSelectSizeType;
}>`
  && {
    font-size: 13px;
    text-align: center;
    max-width: 176px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    flex-grow: 1;
    ${(props): FlattenSimpleInterpolation | undefined | false =>
      props.hasTitle &&
      css`
        margin-top: 8px;
      `};
  }
`;

export const IconWrapper = styled.div<{ size?: CardSelectSizeType }>`
  margin-bottom: ${(props): string | number =>
    sizeCondition(0, MAIN_PADDING, props)}px;
  text-align: center;
  width: 100%;
`;
export const Aside = styled.div<{
  size?: CardSelectSizeType;
  elementsPosition?: CardSelectAlignType;
  tickVisible?: boolean;
}>`
  width: 100%;
  justify-content: ${(props) =>
    props.tickVisible ? 'space-between' : 'flex-end'};
  top: 0;
  left: 0;
  display: flex;
  flex-direction: ${(props) =>
    props.elementsPosition === 'left' ? 'row-reverse' : 'row'};
  position: absolute;
  padding: ${(props) => sizeCondition('4px', '14px', props)};
`;
export const Container = styled.div<
  {
    disabled?: boolean;
    raised?: boolean;
    value?: boolean;
    size?: CardSelectSizeType;
    elementsPosition: CardSelectAlignType;
    selected?: boolean;
    pressed?: boolean;
    stretchToFit?: boolean;
    error?: boolean;
  } & ThemeProps
>`
  ${is('stretchToFit')`
    height: 100%;
  `}

  ${TRANSITION};
  background-color: ${getVar('white')};
  border-radius: ${(props): string =>
    props.theme.variable('@border-radius-base')};
  ${is('error')`
     &&, &&:hover {
     box-shadow:  0px 0px 0px 2px ${getVar('red-500')};
     }
  `}
  display: flex;
  flex: 1;
  justify-content: ${(props): string =>
    MAP_ELEMENTS_POSITION[props.elementsPosition]};
  border-color: ${getVar('white')};
  position: relative;
  padding: ${(props): string => (props.size === 'small' ? '16px' : '24px')};
  cursor: pointer;
  &&:focus-within {
    box-shadow: 0px 0px 0px 2px ${getVar('blue-600')};
  }
  ${isNot('pressed') &&
  isNot('value')`box-shadow:  0px 0px 0px 1px ${getVar('grey-300')};`}
  ${is('value')`
  box-shadow:  0px 0px 0px 2px ${getVar('blue-600')};
  `}
    ${is('value') &&
  is('pressed')` box-shadow:  0px 0px 0px 2px ${getVar('blue-600')};`}
    ${is('value') &&
  is('raised')`
  box-shadow:  0px 0px 0px 2px ${getVar('blue-600')};
  `}
    ${is('value') &&
  is('pressed')` box-shadow:  0px 0px 0px 2px ${getVar('blue-600')};`}

  ${Title}, ${Description}, ${IconWrapper} {
    text-align: ${(props): string => props.elementsPosition};
  }

  ${IconWrapper} {
    margin-left: ${(props): string =>
      props.elementsPosition === 'left' ? '-18px' : '0px'};
    margin-right: ${(props): string =>
      props.elementsPosition === 'right' ? '-18px' : '0px'};
  }

  ${isNot('disabled')`
    

    &:hover {
      ${RadioShape} {
        border-color: ${getVar('grey-400')};
      }
    }

    ${isNot('raised')`
      ${isNot('value')`
       box-shadow: 0px 0px 0px 1px ${getVar('grey-300')};
        
        &:hover, &:active {
          box-shadow: 0px 0px 0px 1px ${getVar('grey-400')};
        }
      `};
    `};
    
    ${is('raised')`
      ${isNot('value')`
        box-shadow: ${(props: ThemeProps): string => props.theme.variable('@box-shadow-base') || 'none'};
        
        &:hover, &:active {
          box-shadow: ${(props: ThemeProps): string => props.theme.variable('@box-shadow-active') || 'none'};
        }
      `}
      
    `}
  `}

  ${is('disabled')`
    opacity: 0.4;
    pointer-events:none;

    ${isNot('raised')`

      ${isNot('value')`
        box-shadow: 0px 0px 0px 1px ${getVar('grey-200')};
      `}
    `}
    
  `};
`;

export const TagRibbonAnchor = styled.div`
  display: flex;
  height: 0;
  overflow: visible;
`;
export const TagRibbon = styled(Tag)`
  position: relative;
  z-index: 1;
  top: -12px;
  margin: 0;
`;
export const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
`;

export const TickIcon = styled.div<{
  size?: CardSelectSizeType;
  disabled?: boolean;
  selected?: boolean;
  elementsPosition: CardSelectAlignType;
}>`
  ${is('selected')`
    transform: ${(
      props: ThemeProps & {
        elementsPosition: CardSelectAlignType;
        size?: CardSelectSizeType;
      },
    ): string => getTransformValues(props)}; 
  `}

  ${is('disabled')`
    ${RadioShape} {
      background-color: ${getVar('grey-050')};
      border-color: ${getVar('grey-200')};
    }
  `}

  ${isNot('disabled')`
    ${RadioShape} {
      cursor: pointer;
    }
  `}
`;

export const CardWrapper = styled.div<{
  size?: CardSelectSizeType;
  disabled?: boolean;
  stretchToFit?: boolean;
  hasTick?: boolean;
  hasIcon?: boolean;
  elementsPosition?: CardSelectAlignType;
}>`
  position: relative;
  ${is('disabled')`
    cursor:not-allowed;
  `}
  ${is('stretchToFit')`
    height: 100%;
  `}

  ${Title} {
    ${(props) =>
      props.hasTick &&
      !props.hasIcon &&
      css`
        padding: 0 24px;
      `}
  }

  ${TagRibbonAnchor} {
    justify-content: ${(props): string => (props.elementsPosition === 'right' ? 'flex-start' : 'flex-end')};
    padding-${(props): string => (props.elementsPosition === 'left' ? 'right' : 'left')}: ${(
      props,
    ) => {
      const withTickOffset =
        props.size === 'small'
          ? TAG_LEFT_OFFSET_TICK_SMALL
          : TAG_LEFT_OFFSET_TICK_LARGE;
      return props.hasTick ? withTickOffset : TAG_LEFT_OFFSET;
    }}px;
  }

  ${TagRibbon} {
    ${(props): string => (props.elementsPosition === 'left' ? 'left' : 'right')}: 16px;
  }
`;
