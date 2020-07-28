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

const mapElementsPosition = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};
/*
const getMainPadding = (props: { size?: string; hasTick?: boolean }): string => {
  if (props.size === 'small') {
    return props.hasTick ? '24px 16px 8px' : '8px 16px';
  }

  return '24px';
};
*/

const sizeCondition = (
  smallValue: number | string,
  mediumValue: number | string,
  props: {
    size?: string;
  }
) => (props.size === 'small' ? smallValue : mediumValue);

export const RadioShape = styled.div<{ size?: string }>`
  ${transition};
  width: ${(props): string | number => sizeCondition(radioSmallWidth, radioWidth, props)}px;
  height: ${(props): string | number => sizeCondition(radioSmallWidth, radioWidth, props)}px;
  border-radius: 50%;
  border-width: ${radioBorderWidth}px;
  border-style: solid;
  border-color: ${getVar('grey-300')};
  margin: 2px;

  &:hover {
    border-color: ${getVar('grey-400')};
  }
`;
export const Title = styled.div<{ hasIcon: boolean; size?: string }>`
  text-align: center;
  color: ${getVar('grey-800')};
  font-weight: 500;
  font-size: ${(props): string | number => sizeCondition('10px', '14px', props)};
  margin: ${(props): string => (!props.hasIcon ? '0 16px' : '0')};
  min-width: ${(props): string | number => sizeCondition('48px', '176px', props)};

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
  max-width: 176px;

  ${(props): FlattenSimpleInterpolation | undefined | false =>
  props.hasTitle &&
  css`
      margin-top: 8px;
    `};
`;

export const IconWrapper = styled.div`
  margin-bottom: ${(props): string | number => sizeCondition(0, mainPadding, props)}px;
  text-align: center;
`;
export const Aside = styled.div`
  display: flex;
  padding: 0;
  justify-content: center;
  position: absolute;
  top: ${(props): string | number => sizeCondition('4px', '14px', props)};
  
`;
export const Container = styled.div<
  {
    disabled?: boolean;
    raised?: boolean;
    value?: boolean;
    stretch?: boolean;
    size?: string;
    stretchToFit?: boolean;
    elementsPosition: string | 'left' | 'center' | 'right';
  } & ThemeProps
>`
  ${transition};
  background-color: ${getVar('white')};
  border-radius: ${(props): string => props.theme.variable('@border-radius-base')};
  display: flex;
  justify-content: ${(props): string => mapElementsPosition[props.elementsPosition]};
  border-color: ${getVar('white')};
  position: relative;
  padding: ${(props): string => (props.size === 'small' ? '24px 16px 12px' : '24px')};
  cursor: pointer;
  &&&:focus {
  border: 2px solid ;
  border-color: ${(props): string => props.theme.palette['blue-600']};
  }
  
  ${Title}, ${Description}, ${IconWrapper} {
  text-align: ${(props): string => props.elementsPosition};
  }
  
  ${Aside} {
  ${(props): string => props.elementsPosition === 'left' ? 'right': 'left'}: ${(props): string | number => sizeCondition('4px', '14px', props)};
  }
  
  ${IconWrapper} {
  margin-left: ${(props): string => props.elementsPosition === 'left' ? '-18px':'0px'};
  margin-right: ${(props): string => props.elementsPosition === 'right' ? '-18px':'0px'};
  }
  
  

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




