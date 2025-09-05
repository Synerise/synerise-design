import { type ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';

import { type BroadcastBarType } from './BroadcastBar.types';

type InsertShapeStyles = {
  type?: BroadcastBarType;
} & ThemeProps;
const getColorBackground = (props: InsertShapeStyles): string => {
  if (props.type === 'warning') {
    return props.theme.palette['yellow-600'];
  }
  if (props.type === 'negative') {
    return props.theme.palette['red-600'];
  }
  return props.theme.palette[`green-600`];
};
const getColorIcon = (props: InsertShapeStyles): string => {
  if (props.type === 'warning') {
    return props.theme.palette['grey-800'];
  }
  return props.theme.palette.white;
};
export const AlertContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  color: inherit;
`;
export const AllContent = styled.div<{
  type?: BroadcastBarType;
  close?: boolean | ReactNode;
}>`
  display: flex;
  ${(props) =>
    props.close &&
    css`
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    `};
  color: ${(props) => getColorIcon(props!)};
`;
export const IconWrapper = styled.div<{
  type?: BroadcastBarType;
}>`
  margin: 8px 12px;
  color: ${(props) => getColorIcon(props!)};
`;
export const IconCloseWrapper = styled.div<{ type?: BroadcastBarType }>`
  margin: 3px 5px 2px;
  cursor: pointer;
  color: ${(props) => getColorIcon(props!)};
`;
export const ButtonWrapper = styled.div<{ type?: BroadcastBarType }>`
  margin: 6px 8px;
  border-radius: 3px;
  display: flex;
  background-color: rgba(255, 255, 255, 0.2);
`;
export const ButtonCloseWrapper = styled.div`
  margin: 6px 8px;
  display: flex;
`;
export const Wrapper = styled.div<{ type?: BroadcastBarType }>`
  margin-top: 10px;
  color: ${(props) => getColorIcon(props!)};
`;
export const Container = styled.div<{
  type?: BroadcastBarType;
  close?: boolean;
}>`
  width: 100%;
  display: flex;
  justify-content: ${(props) => (props.close ? 'space-between' : 'center')};
  position: relative;
  background-color: ${(props) => getColorBackground(props!)};
`;
export const WrapperBroadcastBar = styled.div<{
  type?: BroadcastBarType;
  close?: boolean;
}>`
  font-size: 13px;
  ${(props) =>
    props.close &&
    css`
      margin-left: auto;
    `};
  color: ${(props) => getColorIcon(props!)};
`;

export const AlertDescription = styled.span`
  display: flex;
  max-width: 800px;
  white-space: normal;
  font-size: 13px;
  line-height: 1.39;
  font-weight: 500;
  color: inherit;
`;
