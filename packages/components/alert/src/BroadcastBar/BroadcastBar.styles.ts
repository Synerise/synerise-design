import styled from 'styled-components';
import * as React from 'react';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Button from '@synerise/ds-button';
import { ColorType } from './BroadcastBar.types';

type InsertShapeStyles = {
  color?: ColorType;
} & ThemeProps;
const getColorBackground = (props: InsertShapeStyles): string => {
  if (props.color === 'red') {
    return props.theme.palette['red-500'];
  }
  return props.theme.palette[`${props.color}-600`];
};
const getColorIcon = (props: InsertShapeStyles): string => {
  if (props.color === 'yellow') {
    return props.theme.palette['grey-800'];
  }
  return props.theme.palette.white;
};
export const AlertContent = styled.div<{ withLink?: React.ReactNode; color?: ColorType }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  color: ${(props): string => (props.color === 'yellow' ? props.theme.palette['grey-800'] : props.theme.palette.white)};
`;
export const AllContent = styled.div<{ color?: ColorType; close?: boolean | React.ReactNode }>`
  display: flex;
  margin-left: ${(props): string => (props.close ? '34px' : '0')};
  color: ${(props): string => (props.color === 'yellow' ? props.theme.palette['grey-800'] : props.theme.palette.white)};
`;
export const Text = styled.div<{ color?: ColorType }>`
  display: flex;
  color: ${(props): string => (props.color === 'yellow' ? props.theme.palette['grey-800'] : props.theme.palette.white)};
`;
export const IconWrapper = styled.div<{
  color?: ColorType;
}>`
  margin: 10px 12px;
    color: ${(props): string => getColorIcon(props)};
    fill: ${(props): string => getColorIcon(props)};
  }
`;
export const IconCloseWrapper = styled.div<{ color?: ColorType }>`
  margin: 3px 5px 2px;
  cursor: pointer;
  svg {
    color: ${(props): string => getColorIcon(props)};
    fill: ${(props): string => getColorIcon(props)};
  }
`;
export const ButtonWrapper = styled.div<{ color?: ColorType }>`
  margin: 6px 8px;
  border-radius: 3px;
  display: flex;
  background-color: rgba(255, 255, 255, 0.2);
`;
export const BroadcastButton = styled(Button)<{ color?: ColorType }>`
  color: ${(props): string => (props.color === 'yellow' ? props.theme.palette['grey-800'] : props.theme.palette.white)};
  &&& :hover {
    color: ${(props): string =>
      props.color === 'yellow' ? props.theme.palette['grey-800'] : props.theme.palette.white} !important;
  }
`;

export const ButtonCloseWrapper = styled.div`
  margin: 6px 8px;
  display: flex;
`;
export const Wrapper = styled.div<{ color?: ColorType }>`
  margin-top: 10px;
  color: ${(props): string => (props.color === 'yellow' ? props.theme.palette['grey-800'] : props.theme.palette.white)};
`;
export const Container = styled.div<{
  color?: ColorType;
}>`
  width: 100%;
  background-color: ${(props): string => getColorBackground(props)};
`;
export const WrapperSectionMessage = styled.div<{ color?: ColorType }>`
  font-size: 13px;
  display: flex;
  color: ${(props): string => (props.color === 'yellow' ? props.theme.palette['grey-800'] : props.theme.palette.white)};
  justify-content: space-between;
`;

export const AlertMessage = styled.span<{ color?: ColorType; emphasis?: string | React.ReactNode }>`
  font-size: 13px;
  padding-right: 3px;
  line-height: 1.39;
  margin-top: 1px;
  font-weight: ${(props): string => (props.emphasis ? '400' : '500')};
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props): string => (props.color === 'yellow' ? props.theme.palette['grey-800'] : props.theme.palette.white)};
`;

export const AlertDescription = styled.span<{ color?: ColorType }>`
  display: flex;
  max-width: 700px;
  white-space: normal;
  font-size: 13px;
  line-height: 1.39;
  font-weight: 500;
  margin-top: 1px;
  color: ${(props): string => (props.color === 'yellow' ? props.theme.palette['grey-800'] : props.theme.palette.white)};
`;
export const EmphasisWrapper = styled.span<{ color?: ColorType }>`
  display: flex;
  font-size: 13px;
  line-height: 1.39;
  font-weight: 500;
  margin-top: 1px;
  color: ${(props): string => (props.color === 'yellow' ? props.theme.palette['grey-800'] : props.theme.palette.white)};
`;
export const LinkWrapper = styled.span<{ color?: ColorType }>`
  display: flex;
  font-size: 13px;
  line-height: 1.5;
  font-weight: 500;
  margin-top: 1px;
  color: ${(props): string => (props.color === 'yellow' ? props.theme.palette['grey-800'] : props.theme.palette.white)};
  text-decoration: underline;
  cursor: pointer;
`;

export const AlertShowMore = styled.span<{ color?: ColorType }>`
  display: flex;
  font-size: 13px;
  font-weight: 500;
  color: ${(props): string => (props.color === 'yellow' ? props.theme.palette['grey-800'] : props.theme.palette.white)};
  text-decoration: underline;
  cursor: pointer;
  margin-top: 6px;
`;
