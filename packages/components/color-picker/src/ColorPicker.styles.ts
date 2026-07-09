import styled, { createGlobalStyle } from 'styled-components';

import CopyIcon from '@synerise/ds-copy-icon';
import { Input } from '@synerise/ds-input';
import { Tag } from '@synerise/ds-tags';

import { ColorPickerSize } from './ColorPicker.types';

const SIZE_DEFAULT = 168;

export const Container = styled.div<{ size?: 'S' | 'M' | 'L' }>`
  width: 100%;
  @media (min-width: 200px) {
    min-width: 200px;
    background-color: ${(props) => props.theme.palette.white};
  }
  .react-colorful__last-control {
    margin: 24px 56px 8px 17px;
    border-radius: 4px;
    height: 8px;
  }
  .react-colorful__saturation {
    border-bottom: 0px;
    border-radius: 4px 4px 0 0;
    height: 96px;
    .react-colorful__interactive {
      width: 100%;
      height: 100%;
    }
  }
  .react-colorful__pointer {
    width: 16px;
    height: 16px;
  }
  .react-colorful {
    width: 100%;
    height: ${(props) =>
      props.size ? ColorPickerSize[props.size] : SIZE_DEFAULT}px;
  }
  .react-colorful__hue-pointer {
    border: 1px solid ${(props) => props.theme.palette['grey-300']};
    box-shadow: none !important;
    .react-colorful__pointer-fill {
      background-color: ${(props) => props.theme.palette.white} !important;
    }
  }
  .ant-divider-horizontal {
    margin: 16px 0px;
  }
`;

export const SubContainer = styled.div<{ savedColors?: boolean }>`
  padding: 8px 16px 16px;
  margin-bottom: ${(props) => (props.savedColors ? `0` : `-16px`)};
`;

export const ColorTag = styled(Tag)`
  width: 16px;
  height: 16px;
  border: 1px solid ${(props) => props.theme.palette['grey-300']};
`;

const SWATCH_SIZE = 16;

/** The "+" swatch creator (Figma: Swatch Creator). Plain button, not ds-button. */
export const SwatchCreatorButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: ${SWATCH_SIZE}px;
  height: ${SWATCH_SIZE}px;
  padding: 0;
  border: none;
  border-radius: 3px;
  background-color: transparent;
  color: ${(props) => props.theme.palette['grey-800']};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.palette['grey-200']};
  }

  &:focus-visible {
    outline: 1px solid ${(props) => props.theme.palette['blue-600']};
    outline-offset: 1px;
  }
`;

/** A single filled saved-colour swatch (Figma: Swatch — Filled / Filled Selected). */
export const Swatch = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: ${SWATCH_SIZE}px;
  height: ${SWATCH_SIZE}px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 3px;
  cursor: pointer;

  &:focus-visible {
    outline: 1px solid ${(props) => props.theme.palette['blue-600']};
    outline-offset: 1px;
  }
`;

/** The centred white dot shown on the currently-selected swatch (Figma: Filled Selected). */
export const SwatchDot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.palette.white};
`;

/** An empty swatch slot (Figma: Swatch — Default). */
export const SwatchPlaceholder = styled.div`
  flex: 0 0 auto;
  width: ${SWATCH_SIZE}px;
  height: ${SWATCH_SIZE}px;
  border: 1px solid ${(props) => props.theme.palette['grey-300']};
  border-radius: 3px;
`;

export const StyledCopyIcon = styled(CopyIcon)`
  display: none;
`;

export const ColorPickerInput = styled(Input)`
  &:hover {
    ${StyledCopyIcon} {
      display: flex;
    }
  }
  /* tabular figures so the hex/colour value keeps a steady width as digits change */
  input {
    font-variant-numeric: tabular-nums;
  }
`;

export const ColorPickerSelect = styled(Input)`
  &&& {
    width: 100px;
    /* The color swatch is supplied via the Input's innerPrefix slot. */
    input {
      box-shadow: none;
      /* tabular figures so the colour value keeps a steady width as digits change */
      font-variant-numeric: tabular-nums;
    }
  }
`;

export const PrefixTag = styled.div<{
  height?: boolean;
  size?: 'S' | 'M' | 'L';
}>`
  &&& .ds-tag {
    margin: 0;
    width: 24px;
    height: 24px;
    border: 1px solid ${(props) => props.theme.palette['grey-300']};
    cursor: auto;
    &:hover:before {
      cursor: auto;
      filter: brightness(100%);
    }
  }
  position: absolute;
  right: 16px;
  top: ${(props) =>
    (props.size ? ColorPickerSize[props.size] : SIZE_DEFAULT) - 25}px;
  z-index: 2;
  cursor: auto;
`;

export const SwatchSectionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  padding-top: 16px;
`;

export const PreffixWrapper = styled.div`
  margin: 0px 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.palette['grey-500']};
`;

export const ValueWrapper = styled.div`
  display: flex;
  font-size: 12px;
`;

export const ColorPickerModalStyle = createGlobalStyle<{ maxWidth: number }>`
.color-picker-overlay {
  min-width: unset !important;
  max-width: ${({ maxWidth }) => maxWidth}px; 
  width: 100%;
}`;

export default {
  Container,
  SubContainer,
  ColorTag,
  PrefixTag,
  SwatchCreatorButton,
  Swatch,
  SwatchDot,
  SwatchPlaceholder,
  SwatchSectionWrapper,
  PreffixWrapper,
  ValueWrapper,
  CopyIcon,
  ColorPickerInput,
  ColorPickerSelect,
  ColorPickerModalStyle,
};
