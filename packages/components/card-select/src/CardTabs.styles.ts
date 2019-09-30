import styled, { css } from 'styled-components';
import is, { isNot } from 'styled-is';

// import { IconContainer } from '../Icon/Icon.styles';
const IconContainer = () => styled.span``;

const getVar = (name: string) => props => props.theme.palette[name];

const transition = `
  transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
  transition-property: border-color, box-shadow, background-color;
`;
const mainPadding = 16;
const mainPaddingSmall = 8;
const radioWidth = 16;
const radioSmallWidth = 12;
const radioBorderWidth = 1;

export const Container = styled.div`
  ${transition} background-color: #fff;
  border-radius: ${props => props.theme.variable('@border-radius-base')};
  display: flex;
  border-color: #fff;
  height: 100%;

  ${isNot('disabled')`
    cursor: pointer;
  
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
        box-shadow: ${props => props.theme.variable('@box-shadow-base')};
        
        &:hover, &:active {
          box-shadow: ${props => props.theme.variable('box-shadow-active')};
        }
      `}
      
      ${is('value')`
        border: 2px solid ${getVar('blue-600')};
      `}
    `}
  `} ${is('disabled')`
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
  flex: 1;
  padding: ${props => (props.size === 'small' ? mainPaddingSmall : mainPadding)}px 0;
  margin-left: -20px;
  margin-right: -20px;
`;

export const Aside = styled.div`
  flex: 0 0
    ${props => (props.size === 'small' ? mainPaddingSmall * 2 + radioSmallWidth : mainPadding * 2 + radioWidth)}px;
  display: flex;
  padding: ${props =>
    props.size === 'small' ? mainPaddingSmall - radioBorderWidth : mainPadding - radioBorderWidth}px;
  justify-content: center;
`;

export const Radio = styled.div`
  ${transition} width: ${props => (props.size === 'small' ? mainPaddingSmall : mainPadding)}px;
  width: ${props => (props.size === 'small' ? radioSmallWidth : radioWidth)}px;
  height: ${props => (props.size === 'small' ? radioSmallWidth : radioWidth)}px;
  box-sizing: content-box;
  border-radius: 50%;
  border-width: ${radioBorderWidth}px;
  border-style: solid;

  ${is('disabled')`
    color: ${getVar('grey-200')};
    border-color: ${getVar('grey-200')};
    background-color: ${getVar('grey-050')};
    
    ${isNot('value')`
      > ${IconContainer} {
        display: none;  
      }
    `}
  `};

  ${isNot('disabled')`
    color: #fff;
    
    ${is('value')`
      border-color: ${getVar('lime-color')};
      background-color: ${getVar('lime-color')};
      
      > ${IconContainer} {
        display: block;  
      }
    `}
    
    ${isNot('value')`
      border-color: ${getVar('grey-300')};
      
      > ${IconContainer} {
        display: none;  
      }
      
      ${Container}:hover &,
      ${Container}:active & {
        border-color: ${getVar('grey-400')};
      }
    `}
  `};

  > ${IconContainer} {
    transform: translate(-4px, -4px);
  }
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: ${getVar('grey-800')};

  ${props =>
    props.size === 'small' &&
    css`
      font-size: 10px;
    `};
`;

export const Description = styled.div`
  font-size: 12px;
  text-align: center;
  margin-top: 8px;

  ${props =>
    props.size === 'small' &&
    css`
      font-size: 10px;
    `};
`;

export const IconWrapper = styled.div`
  margin-bottom: ${props => (props.size === 'small' ? mainPaddingSmall : mainPadding)}px;
  text-align: center;

  ${props =>
    props.size === 'small' &&
    css`
      margin-top: 5px;
    `};
`;
