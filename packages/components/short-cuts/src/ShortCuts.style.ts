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
  /* ⚑ shift grey-600→grey-700: dark key snapped to neutral-solid (no grey-600 bg token) */
  background-color: ${(props): string =>
    props.color === 'dark'
      ? 'var(--ds-color-background-neutral-solid)'
      : 'var(--ds-color-background-base-default)'};
  border-bottom: 1px solid
    ${(props): string =>
      props.color === 'dark'
        ? 'var(--ds-color-border-neutral-subtle)'
        : 'var(--ds-color-border-base-strong)'};
  border-radius: 3px;
  color: ${(props): string =>
    props.color === 'dark'
      ? 'var(--ds-color-text-base-onsolid)'
      : 'var(--ds-color-text-base-muted)'};
  padding: ${(props): string => getPadding(props)};
  font-size: 11px;
  /* ⚑ shadow kept on rgba literal — no --ds-shadows-shadow-* token matches 0 1 8 0 @ .5/.08 */
  box-shadow: 0px 1px 8px 0px
    rgba(
      35,
      41,
      54,
      ${(props): string => (props.color === 'dark' ? '0.5' : '0.08')}
    );
`;
