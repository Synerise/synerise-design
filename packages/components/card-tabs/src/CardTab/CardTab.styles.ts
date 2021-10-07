import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';
import { InPlaceEditableInputContainer } from '@synerise/ds-inline-edit/dist/InlineEdit.styles';

type CardTabContainerProps = {
  active: boolean;
  invalid: boolean;
  invalidName: boolean;
  greyBackground: boolean;
  color: string;
  disabled: boolean;
  edited: boolean;
  draggable?: boolean;
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
  && {
    svg {
      color: ${({ theme }): string => theme.palette['grey-500']};
      fill: ${({ theme }): string => theme.palette['grey-500']};
    }
    .remove {
      svg {
        color: ${({ theme }): string => theme.palette['red-600']};
        fill: ${({ theme }): string => theme.palette['red-600']};
      }
    }
  }
`;

export const CardTabName = styled.span`
  max-width: 100%;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
export const CardSuffixWrapper = styled.span`
  display: none;
`;

export const CardTabLabel = styled.span<{ invalidName: boolean }>`
  ${macro.h300};
  color: ${(props): string => props.theme.palette['grey-600']};
  line-height: 20px;
  position: relative;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  &&& {
    ${CardTabName} {
      background-color: transparent;
      background-position: bottom left;
      background-size: 5px 1px;
      background-repeat: repeat-x;
      background-image: ${(props): string =>
        props.invalidName
          ? `linear-gradient(
        to right,
        ${props.invalidName ? props.theme.palette['red-600'] : props.theme.palette['blue-600']} 0%,
        ${props.invalidName ? props.theme.palette['red-600'] : props.theme.palette['blue-600']} 33%,
        rgba(255, 255, 255, 0) 34%,
        rgba(255, 255, 255, 0) 100%
      );`
          : 'none'};
    }
  }
  ${InPlaceEditableInputContainer} {
    input {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: ${(props): string =>
        props.invalidName ? props.theme.palette['red-600'] : props.theme.palette['grey-800']};
      background-image: linear-gradient(
        to right,
        ${(props): string => (props.invalidName ? props.theme.palette['red-600'] : props.theme.palette['blue-600'])} 0%,
        ${(props): string => (props.invalidName ? props.theme.palette['red-600'] : props.theme.palette['blue-600'])} 33%,
        rgba(255, 255, 255, 0) 34%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }
`;

export const CardTabTag = styled.div<{}>`
  ${macro.h200}
  color: ${({ theme }): string => theme.palette.white};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 3px;
`;
export const CardDotPrefix = styled.div`
  ${macro.h200}
  color: ${({ theme }): string => theme.palette.white};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;
export const CardDot = styled.div`
  ${macro.h200}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6px;
  height: 6px;
  border-radius: 50%;
`;

export const CardTabPrefix = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;
export const CardDragPrefix = styled.div`
  display: none;
`;
export const CardIconPrefix = styled.div`
  display: flex;
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
  background-color: ${({ theme, active, invalid, color, greyBackground, edited }): string => {
    if (invalid && active) return theme.palette['red-600'];
    if (active && !edited) return theme.palette[`${color}`];
    if (greyBackground) return theme.palette.white;
    return theme.palette['grey-050'];
  }};
  box-shadow: ${({ greyBackground }): string => (greyBackground ? '0 4px 12px 0 rgba(35, 41, 54, 0.04)' : '0')};
  border-radius: 3px;
  border-width: 1px;
  border-color: ${({ theme, active, invalid, color, edited }): string => {
    if (invalid) return theme.palette['red-600'];
    if (edited) return theme.palette['blue-600'];
    return getColor(active && !edited, theme.palette[`${color}`], theme.palette['grey-300']);
  }};
  border-style: solid;
  pointer-events: ${({ disabled }): string => (disabled ? 'none' : 'all')};

  ${CardTabTag} {
    background-color: ${({ theme, active, color, edited }): string =>
      getColor(active && !edited, theme.palette.white, theme.palette[`${color}`])};
    color: ${({ theme, active, color, edited }): string =>
      getColor(active && !edited, theme.palette[`${color}`], theme.palette.white)};
  }
  ${CardDot} {
    background-color: ${({ theme, active, color, edited }): string =>
      getColor(active && !edited, 'transparent', theme.palette[`${color}`])};
  }
  ${CardDotPrefix} {
    height: ${({ active, edited }): string => (active && !edited ? '12px' : '24px')};
    width: ${({ active, edited }): string => (active && !edited ? '12px' : '24px')};
    border-width: ${({ active, edited }): string => (active && !edited ? '2px' : '0px')};
    border-color: ${({ theme, active, edited }): string => (active && !edited ? theme.palette.white : 'none')};
    border-style: solid;
  }

  &:hover {
    cursor: pointer;
    box-shadow: ${({ greyBackground, theme }): string =>
      greyBackground
        ? '0px 10px 13px -7px #000000,-25px 20px 19px -16px rgba(0,0,0,0)'
        : `0px 4px 8px 5px ${theme.palette[`grey-050`]}`};
    background-color: ${({ theme, greyBackground }): string =>
      greyBackground ? theme.palette.white : theme.palette['grey-050']};
    ${CardTabSuffix} {
      display: ${({ edited }): string => (edited ? 'none' : 'flex')};
    }
    ${CardSuffixWrapper} {
      display: ${({ edited }): string => (edited ? 'none' : 'flex')};
    }
    ${CardTabLabel} {
      color: ${({ theme, invalidName }): string =>
        invalidName ? theme.palette['red-600'] : theme.palette['grey-800']};
    }
    ${CardTabTag} {
      background-color: ${({ theme, color }): string => theme.palette[`${color}`]};
      color: ${({ theme }): string => theme.palette.white};
      display: none;
    }
    ${CardTabPrefix} {
      svg {
        color: ${({ theme }): string => theme.palette['grey-600']} !important;
        fill: ${({ theme }): string => theme.palette['grey-600']} !important;
      }
    }
    ${CardDragPrefix} {
      display: flex;
      svg {
        color: ${({ theme }): string => theme.palette['grey-600']} !important;
        fill: ${({ theme }): string => theme.palette['grey-600']} !important;
      }
    }
    ${CardDotPrefix} {
      display: none;
    }
    ${CardIconPrefix} {
      display: none;
      svg {
        color: ${({ theme }): string => theme.palette['grey-600']} !important;
        fill: ${({ theme }): string => theme.palette['grey-600']} !important;
      }
    }
    .ds-card-tabs__suffix-icon {
      svg {
        color: ${({ theme }): string => theme.palette['grey-600']};
        fill: ${({ theme }): string => theme.palette['grey-600']};
      }
    }
  }

  &.pressed {
    background-color: ${({ theme, greyBackground }): string =>
      !greyBackground ? theme.palette['grey-100'] : theme.palette.white};
  }

  ${CardTabLabel} {
    color: ${({ theme, active, invalidName }): string => {
      if (invalidName) return theme.palette['red-600'];
      if (active) return theme.palette.white;
      return theme.palette['grey-600'];
    }};
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
      color: ${({ theme, active }): string => getColor(active, theme.palette.white, theme.palette['grey-600'])};
      fill: ${({ theme, active }): string => getColor(active, theme.palette.white, theme.palette['grey-600'])};
    }

    ${CardTabSuffix} {
      opacity: ${({ disabled }): number => (disabled ? 0.4 : 1)};
    }
  }
`;
