import styled, { keyframes, Keyframes } from 'styled-components';
import * as React from 'react';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import 'animate.css';
import { ColorIconType, ColorType, CustomColorType } from './Toast.types';

type InsertShapeStyles = {
  colorIcon?: ColorIconType;
  color?: ColorType;
  expandedContent?: React.ReactNode | boolean;
  expander?: React.ReactNode | boolean;
  withClose?: React.ReactNode | boolean;
} & ThemeProps;
const getColorIcon = (props: InsertShapeStyles): string => {
  if (props.colorIcon === 'white') {
    return props.theme.palette.white;
  }
  if (props.colorIcon === 'grey') {
    return props.theme.palette['grey-600'];
  }
  if (props.colorIcon === 'black') {
    return props.theme.palette['grey-800'];
  }
  return props.theme.palette['blue-600'];
};
const getColorText = (props: InsertShapeStyles): string => {
  if (props.color === 'red') {
    return props.theme.palette.white;
  }
  if (props.color === 'green') {
    return props.theme.palette.white;
  }
  if (props.color === 'grey') {
    return props.theme.palette['grey-600'];
  }
  if (props.color === 'yellow') {
    return props.theme.palette['grey-800'];
  }
  return props.theme.palette['grey-600'];
};
const getColorBackground = (props: InsertShapeStyles): string => {
  if (props.color === 'grey') {
    return props.theme.palette.white;
  }
  if (props.color === 'blue') {
    return props.theme.palette['blue-050'];
  }
  if (props.color === 'red') {
    return props.theme.palette['red-500'];
  }
  return props.theme.palette[`${props.color}-600`];
};
const getWidth = (props: InsertShapeStyles): string => {
  if (props.expandedContent || (props.expander && props.withClose)) {
    return '420px';
  }
  return '354px';
};
export const openingAnimation = (): Keyframes => keyframes`

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

export const AlertContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 12px 0;
`;
export const AllContent = styled.div`
  display: flex;
  color: inherit;
`;
export const Text = styled.div<{ customColorText?: CustomColorType; color?: ColorType }>`
  display: flex;
  color: ${(props): string =>
    props.customColorText ? props.theme.palette[`${props.customColorText}-600`] : getColorText(props)};
`;
export const IconWrapper = styled.div<{
  colorIcon?: ColorIconType;
  customColorIcon?: CustomColorType;
}>`
  margin: 10px 12px;
  display: flex;
  svg {
    color: ${(props): string =>
      props.customColorIcon ? props.theme.palette[`${props.customColorIcon}-600`] : getColorIcon};
    fill: ${(props): string =>
      props.customColorIcon ? props.theme.palette[`${props.customColorIcon}-600`] : getColorIcon};
  }
`;
export const IconCloseWrapper = styled.div<{ customColorText?: CustomColorType; color?: ColorType }>`
  margin: 3px 5px 2px;
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
  margin: 3px 5px 2px;
  cursor: pointer;
  svg {
    fill: ${(props): string =>
      props.customColorText ? props.theme.palette[`${props.customColorText}-600`] : getColorText(props)};
    transition: transform 0.1s linear;
    transform: rotateZ(${(props): string => (props.expanded ? '180deg' : '0deg')});
  }
`;
export const ButtonWrapper = styled.div`
  padding: 6px 8px 0 8px;
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
export const ListWrapper = styled.div<{ visible?: boolean; description?: boolean }>`
  display: flex;
  margin-top: ${(props): string => (!props.description ? '10px' : '0')};
`;
export const IconOrderWrapper = styled.div<{ customColorText?: CustomColorType; color?: ColorType }>`
  display: none;
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
      display: block;
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
  visible?: React.ReactNode | boolean;
  customColor?: CustomColorType;
  onCloseClick?: () => void;
  expandedContent?: React.ReactNode | boolean;
  expander?: React.ReactNode | boolean;
  withClose?: React.ReactNode | boolean;
}>`
  width: ${(props): string => (props.expander && props.expandedContent && props.withClose ? '460px' : getWidth(props))};
  align-items: center;
  justify-content: center;
  background-color: ${(props): string =>
    props.customColor ? props.theme.palette[`${props.customColor}-600`] : getColorBackground(props)};
  border-radius: 4px;
  box-shadow: ${(props): string => (props.color ? `0px 16px 32px 5px ${props.theme.palette[`grey-200`]}` : 'none')};
`;
export const WrapperSectionMessage = styled.div`
  display: flex;
  font-size: 13px;
  color: inherit;
  justify-content: space-between;
`;

export const AlertMessage = styled.span<{ customColorText?: CustomColorType; color?: ColorType }>`
  font-size: 16px;
  line-height: 1.25;
  font-weight: 500;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props): string =>
    props.customColorText ? props.theme.palette[`${props.customColorText}-600`] : getColorText(props)};
`;

export const AlertDescription = styled.span<{
  customColorText?: CustomColorType;
  color?: ColorType;
  button?: React.ReactNode | boolean;
  expandedContent?: React.ReactNode | boolean;
}>`
  display: flex;
  font-size: 13px;
  line-height: 1.39;
  font-weight: normal;
  padding: ${(props): string => (props.button || props.expandedContent ? ' 0 3px 10px 0' : '0px')};
  margin-top: 2px;
  color: ${(props): string =>
    props.customColorText ? props.theme.palette[`${props.customColorText}-600`] : getColorText(props)};
`;
