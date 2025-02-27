import styled, { keyframes, Keyframes } from 'styled-components';
import { ReactNode } from 'react';
import { ThemeProps } from '@synerise/ds-core';
import { hexToRgba } from '@synerise/ds-utils';
import { UnorderedList } from '@synerise/ds-unordered-list/dist/Unordered-list.styles';
import 'animate.css';
import { ColorIconType, ColorType, CustomColorType } from './Toast.types';

type InsertShapeStyles = {
  colorIcon?: ColorIconType;
  color?: ColorType;
  expandedContent?: ReactNode;
  expander?: ReactNode;
  withClose?: ReactNode;
} & ThemeProps;

const getWidth = (hasClose?: boolean, hasExpander?: boolean) => {
  if (hasClose && hasExpander) {
    return '72px';
  }
  if (hasClose || hasExpander) {
    return '48px';
  }
  return '24px';
};
const getColorIcon = (props: InsertShapeStyles): string => {
  switch (props.colorIcon) {
    case 'white':
      return props.theme.palette.white;
    case 'grey':
      return props.theme.palette['grey-600'];
    case 'black':
      return props.theme.palette['grey-800'];
    default:
      return props.theme.palette['blue-600'];
  }
};
const getColorText = (props: InsertShapeStyles): string => {
  switch (props.color) {
    case 'red':
      return props.theme.palette.white;
    case 'green':
      return props.theme.palette.white;
    case 'yellow':
      return props.theme.palette['grey-800'];
    default:
      return props.theme.palette['grey-600'];
  }
};
const getColorBackground = (props: InsertShapeStyles): string => {
  switch (props.color) {
    case 'grey':
      return props.theme.palette.white;
    case 'blue':
      return props.theme.palette['blue-050'];
    case 'red':
      return props.theme.palette['red-500'];
    default:
      return props.theme.palette[`${props.color}-600`];
  }
};

const openingAnimation = (): Keyframes => keyframes`

  0% {
     height: 0%;
     opacity: 0;
  }
  100% {
     height: 100%;
     opacity: 1;
  }
`;
export const closingAnimation = (): Keyframes => keyframes`
0% {
  height: 100%;
  opacity: 1;
}
100% {
  height: 0%;
  opacity: 0;
}
  `;

export const AlertContent = styled.div<{ hasBottomMargin?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-right: 24px;
  ${props => props.hasBottomMargin && 'margin-bottom:16px;'}

  ${UnorderedList} {
    margin-bottom: 8px;
  }
`;
export const AllContent = styled.div`
  display: flex;
  color: inherit;
`;

export const IconWrapper = styled.div<{
  colorIcon?: ColorIconType;
  customColorIcon?: CustomColorType;
}>`
  margin: 12px;
  display: flex;
  svg {
    color: ${(props): string =>
      props.customColorIcon ? props.theme.palette[`${props.customColorIcon}-600`] : getColorIcon};
    fill: ${(props): string =>
      props.customColorIcon ? props.theme.palette[`${props.customColorIcon}-600`] : getColorIcon};
  }
`;
export const IconCloseWrapper = styled.div<{ customColorText?: CustomColorType; color?: ColorType }>`
  cursor: pointer;
  svg {
    fill: ${(props): string =>
      props.customColorText ? props.theme.palette[`${props.customColorText}-600`] : getColorText(props)};
  }
`;
export const IconExpanderWrapper = styled.div<{
  customColorText?: CustomColorType;
  color?: ColorType;
  expanded?: boolean;
}>`
  cursor: pointer;
  svg {
    fill: ${(props): string =>
      props.customColorText ? props.theme.palette[`${props.customColorText}-600`] : getColorText(props)};
    transition: transform 0.1s linear;
    transform: rotateZ(${(props): string => (props.expanded ? '180deg' : '0deg')});
  }
`;
export const ButtonWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
`;
export const FirstButtonWrapper = styled.div<{ customColorText?: CustomColorType; color?: ColorType }>`
  margin-right: 8px;
`;
export const NumberWrapper = styled.div<{ customColorText?: CustomColorType; color?: ColorType }>`
  margin-left: 4px;
  color: inherit;
  opacity: 0.6;
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(
      to right,
      ${(props): string => props.theme.palette['grey-400']} 20%,
      rgba(255, 255, 255, 0) 10%
    );
    background-color: transparent;
    background-position: bottom left;
    background-size: 5px 1px;
    background-repeat: repeat-x;
    opacity: 1;
    color: ${(props): string =>
      props.customColorText ? props.theme.palette[`${props.customColorText}-600`] : getColorText(props)};
  }
`;
export const ListWrapper = styled.div<{ visible?: boolean; description?: ReactNode }>`
  display: flex;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  height: ${props => (props.visible ? 'auto' : '0')};
  margin-top: ${props => (!props.description && props.visible ? '10px' : '0')};
`;
export const IconOrderWrapper = styled.div<{ customColorText?: CustomColorType; color?: ColorType }>`
  visibility: hidden;
  margin: -4px 0;
  svg {
    fill: ${(props): string =>
      props.customColorText ? props.theme.palette[`${props.customColorText}-600`] : getColorText(props)};
  }
  &:hover {
    svg {
      fill: ${(props): string => props.theme.palette['blue-600']};
      cursor: pointer;
    }
  }
`;
export const OrderWrapper = styled.div<{ customColorText?: CustomColorType; color?: ColorType }>`
  display: flex;
  color: ${(props): string =>
    props.customColorText ? props.theme.palette[`${props.customColorText}-600`] : getColorText(props)};
  &:hover {
    ${IconOrderWrapper} {
      visibility: visible;
    }
    ${NumberWrapper} {
      background-image: linear-gradient(
        to right,
        ${(props): string =>
            props.customColorText ? props.theme.palette[`${props.customColorText}-600`] : getColorText(props)}
          20%,
        rgba(255, 255, 255, 0) 10%
      );
      background-color: transparent;
      background-position: bottom left;
      background-size: 5px 1px;
      background-repeat: repeat-x;
      opacity: 1;
      color: ${(props): string =>
        props.customColorText ? props.theme.palette[`${props.customColorText}-600`] : getColorText(props)};
    }
  }
`;
export const Wrapper = styled.div`
  color: ${(props): string => props.theme.palette['grey-050']};
`;

export const AnimationContainer = styled.div<{ show?: boolean }>`
  animation: ${(props): Keyframes => (props.show ? openingAnimation() : closingAnimation())} 0.5s ease-in-out 0s 1;
`;
export const Container = styled.div<{
  color?: ColorType;
  customColor?: CustomColorType;
}>`
  display: flex;
  flex-direction: row;
  max-width: 500px;
  align-items: flex-start;
  justify-content: center;
  background-color: ${(props): string =>
    props.customColor ? props.theme.palette[`${props.customColor}-600`] : getColorBackground(props)};
  border-radius: 4px;
  box-shadow: ${(props): string =>
    props.color ? `0px 16px 32px 5px ${hexToRgba(props.theme.palette['grey-900'], 0.2)}` : 'none'};
`;
export const WrapperSectionMessage = styled.div`
  position: relative;
  font-size: 13px;
  min-width: 0;
  color: inherit;
`;

export const AlertMessage = styled.div<{
  noToastContent?: boolean;
  customColorText?: CustomColorType;
  color?: ColorType;
  hasClose?: boolean;
  hasExpander?: boolean;
}>`
  font-size: 14px;
  line-height: 20px;
  padding-top: 14px;
  ${props => props.noToastContent && 'padding-bottom: 14px;'};
  font-weight: 500;
  overflow: hidden;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  padding-right: ${props => getWidth(props.hasClose, props.hasExpander)};
  color: ${(props): string =>
    props.customColorText ? props.theme.palette[`${props.customColorText}-600`] : getColorText(props)};
`;
export const AlertDescription = styled.div<{
  customColorText?: CustomColorType;
  color?: ColorType;
  button?: boolean;
  expandedContent?: boolean;
}>`
  font-size: 13px;
  line-height: 1.39;
  font-weight: normal;
  overflow: hidden;
  overflow-wrap: anywhere;
  text-overflow: ellipsis;
  padding-bottom: ${(props): string => (props.button || props.expandedContent ? '16px' : '0')};
  margin-top: 2px;
  color: ${(props): string =>
    props.customColorText ? props.theme.palette[`${props.customColorText}-600`] : getColorText(props)};
`;
