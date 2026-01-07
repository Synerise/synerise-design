import styled from 'styled-components';

const getPadding = (props: { size?: 'S' | 'L'; isIcon: boolean }): string => {
  if (props.size === 'S') {
    if (props.isIcon) {
      return '3px 3px 2px';
    }

    return '1px 4px 0';
  }

  if (props.isIcon) {
    return '6px 6px 5px';
  }

  return '4px 8px 3px';
};

const getWidth = (props: { size?: 'S' | 'L'; autoWidth?: boolean }): string => {
  if (!props.autoWidth) {
    if (props.size === 'L') {
      return '24px';
    }

    if (props.size === 'S') {
      return '18px';
    }
  }

  return 'auto';
};

export const Wrapper = styled.div<{
  size?: 'S' | 'L';
  color?: 'dark' | 'light';
  autoWidth?: boolean;
  isIcon: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props): string => (props.size === 'S' ? '18px' : '24px')};
  width: ${(props): string => getWidth(props)};
  background-color: ${(props): string =>
    props.color === 'dark'
      ? props.theme.palette['grey-600']
      : props.theme.palette.white};
  border-bottom: 1px solid
    ${(props): string =>
      props.color === 'dark'
        ? props.theme.palette['grey-500']
        : props.theme.palette['grey-300']};
  border-radius: 3px;
  color: ${(props): string =>
    props.color === 'dark'
      ? props.theme.palette.white
      : props.theme.palette['grey-600']};
  padding: ${(props): string => getPadding(props)};
  font-size: 11px;
  box-shadow: 0px 1px 8px 0px
    rgba(
      35,
      41,
      54,
      ${(props): string => (props.color === 'dark' ? '0.5' : '0.08')}
    );
`;
