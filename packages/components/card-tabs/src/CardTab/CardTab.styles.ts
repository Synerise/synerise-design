import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';

export const CardTabSuffix = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 24px;
  display: none;
  svg {
    color: ${({ theme, active }): string => {
      return theme.palette['grey-500'];
    }}
    fill: ${({ theme, active }): string => {
      return theme.palette['grey-500'];
    }} 
  }
  .ds-remove-icon {
    svg {
      color: ${({ theme, active }): string => {
        return theme.palette['red-600'];
      }}
      fill: ${({ theme, active }): string => {
        return theme.palette['red-600'];
      }} 
    }
  }
`;

export const CardTabLabel = styled.span`
  ${macro.h300};
  color: ${({ theme }): string => theme.palette['grey-600']};
  line-height: 20px;
  font-size: 14px;
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
  background-color: ${({ theme, color }): string => theme.palette[color]}
`;

export const CardTabPrefix = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

export const CardTabContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 12px;
  width: 180px;
  height: 48px;
  user-select: none;
  background-color: ${({ theme, active, invalid, color }): string => {
    if (invalid && active) return theme.palette['red-600'];
    if (active) return theme.palette[color];
    return theme.palette['grey-050'];
  }};
  border-radius: 3px;
  border-width: 1px;
  border-color: ${({ theme, active, invalid, color }): string => {
    if (invalid) return theme.palette['red-600'];
    if (active) return theme.palette[color];
    return theme.palette['grey-050'];
  }};
  border-style: solid;
  opacity: ${({ disabled }): number => (disabled ? 0.4 : 1)};
  pointer-events: ${({ disabled }): string => (disabled ? 'none' : 'all')};
  
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }): string => theme.palette['grey-050']};
    ${CardTabSuffix} {
      display: flex; 
    }
    ${CardTabLabel} {
      color: ${({ theme }): string => theme.palette['grey-800']}; 
    }
    ${CardTabTag} {
      background-color: ${({ theme, active, color }): string => theme.palette[color]}
      color: ${({ theme, active, color }): string => theme.palette.white};
    }
    ${CardTabPrefix} {
      svg {
        color: ${({ theme }): string => {
          return theme.palette['grey-600'];
        }} !important;
        fill: ${({ theme }): string => {
          return theme.palette['grey-600'];
        }} !important;
      }
    }
  }
  
  &.pressed {
    background-color: ${({ theme }): string => theme.palette['grey-100']};
  }
  
  ${CardTabTag} {
    background-color: ${({ theme, active, color }): string => {
      if (active) return theme.palette.white;
      return theme.palette[color];
    }}
    color: ${({ theme, active, color }): string => {
      if (active) return theme.palette[color];
      return theme.palette.white;
    }}
  }
  
  ${CardTabLabel} { 
    color: ${({ theme, active }): string => (active ? theme.palette.white : theme.palette['grey-600'])};
  }
  
  ${CardTabPrefix} {
    .ds-handle-icon {
      svg {
        color: ${({ theme, active }): string => {
          if (active) return theme.palette.white;
          return theme.palette['grey-400'];
        }}
              fill: ${({ theme, active }): string => {
                if (active) return theme.palette.white;
                return theme.palette['grey-400'];
              }} 
      }
    }
    svg {
      color: ${({ theme, active }): string => {
        if (active) return theme.palette.white;
        return theme.palette['grey-600'];
      }}
      fill: ${({ theme, active }): string => {
        if (active) return theme.palette.white;
        return theme.palette['grey-600'];
      }} 
    }
  }
`;
