import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';


export const TabLabel = styled.span`
  ${macro.h300}
  line-height: 20px;
  word-wrap: nowrap;
  color: ${({ theme }): string => theme.palette['grey-700']};
`;

export const TabContent = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  justify-content: flex-start;
  height: 24px;
`;

export const TabContainer = styled.button`
  display: flex;
  height: 34px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-right: 24px;
  cursor: pointer;
  box-sizing: content-box;
  user-select: none;
  position: relative;
  background: transparent;
  border: 0;
  outline: 0;
  padding: 0;
  
  ${IconContainer} {
    margin-right: 4px;
  }
  
  &::after {
    content: '';
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 2px solid transparent;
  }
  
  &:hover {
    ${TabLabel}{
      color: ${({ theme }): string => theme.palette['grey-800']};
    }
    svg {
      color: ${({ theme }): string => theme.palette['grey-800']};
      fill: ${({ theme }): string => theme.palette['grey-800']};
    }
    &::after {
      border-bottom: 0px;
    }
  }
  
  svg {
    color: ${({theme}): string => theme.palette['grey-600']};
    fill: ${({ theme }): string => theme.palette['grey-600']};
  }
  
  &:focus {
    &::after {
      border-bottom: 1px dotted ${({theme}) => theme.palette['blue-600']};
    }
  }
  
  ${TabLabel} {
    color: ${({ theme }): string => theme.palette['grey-700']};
  }
  
  &.active {
    svg {
      color: ${({theme}): string => theme.palette['blue-600']};
      fill: ${({ theme }): string => theme.palette['blue-600']};
    }
    
    ${TabLabel} {
      color: ${({ theme }): string => theme.palette['blue-600']};
    }
    
    &::after {
      border-bottom: 2px solid ${({theme}) => theme.palette['blue-600']} !important;
    }
  }
  
  &.pressed {
    svg {
      color: ${({theme}): string => theme.palette['blue-700']};
      fill: ${({ theme }): string => theme.palette['blue-700']};
    }
    
    ${TabLabel} {
      color: ${({ theme }): string => theme.palette['blue-700']};
    }
    
    &::after {
      border-bottom: 0px solid ${({theme}) => theme.palette['blue-700']} !important;
    }
  }
`;
