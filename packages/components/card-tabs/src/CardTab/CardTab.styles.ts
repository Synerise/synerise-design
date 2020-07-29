import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';

type CardTabContainerProps = {
  active: boolean;
  invalid: boolean;
  greyBackground: boolean;
  color: string;
  disabled: boolean;
  edited: boolean;
};

const getColor = (isActive: boolean, activeColor: string, defaultColor: string): string => {
  if (isActive) return activeColor;
  return defaultColor;
};

export const CardTabSuffix = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 24px;
  display: none;
  svg {
    color: ${({ theme }): string => theme.palette['grey-500']}
    fill: ${({ theme }): string => theme.palette['grey-500']} 
  }
  .ds-card-tabs__remove-icon {
    svg {
      color: ${({ theme }): string => theme.palette['red-600']}
      fill: ${({ theme }): string => theme.palette['red-600']} 
    }
  }
`;

export const CardTabLabel = styled.span`
  ${macro.h300};
  color: ${({ theme }): string => theme.palette['grey-600']};
  line-height: 20px;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1;
`;

export const CardTabTag = styled.div`
  ${macro.h200}
  color: ${({ theme }): string => theme.palette.white};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 3px;
`;

export const CardTabPrefix = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

export const CardTabContainer = styled.div<CardTabContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 12px;
  width: 180px;
  height: 48px;
  user-select: none;
  background-color: ${({ theme, active, invalid, color, greyBackground }): string => {
    if (invalid && active) return theme.palette['red-600'];
    if (active) return theme.palette[color];
    if (greyBackground) return theme.palette.white;
    return theme.palette['grey-050'];
  }};
  box-shadow: ${({ greyBackground }): string => (greyBackground ? '0 4px 12px 0 rgba(35, 41, 54, 0.04)' : '0')};
  border-radius: 3px;
  border-width: 1px;
  border-color: ${({ theme, active, invalid, color }): string => {
    if (invalid) return theme.palette['red-600'];
    return getColor(active, theme.palette[color], theme.palette['grey-050']);
  }};
  border-style: solid;
  pointer-events: ${({ disabled }): string => (disabled ? 'none' : 'all')};
  
  &:hover {
    cursor: pointer;
    background-color: ${({ theme, greyBackground }): string =>
      greyBackground ? theme.palette.white : theme.palette['grey-050']};
    ${CardTabSuffix} {
      display: flex; 
    }
    ${CardTabLabel} {
      color: ${({ theme }): string => theme.palette['grey-800']};
    }
    ${CardTabTag} {
      background-color: ${({ theme, color }): string => theme.palette[color]}
      color: ${({ theme }): string => theme.palette.white};
    }
    ${CardTabPrefix} {
      svg {
        color: ${({ theme }): string => theme.palette['grey-600']} !important;
        fill: ${({ theme }): string => theme.palette['grey-600']} !important;
      }
    }
    .ds-card-tabs__suffix-icon {
      svg {
        color: ${({ theme }): string => theme.palette['grey-600']}
        fill: ${({ theme }): string => theme.palette['grey-600']} 
      }
    }
  }
  
  &.pressed {
    background-color: ${({ theme }): string => theme.palette['grey-100']};
  }
  
  ${CardTabTag} {
    background-color: ${({ theme, active, color }): string =>
      getColor(active, theme.palette.white, theme.palette[color])};
    color: ${({ theme, active, color }): string => getColor(active, theme.palette[color], theme.palette.white)};
  }
  
  ${CardTabLabel} { 
    color: ${({ theme, active }): string => (active ? theme.palette.white : theme.palette['grey-600'])};
    opacity: ${({ disabled }): number => (disabled ? 0.4 : 1)};
  }
  
  .ds-card-tabs__suffix-icon {
    svg {
      color: ${({ theme, active }): string => getColor(active, theme.palette.white, theme.palette['grey-600'])};
      fill: ${({ theme, active }): string => getColor(active, theme.palette.white, theme.palette['grey-600'])};
    }
    opacity: ${({ disabled }): number => (disabled ? 0.4 : 1)};
  }
  
  ${CardTabPrefix} {
    opacity: ${({ disabled }): number => (disabled ? 0.4 : 1)};
    .ds-card-tabs__handle-icon {
      svg {
        color: ${({ theme, active }): string => getColor(active, theme.palette.white, theme.palette['grey-400'])};
        fill: ${({ theme, active }): string => getColor(active, theme.palette.white, theme.palette['grey-400'])};
      }
    }
    svg {
      color: ${({ theme, active }): string => getColor(active, theme.palette.white, theme.palette['grey-600'])}
      fill: ${({ theme, active }): string => getColor(active, theme.palette.white, theme.palette['grey-600'])};
    }
    
    ${CardTabSuffix} {
      opacity: ${({ disabled }): number => (disabled ? 0.4 : 1)};
    }
  }
`;
