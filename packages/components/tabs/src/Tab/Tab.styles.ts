import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';

export const TabLabel = styled.span`
  ${macro.h300}
  line-height: 20px;
  white-space: nowrap;
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
  pointer-events: ${({ disabled }): string => (disabled ? 'none' : 'all')}
  opacity: ${({ disabled }): string => (disabled ? '0.4' : '1')}
  margin-top: 4px;
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
    height: 2px;
    background: transparent;
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
      height: 0;
    }
  }
  
  svg {
    color: ${({ theme }): string => theme.palette['grey-600']};
    fill: ${({ theme }): string => theme.palette['grey-600']};
  }
  
  &:focus {
    &::after {
      height: 1px;
      background-color: transparent;
      background-image: linear-gradient(to right, ${({ theme }): string => theme.palette.white} 66%, ${({
  theme,
}): string => theme.palette['blue-600']} 34%);
      background-position: top;
      background-size: 5px 1px;
      background-repeat: repeat-x;
    }
  }
  
  ${TabLabel} {
    color: ${({ theme }): string => theme.palette['grey-700']};
  }
  
  &.active {
    svg {
      color: ${({ theme }): string => theme.palette['blue-600']};
      fill: ${({ theme }): string => theme.palette['blue-600']};
    }
    
    ${TabLabel} {
      color: ${({ theme }): string => theme.palette['blue-600']};
    }
    
    && {
      &.underscore::after {
        height: 1px;
        background-color: ${({ theme }): string => theme.palette['blue-600']};
      }
    }
    &::after {
      background-image: none;
    }
  }
  
  &.pressed {
    svg {
      color: ${({ theme }): string => theme.palette['blue-700']};
      fill: ${({ theme }): string => theme.palette['blue-700']};
    }
    
    ${TabLabel} {
      color: ${({ theme }): string => theme.palette['blue-700']};
    }
    && {
      &::after {
        height: 0;
      }
    }
    &::after {
      background-image: none;
    }
  }
`;
