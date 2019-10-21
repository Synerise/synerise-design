import styled from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

const FONT_WEIGHT_SMALL = 400;
const FONT_WEIGHT_NORMAL = 500;

const resolveInactiveColor = (props: ThemeProps): string => props.theme.palette['grey-400'];
const resolveEditedColor = (props: ThemeProps): string => props.theme.palette['grey-600'];
// const resolveErrorColor = (props: ThemeProps): string => props.theme.palette['red-600'];
// const resolveDisableColor = (props: ThemeProps): string => props.theme.palette['grey-400'];

const defaultPalette = (props: ThemeProps): { [key: string]: string } => ({
  bgColor: props.theme.palette['grey-100'],
  hoverBgColor: props.theme.palette['grey-200'],
  activeBgColor: props.theme.palette['grey-300'],
});

const transparentPalette = (): { [key: string]: string } => ({
  bgColor: 'transparent',
  hoverBgColor: 'transparent',
  activeBgColor: 'transparent',
});

const resolveColors = (props: ThemeProps & { colors: string }): { [key: string]: string } => {
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

export const IconWrapper = styled.div<{ margin: string; colors: string; iconMargin?: number } & ThemeProps>`
  border-radius: 24px;
  color: ${(props): string => resolveColors(props).color};
  background: ${(props): string => resolveColors(props).bgColor};
  margin: ${(props): string => `${props.margin}px`};
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: ${(props): string => `${props.iconMargin}px`};
  width: 24px;
  height: 24px;
  line-height: inherit;
  cursor: pointer;
  &:hover {
    background-color: ${(props): string => resolveColors(props).hoverBgColor};
  }
`;

type InPlaceEditableInputContainerProps = {
  size: 'small' | 'normal';
  disabled?: boolean;
  error?: boolean;
  darkTheme: boolean;
};

export const InPlaceEditableInputContainer = styled.div.attrs<InPlaceEditableInputContainerProps>(
  ({ size }: InPlaceEditableInputContainerProps) => ({
    height: size === 'small' ? 13 : 21,
    fontWeight: size === 'small' ? FONT_WEIGHT_SMALL : FONT_WEIGHT_NORMAL,
  })
)<{ height: number; fontWeight: number } & InPlaceEditableInputContainerProps>`
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
    font-weight: ${(props): number => props.fontWeight};
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    padding: 0;
    margin: 0;
    vertical-align: top;
    color: ${(props: ThemeProps): string => resolveInactiveColor(props)};
    ::placeholder {
      color: ${(props: ThemeProps): string => props.theme.palette['grey-400']};
    }

    &:hover {
      background-image: linear-gradient(
        to right,
        ${(props): string => props.theme.palette['grey-400']} 20%,
        rgba(255, 255, 255, 0) 10%
      );
      color: ${(props: ThemeProps): string => resolveEditedColor(props)};
    }

    &:focus {
      background-image: linear-gradient(
        to right,
        ${(props: ThemeProps): string => props.theme.palette['blue-600']} 20%,
        rgba(255, 255, 255, 0) 10%
      );
      color: ${(props: ThemeProps): string => resolveEditedColor(props)};
    }
  }
`;
