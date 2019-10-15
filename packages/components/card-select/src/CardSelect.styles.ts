import styled, { css } from 'styled-components';
import is, { isNot } from 'styled-is';

const getVar = (name: string) => (props): string => props.theme.palette[name];

const transition = `
  transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
  transition-property: border-color, box-shadow, background-color;
`;

const mainPadding = 8;
const mainPaddingSmall = 4;
const radioWidth = 20;
const radioSmallWidth = 16;
const radioBorderWidth = 1;

export const Container = styled.div<{ disabled: boolean; raised: boolean; value: boolean; stretch: boolean }>`
  ${transition}
  background-color: ${getVar('white')};
  border-radius: ${(props): string => props.theme.variable('@border-radius-base')};
  display: flex;
  border-color: ${getVar('white')};
  position: relative;

  ${is('stretchToFit')`
    height: 100%;
  `}

  ${isNot('disabled')`
    cursor: cursor;

    ${isNot('raised')`
      ${isNot('value')`
        padding: 1px;
        border: 1px solid ${getVar('grey-300')};
        
        &:hover, &:active {
          border: 1px solid ${getVar('grey-400')};
        }
      `};
      
      ${is('value')`
        border: 2px solid ${getVar('blue-600')};
      `};
    `};
    
    ${is('raised')`
      ${isNot('value')`
        padding: 2px;
        box-shadow: ${(props): string => props.theme.variable('@box-shadow-base')};
        
        &:hover, &:active {
          box-shadow: ${(props): string => props.theme.variable('@box-shadow-active')};
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
      ${isNot('value')`
        padding: 1px;
        border: 1px solid ${getVar('grey-200')};
      `}
      
      ${is('value')`
        border: 2px solid ${getVar('grey-200')};
      `}
    `}
    
    ${is('raised')`
      ${is('value')`
        border: 2px solid ${getVar('grey-200')};
      `}
      
      ${isNot('value')`
        padding: 2px;
      `}
    `}
  `};
`;

export const Main = styled.div`
  padding: 24px;
  width: 224px;

  ${is('disabled')`
    opacity: 0.4;
  `}
`;

export const Aside = styled.div`
  display: flex;
  padding: 0;
  justify-content: center;
  position: absolute;
  top: 14px;
  left: 14px;
`;

export const RadioShape = styled.div`
  ${transition}
  width: ${(props): number => (props.size === 'small' ? radioSmallWidth : radioWidth)}px;
  height: ${(props): number => (props.size === 'small' ? radioSmallWidth : radioWidth)}px;
  border-radius: 50%;
  border-width: ${radioBorderWidth}px;
  border-style: solid;
  border-color: ${getVar('grey-300')};
  margin: 2px;

  &:hover {
    border-color: ${getVar('grey-400')}
  }
`;

export const TickIcon = styled.div<{ size: string; disabled: boolean; selected: boolean }>`
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

export const Title = styled.div<{ hasIcon: boolean; size: string }>`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: ${getVar('grey-800')};

  ${(props): string =>
    !props.hasIcon &&
    css`
      margin: 0 12px;
    `};

  ${(props): string =>
    props.size === 'small' &&
    css`
      font-size: 10px;
    `};
`;

export const Description = styled.div<{ hasTitle: boolean; hasIcon: boolean }>`
  font-size: 12px;
  text-align: center;

  ${(props): string =>
    props.hasTitle &&
    css`
      margin-top: 8px;
    `};

  ${(props): string =>
    !props.hasIcon &&
    css`
      margin: 0 12px;
    `};

  ${(props): string =>
    props.size === 'small' &&
    css`
      font-size: 10px;
    `};
`;

export const IconWrapper = styled.div`
  margin-bottom: ${(props): number => (props.size === 'small' ? mainPaddingSmall : mainPadding)}px;
  text-align: center;

  ${(props): string =>
    props.size === 'small' &&
    css`
      margin-top: 5px;
    `};
`;
