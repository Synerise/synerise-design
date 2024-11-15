import styled from 'styled-components';
import Icon from '@synerise/ds-icon';

const getPadding = (props: { size?: 'S' | 'L' }): string => {
  if (props.size === 'L') {
    return '0 8px';
  }
  if (props.size === 'S') {
    return '0 4px';
  }
  return '0px';
};

const getWidth = (props: { size?: 'S' | 'L'; autoWidth?: boolean }): string => {
  if (props.size && props.autoWidth) {
    return '100%';
  }
  if (props.size === 'L') {
    return '24px';
  }
  if (props.size === 'S') {
    return '18px';
  }
  return '100%';
};

export const ShortCutWrapper = styled.div<{ color?: 'dark' | 'light'; size?: 'S' | 'L' }>`
  display: flex;
  background-color: ${(props): string =>
    props.color === 'dark' ? props.theme.palette['grey-600'] : props.theme.palette.white};
  border-radius: 3px;
  border-bottom: 1px solid
    ${(props): string => (props.color === 'dark' ? props.theme.palette['grey-500'] : props.theme.palette['grey-300'])};
  box-shadow: 0 0 10px 2px
    ${(props): string => (props.color === 'dark' ? props.theme.palette['grey-300'] : props.theme.palette['grey-100'])};
`;

export const Wrapper = styled.div<{
  size?: 'S' | 'L';
  color?: 'dark' | 'light';
  autoWidth?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props): string => (props.size === 'S' ? '17px' : '23px')};
  width: ${(props): string => getWidth(props)};
  padding: ${(props): string => getPadding(props)};
  font-size: 11px;
  color: ${(props): string => (props.color === 'dark' ? props.theme.palette.white : props.theme.palette['grey-600'])};
`;

export const ShortCutIcon = styled(Icon)<{ color?: 'dark' | 'light' }>`
  fill: ${(props): string => (props.color === 'dark' ? props.theme.palette.white : props.theme.palette['grey-600'])};
`;
