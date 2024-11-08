import styled from 'styled-components';
import Icon from '@synerise/ds-icon';

import { ReactNode } from 'react';

const getPadding = (props: { size?: 'S' | 'L'; color?: 'dark' | 'light'; icon?: ReactNode }): string => {
  if (props.size === 'L' && props.icon) {
    return '8px';
  }
  if (props.size === 'S' && props.icon) {
    return '4px';
  }
  if (props.size === 'L') {
    return '8px 14px';
  }
  if (props.size === 'S') {
    return '4px 10px';
  }
  return '0px';
};

export const ShortCutWrapper = styled.div<{ color?: 'dark' | 'light'; size?: 'S' | 'L' }>`
  display: flex;
  background-color: ${(props): string =>
    props.color === 'dark' ? props.theme.palette['grey-600'] : props.theme.palette.white};
  border-radius: 6px;
  border-bottom: 2px solid
    ${(props): string => (props.color === 'dark' ? props.theme.palette['grey-500'] : props.theme.palette['grey-300'])};
  box-shadow: 0 0 10px 2px
    ${(props): string => (props.color === 'dark' ? props.theme.palette['grey-300'] : props.theme.palette['grey-100'])};
`;

export const Wrapper = styled.div<{ size?: 'S' | 'L'; color?: 'dark' | 'light'; icon?: ReactNode }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${(props): string => (props.size === 'S' ? '28px' : '36px')};
  padding: ${(props): string => getPadding(props)};
  font-size: 18px;
  color: ${(props): string => (props.color === 'dark' ? props.theme.palette.white : props.theme.palette['grey-600'])};
`;

export const ShortCutIcon = styled(Icon)<{ color?: 'dark' | 'light' }>`
  fill: ${(props): string => (props.color === 'dark' ? props.theme.palette.white : props.theme.palette['grey-600'])};
`;
