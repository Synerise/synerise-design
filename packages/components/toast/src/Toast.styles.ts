import { type ReactNode } from 'react';
import styled, { type Keyframes, keyframes } from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';
import { UnorderedList } from '@synerise/ds-unordered-list/dist/Unordered-list.styles';

import { type ToastType } from './Toast.types';

const getIconColorForType = ({
  toastType,
  theme,
}: ThemeProps & { toastType: ToastType }): string => {
  switch (toastType) {
    case 'informative':
      return theme.palette['grey-600'];
    case 'negative':
      return theme.palette['red-500'];
    case 'warning':
      return theme.palette['yellow-600'];
    case 'success':
    default:
      return theme.palette['green-600'];
  }
};

const getBackgroundColorForType = ({
  toastType,
  theme,
}: ThemeProps & { toastType: ToastType }): string => {
  switch (toastType) {
    case 'informative':
      return theme.palette['grey-600'];
    case 'negative':
      return theme.palette['red-500'];
    case 'warning':
      return theme.palette['yellow-600'];
    case 'success':
    default:
      return theme.palette['green-600'];
  }
};

const getWidth = (hasClose?: boolean, hasExpander?: boolean) => {
  if (hasClose && hasExpander) {
    return '72px';
  }
  if (hasClose || hasExpander) {
    return '48px';
  }
  return '24px';
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
  ${(props) => props.hasBottomMargin && 'margin-bottom:16px;'}

  ${UnorderedList} {
    margin-bottom: 8px;
  }
`;
export const AllContent = styled.div`
  display: flex;
  color: inherit;
`;

export const IconWrapper = styled.div`
  margin: 12px;
  display: flex;
`;
export const IconCloseWrapper = styled.div`
  cursor: pointer;
`;

export const IconExpanderWrapper = styled.div<{
  expanded?: boolean;
}>`
  cursor: pointer;
  svg {
    transition: transform 0.1s linear;
    transform: rotateZ(${(props) => (props.expanded ? '180deg' : '0deg')});
  }
`;
export const ButtonWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
`;
export const FirstButtonWrapper = styled.div`
  margin-right: 8px;
`;
export const NumberWrapper = styled.div`
  margin-left: 4px;
  color: inherit;
  opacity: 0.6;
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(
      to right,
      ${(props) => props.theme.palette['grey-400']} 20%,
      rgba(255, 255, 255, 0) 10%
    );
    background-color: transparent;
    background-position: bottom left;
    background-size: 5px 1px;
    background-repeat: repeat-x;
    opacity: 1;
  }
`;
export const ListWrapper = styled.div<{
  visible?: boolean;
  description?: ReactNode;
}>`
  display: flex;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  height: ${(props) => (props.visible ? 'auto' : '0')};
  margin-top: ${(props) =>
    !props.description && props.visible ? '10px' : '0'};
`;
export const IconOrderWrapper = styled.div`
  visibility: hidden;
  margin: -4px 0;
  &:hover {
    svg {
      fill: ${(props) => props.theme.palette['blue-600']};
      cursor: pointer;
    }
  }
`;
export const OrderWrapper = styled.div`
  display: flex;
  &:hover {
    ${IconOrderWrapper} {
      visibility: visible;
    }
    ${NumberWrapper} {
      background-color: transparent;
      background-position: bottom left;
      background-size: 5px 1px;
      background-repeat: repeat-x;
      opacity: 1;
    }
  }
`;
export const Wrapper = styled.div`
  color: ${(props) => props.theme.palette['grey-600']};
`;

export const AnimationContainer = styled.div<{ show?: boolean }>`
  animation: ${(props): Keyframes =>
      props.show ? openingAnimation() : closingAnimation()}
    0.5s ease-in-out 0s 1;
`;

export const WrapperSectionMessage = styled.div`
  position: relative;
  font-size: 13px;
  min-width: 0;
  color: inherit;
`;

export const AlertMessage = styled.div<{
  noToastContent?: boolean;
  hasClose?: boolean;
  hasExpander?: boolean;
}>`
  font-size: 14px;
  line-height: 20px;
  padding-top: 14px;
  ${(props) => props.noToastContent && 'padding-bottom: 14px;'};
  font-weight: 500;
  overflow: hidden;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  padding-right: ${(props) => getWidth(props.hasClose, props.hasExpander)};
`;
export const AlertDescription = styled.div<{
  button?: boolean;
  expandedContent?: boolean;
}>`
  font-size: 13px;
  line-height: 1.39;
  font-weight: normal;
  overflow: hidden;
  overflow-wrap: anywhere;
  text-overflow: ellipsis;
  padding-bottom: ${(props) =>
    props.button || props.expandedContent ? '16px' : '0'};
  margin-top: 2px;
`;

export const Container = styled.div<{
  toastType: ToastType;
}>`
  display: flex;
  flex-direction: row;
  max-width: 500px;
  align-items: flex-start;
  justify-content: center;
  border-top: solid 2px ${getBackgroundColorForType};
  background-color: ${(props) => props.theme.palette.white};
  border-radius: 4px;
  box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.12);

  ${IconExpanderWrapper},
  ${IconOrderWrapper},
  ${IconCloseWrapper} {
    svg {
      fill: ${(props) => props.theme.palette['grey-600']};
    }
  }
  ${OrderWrapper},
  ${AlertMessage},
  ${ListWrapper},
  ${NumberWrapper}:hover,
  ${AlertDescription} {
    color: ${(props) => props.theme.palette['grey-600']};
  }
  ${OrderWrapper}:hover {
    ${NumberWrapper} {
      background-image: linear-gradient(
        to right,
        ${(props) => props.theme.palette['grey-600']}; 20%,
        rgba(255, 255, 255, 0) 10%
      );
      color: ${(props) => props.theme.palette['grey-600']};
    }
  }
  ${IconWrapper} {
    svg {
      color: ${getIconColorForType};
      fill: ${getIconColorForType};
    }
  }
`;
