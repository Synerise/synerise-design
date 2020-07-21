import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import is, { isNot } from 'styled-is';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

const getVar = (name: string) => (props: ThemeProps): string => props.theme.palette[name];

const transition = `
  transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
  transition-property: border-color, box-shadow, background-color;
`;

const mainPadding = 8;
const radioWidth = 20;
const radioSmallWidth = 16;
const radioBorderWidth = 1;

/*
const getMainPadding = (props: { size?: string; hasTick?: boolean }): string => {
  if (props.size === 'small') {
    return props.hasTick ? '24px 16px 8px' : '8px 16px';
  }

  return '24px';
};
*/

const sizeCondition = (smallValue: number | string, mediumValue: number | string) => (props: {
  size?: string;
}): string | number => (props.size === 'small' ? smallValue : mediumValue);

export const RadioShape = styled.div`
  ${transition};
  width: ${sizeCondition(radioSmallWidth, radioWidth)}px;
  height: ${sizeCondition(radioSmallWidth, radioWidth)}px;
  border-radius: 50%;
  border-width: ${radioBorderWidth}px;
  border-style: solid;
  border-color: ${getVar('grey-300')};
  margin: 2px;

  &:hover {
    border-color: ${getVar('grey-400')};
  }
`;

export const Container = styled.div<
  {
    disabled?: boolean;
    raised?: boolean;
    value?: boolean;
    stretch?: boolean;
    size?: string;
    stretchToFit?: boolean;
  } & ThemeProps
>`
  ${transition};
  background-color: ${getVar('white')};
  border-radius: ${(props): string => props.theme.variable('@border-radius-base')};
  display: flex;
  border-color: ${getVar('white')};
  position: relative;
  padding: ${(props): string => (props.size === 'small' ? '24px 16px 12px' : '24px')};
  cursor: pointer;

  ${is('stretchToFit')`
    height: 100%;
  `}

  ${isNot('disabled')`
    cursor: cursor;

    &:hover {
      ${RadioShape} {
        border-color: ${getVar('grey-400')};
      }
    }

    ${isNot('raised')`
      border: 2px solid ${getVar('blue-600')};

      ${isNot('value')`
        border: 1px solid ${getVar('grey-300')};
        
        &:hover, &:active {
          border: 1px solid ${getVar('grey-400')};
        }
      `};
    `};
    
    ${is('raised')`
      ${isNot('value')`
        box-shadow: ${(props: ThemeProps): string => props.theme.variable('@box-shadow-base') || 'none'};
        
        &:hover, &:active {
          box-shadow: ${(props: ThemeProps): string => props.theme.variable('@box-shadow-active') || 'none'};
        }
      `}
      
      ${is('value')`
        border: 2px solid ${getVar('blue-600')};
      `}
    `}
  `}

  ${is('disabled')`
    cursor: not-allowed;

    ${isNot('raised')`
      border: 2px solid ${getVar('grey-200')};

      ${isNot('value')`
        border: 1px solid ${getVar('grey-200')};
      `}
    `}
    
    ${is('raised')`
      ${is('value')`
        border: 2px solid ${getVar('grey-200')};
      `}
    `}
  `};
`;

export const Main = styled.div<{ disabled?: boolean; size?: string; hasTick?: boolean }>`
  ${is('disabled')`
    opacity: 0.4;
  `}
`;

export const Aside = styled.div`
  display: flex;
  padding: 0;
  justify-content: center;
  position: absolute;
  top: ${sizeCondition('4px', '14px')};
  left: ${sizeCondition('4px', '14px')};
`;

export const TickIcon = styled.div<{ size?: string; disabled?: boolean; selected?: boolean }>`
  ${is('selected')`
    transform: translate(-4px, -4px);
  `}

  ${is('disabled')`
    ${RadioShape} {
      background-color: ${getVar('grey-050')};
      border-color: ${getVar('grey-200')};
    }
  `}

  ${isNot('disabled')`
    ${RadioShape} {
      cursor: pointer;
    }
  `}
`;

export const Title = styled.div<{ hasIcon: boolean; size?: string }>`
  text-align: center;
  color: ${getVar('grey-800')};
  font-weight: 500;
  font-size: ${sizeCondition('10px', '14px')};
  margin: ${(props): string => (!props.hasIcon ? '0 16px' : '0')};
  width: 176px;

  ${(props): FlattenSimpleInterpolation | false =>
    props.size === 'small' &&
    props.hasIcon &&
    css`
      margin-top: 4px;
    `};
`;

export const Description = styled.div<{ hasTitle?: boolean; hasIcon?: boolean; size?: string }>`
  font-size: 12px;
  text-align: center;
  margin: ${(props): string => (!props.hasIcon ? '0 16px' : '0')};
  width: 176px;

  ${(props): FlattenSimpleInterpolation | undefined | false =>
    props.hasTitle &&
    css`
      margin-top: 8px;
    `};
`;

export const IconWrapper = styled.div`
  margin-bottom: ${sizeCondition(0, mainPadding)}px;
  text-align: center;
`;
