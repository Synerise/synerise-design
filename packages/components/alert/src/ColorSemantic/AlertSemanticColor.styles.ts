import styled from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';

import { type ColorType, type ModeType } from './AlertSemanticColor.types';

type AlertStyles = {
  mode?: ModeType;
  color?: ColorType;
} & ThemeProps;

const getAlertIconColor = (props: AlertStyles): string => {
  if (props.mode === 'background' || props.mode === 'shadow') {
    return props.theme.palette.white;
  }
  return props.theme.palette[`${props.color}-600`];
};
const getAlertColor = (props: AlertStyles): string => {
  if (props.mode === 'background' || props.mode === 'shadow') {
    return props.theme.palette[`${props.color}-600`];
  }
  if (props.mode === 'background-outline') {
    return props.theme.palette[`${props.color}-050`];
  }
  return props.theme.palette.white;
};
export const IconWrapper = styled.div<{
  mode?: ModeType;
  color?: ColorType;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
  svg {
    fill: ${getAlertIconColor};
  }
`;
export const Container = styled.div<{
  mode?: ModeType;
  color?: ColorType;
}>`
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
  background-color: ${getAlertColor};
  border: 1px solid
    ${(props): string =>
      props.mode === 'background-outline'
        ? props.theme.palette[`${props.color}-200`]
        : 'none'};
  border-radius: 4px;
  -webkit-box-shadow: ${(props): string =>
    props.mode === 'shadow'
      ? `0px 16px 32px 5px ${props.theme.palette[`grey-300`]}`
      : 'none'};
  box-shadow: ${(props): string =>
    props.mode === 'shadow'
      ? `0px 16px 32px 5px ${props.theme.palette[`grey-300`]}`
      : 'none'};
`;
