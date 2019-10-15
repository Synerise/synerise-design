import styled, { css } from 'styled-components';

const FONT_WEIGHT_SMALL = 400;
const FONT_WEIGHT_NORMAL = 500;

const resolveInactiveColor = (props): string => props.theme.palette['grey-400'];
const resolveEditedColor = (props): string => props.theme.palette['grey-600'];
const resolveErrorColor = (props): string => props.theme.palette['red-600'];
const resolveDisableColor = (props): string => props.theme.palette['grey-400'];

const defaultPalette = (props): { [key: string]: string } => ({
  bgColor: props.theme.palette['grey-100'],
  hoverBgColor: props.theme.palette['grey-200'],
  activeBgColor: props.theme.palette['grey-300'],
});

const transparentPalette = (): { [key: string]: string } => ({
  bgColor: 'transparent',
  hoverBgColor: 'transparent',
  activeBgColor: 'transparent',
});

const resolveColors = (props): { [key: string]: string } => {
  const config = {
    transparent: {
      color: props.theme.palette['grey-800'],
      ...transparentPalette(),
    },
    'error-transparent': {
      color: props.theme.palette['red-600'],
      ...transparentPalette(),
    },
    'disabled-transparent': {
      color: props.theme.palette['grey-600'],
      ...transparentPalette(),
    },
    'disabled-error-transparent': {
      color: props.theme.palette['grey-600'],
      ...transparentPalette(),
    },
    default: {
      color: props.theme.palette['grey-800'],
      ...defaultPalette(props),
    },
    'error-default': {
      color: props.theme.palette['red-600'],
      ...defaultPalette(props),
    },
    'disabled-default': {
      color: props.theme.palette['grey-600'],
      ...defaultPalette(props),
    },
    'disabled-error-default': {
      color: props.theme.palette['grey-600'],
      ...defaultPalette(props),
    },
  };
  return config[props.colors];
};

export const FontStyleWatcher = styled.div`
  visibility: hidden;
  pointer-events: none;
`;

export const InPlaceEditableInputContainer = styled.div.attrs(({ size }) => ({
  height: size === 'small' ? 13 : 21,
  fontWeight: size === 'small' ? FONT_WEIGHT_SMALL : FONT_WEIGHT_NORMAL,
}))`
  display: flex;
  max-width: 100%;
  align-items: center;

  > .autosize-input {
    display: inline-block;
    overflow: hidden;
  }

  > .autosize-input > input,
  > ${FontStyleWatcher} {
    border: none;
    background-color: transparent;
    background-position: bottom left;
    background-size: 5px 1px;
    background-repeat: repeat-x;
    font-size: ${(props): number => props.height}px;
    line-height: ${(props): number => props.height + 8}px;
    font-weight: ${(props): string => props.fontWeight};
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    padding: 0;
    margin: 0;
    vertical-align: top;
    color: ${(props): string => resolveInactiveColor(props)};
    ::placeholder {
      color: ${(props): string => props.theme.palette['grey-400']};
    }
    &:hover {
      background-image: linear-gradient(
        to right,
        ${(props): string => props.theme.palette['grey-400']} 20%,
        rgba(255, 255, 255, 0) 10%
      );
      color: ${(props): string => resolveEditedColor(props)};
    }

    &:focus {
      background-image: linear-gradient(
        to right,
        ${(props): string => props.theme.palette['blue-600']} 20%,
        rgba(255, 255, 255, 0) 10%
      );
      color: ${(props): string => resolveEditedColor(props)};
    }
    ${(props): string =>
      props.error &&
      css`
        &:focus,
        &:hover {
          background-image: linear-gradient(
            to right,
            ${props.theme.palette['red-600']} 20%,
            rgba(255, 255, 255, 0) 10%
          );
          color: ${resolveErrorColor(props)};
        }
        color: ${resolveErrorColor(props)};
      `}
    ${(props): string =>
      props.disabled &&
      css`
        &:focus,
        &:hover {
          color: ${resolveDisableColor(props)};
          background-image: none;
          cursor: not-allowed;
        }
        color: ${resolveDisableColor(props)};
        cursor: not-allowed;
      `}
  }
`;

export const IconWrapper = styled.div`
  ${(props): string => css`
    border-radius: 24px;
    color: ${resolveColors(props).color};
    background: ${resolveColors(props).bgColor};
    margin: ${props.margin};
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: ${props.iconMargin}px;
    width: 24px;
    height: 24px;
    line-height: inherit;
    cursor: pointer;
    &:hover {
      background-color: ${resolveColors(props).hoverBgColor};
    }
  `};
`;
