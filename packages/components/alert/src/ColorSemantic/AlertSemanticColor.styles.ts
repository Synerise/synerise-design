import styled from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

type AlertStyles = {
  mode?: 'background' | 'background-outline' | 'clear' | 'shadow';
  color?: 'blue' | 'grey' | 'red' | 'green' | 'yellow' | 'violet' | 'purple' | 'cyan';
} & ThemeProps;

const getAlertIconColor = (props: AlertStyles): string => {
  if (props.mode === 'background') {
    return props.theme.palette.white;
  }
  if (props.mode === 'background-outline') {
    return props.theme.palette[`${props.color}-600`];
  }
  if (props.mode === 'shadow') {
    return props.theme.palette.white;
  }
  return props.theme.palette[`${props.color}-600`];
};
const getAlertColor = (props: AlertStyles): string => {
  if (props.mode === 'background') {
    return props.theme.palette[`${props.color}-600`];
  }
  if (props.mode === 'background-outline') {
    return props.theme.palette[`${props.color}-050`];
  }
  if (props.mode === 'shadow') {
    return props.theme.palette[`${props.color}-600`];
  }
  return props.theme.palette.white;
};
export const IconWrapper = styled.div<{
  mode?: 'background' | 'background-outline' | 'clear' | 'shadow';
  color?: 'blue' | 'grey' | 'red' | 'green' | 'yellow' | 'violet' | 'purple' | 'cyan';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
  svg {
    color: ${getAlertIconColor};
    fill: ${getAlertIconColor};
  }
`;
export const Container = styled.div<{
  mode?: 'background' | 'background-outline' | 'clear' | 'shadow';
  color?: 'blue' | 'grey' | 'red' | 'green' | 'yellow' | 'violet' | 'purple' | 'cyan';
}>`
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
  background-color: ${getAlertColor};
  border: 1px solid
    ${(props): string => (props.mode === 'background-outline' ? props.theme.palette[`${props.color}-200`] : 'none')};
  border-radius: 4px;
  -webkit-box-shadow: ${(props): string => (props.mode === 'shadow' ? '0px 16px 32px 5px #DBDBDB' : 'none')};
  box-shadow: ${(props): string => (props.mode === 'shadow' ? '0px 16px 32px 5px #DBDBDB' : 'none')};
`;
