import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';
import { InPlaceEditableInputContainer } from '@synerise/ds-inline-edit/dist/InlineEdit.styles';
import { getColor, getLighterColor } from '../utils';

type CardTabContainerProps = {
  active: boolean;
  invalid: boolean;
  greyBackground: boolean;
  color: string;
  disabled: boolean;
  edited: boolean;
  draggable?: boolean;
  itemData?: unknown;
};

export const CardTabSuffix = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 24px;
  display: none;
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

export const CardTabLabel = styled.span`
  ${macro.h300};
  color: ${(props): string => props.theme.palette['grey-600']};
  line-height: 20px;
  position: relative;
  font-size: 13px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  ${InPlaceEditableInputContainer} {
    input {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: ${(props): string => props.theme.palette['grey-800']};
      background-image: linear-gradient(
        to right,
        ${(props): string => props.theme.palette['blue-600']} 0%,
        ${(props): string => props.theme.palette['blue-600']} 33%,
        rgba(255, 255, 255, 0) 34%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }
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
  width: 8px;
  height: 8px;
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

  &.persistent {
    display: block;
  }
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
  width: 168px;
  @media (max-width: 588px) {
    max-width: 145px;
  }
  height: 48px;
  user-select: none;
  background-color: ${({ theme, active, invalid, color, greyBackground }): string => {
    if (invalid && active) return theme.palette['red-600'];
    if (active) return theme.palette[`${color}`];
    if (greyBackground) return theme.palette.white;
    return theme.palette['grey-050'];
  }};
  box-shadow: ${({ greyBackground }): string => (greyBackground ? '0 4px 12px 0 rgba(35, 41, 54, 0.04)' : '0')};
  border-radius: 3px;
  border-width: ${({ greyBackground }): string => (greyBackground ? '0' : '1px')};
  border-color: ${({ theme, active, invalid, color }): string => {
    if (invalid) return theme.palette['red-600'];
    return getColor(active, theme.palette[`${color}`], theme.palette['grey-300']);
  }};
  border-style: solid;
  pointer-events: ${({ disabled }): string => (disabled ? 'none' : 'all')};

  ${CardTabTag} {
    background-color: ${({ theme, active, color }): string =>
      getColor(active, theme.palette.white, theme.palette[`${color}`])};
    color: ${({ theme, active, color }): string => getColor(active, theme.palette[`${color}`], theme.palette.white)};
  }
  ${CardDot} {
    background-color: ${({ theme, active, color, invalid }): string => {
      if (active && invalid) return theme.palette[`${color}`];
      return getColor(active, 'transparent', theme.palette[`${color}`]);
    }};
  }
  ${CardDotPrefix} {
    height: ${({ active, edited }): string => (active && !edited ? '12px' : '24px')};
    width: ${({ active, edited }): string => (active && !edited ? '12px' : '24px')};
    border-width: ${({ active, edited }): string => (active && !edited ? '2px' : '0px')};
    border-color: ${({ theme, active, edited }): string => (active && !edited ? theme.palette.white : 'none')};
    border-style: solid;
  }

  ${CardSuffixWrapper}${CardSuffixWrapper} {
    svg {
      color: ${({ theme, active }): string => {
        if (active) return theme.palette.white;
        return theme.palette['grey-600'];
      }};
      fill: ${({ theme, active }): string => {
        if (active) return theme.palette.white;
        return theme.palette['grey-600'];
      }} !important;
    }
  }

  ${CardTabSuffix}${CardTabSuffix} {
    svg {
      color: ${({ theme, active }): string => (active ? theme.palette.white : theme.palette['grey-600'])} !important;
      fill: ${({ theme, active }): string => (active ? theme.palette.white : theme.palette['grey-600'])} !important;
    }
    .remove {
      svg {
        color: ${({ theme, active }): string => (active ? theme.palette.white : theme.palette['red-600'])} !important;
        fill: ${({ theme, active }): string => (active ? theme.palette.white : theme.palette['red-600'])} !important;
      }
    }
  }

  ${CardIconPrefix}${CardIconPrefix} {
    svg {
      color: ${({ theme, active }): string => (active ? theme.palette.white : theme.palette['grey-600'])};
      fill: ${({ theme, active }): string => (active ? theme.palette.white : theme.palette['grey-600'])};
    }
  }
  ${CardDragPrefix}${CardDragPrefix} {
    svg {
      color: ${({ theme, active }): string => {
        if (active) return theme.palette.white;
        return theme.palette['grey-600'];
      }};
      fill: ${({ theme, active }): string => {
        if (active) return theme.palette.white;
        return theme.palette['grey-600'];
      }};
    }
  }

  &:hover {
    cursor: pointer;
    box-shadow: ${({ greyBackground }): string => (greyBackground ? '0 4px 12px 0 rgba(35, 41, 54, 0.04)' : '')};
    background-color: ${({ theme, active, invalid, color, greyBackground }): string => {
      if (invalid && active) return theme.palette[`${getLighterColor('red-600')}`];
      if (active) return theme.palette[`${getLighterColor(color)}`];
      if (greyBackground && !active) return theme.palette.white;
      return theme.palette['grey-050'];
    }};
    ${CardTabSuffix} {
      display: ${({ edited }): string => (edited ? 'none' : 'flex')};
    }
    ${CardSuffixWrapper} {
      display: ${({ edited }): string => (edited ? 'none' : 'flex')};
    }
    ${CardTabLabel} {
      color: ${({ theme, active }): string => {
        if (active) return theme.palette.white;
        return theme.palette['grey-800'];
      }};
    }
    ${CardTabTag} {
      background-color: ${({ theme, color, active }): string => {
        if (active) return theme.palette.white;
        return theme.palette[`${color}`];
      }};
      color: ${({ theme, active, color }): string => {
        if (active) return theme.palette[`${color}`];
        return theme.palette.white;
      }};
      display: ${(props): string => (props.draggable ? 'none' : 'flex')};
    }
    ${CardTabPrefix} {
      svg {
        color: ${({ theme, active }): string => {
          if (active) return theme.palette.white;
          return theme.palette['grey-600'];
        }};
        fill: ${({ theme, active }): string => {
          if (active) return theme.palette.white;
          return theme.palette['grey-600'];
        }};
      }
    }
    ${CardDragPrefix} {
      display: ${({ edited }): string => (edited ? 'none' : 'flex')};
      svg {
        color: ${({ theme, active }): string => {
          if (active) return theme.palette.white;
          return theme.palette['grey-600'];
        }};
        fill: ${({ theme, active }): string => {
          if (active) return theme.palette.white;
          return theme.palette['grey-600'];
        }};
      }
    }

    ${CardDotPrefix} {
      display: ${(props): string => (props.draggable ? 'none' : 'flex')};
    }
    ${CardIconPrefix}${CardIconPrefix} {
      display: ${(props): string => (props.draggable ? 'none' : 'flex')};
      svg {
        color: ${({ theme, active }): string => (active ? theme.palette.white : theme.palette['grey-600'])};
        fill: ${({ theme, active }): string => (active ? theme.palette.white : theme.palette['grey-600'])};
      }
    }
    .ds-card-tabs__suffix-icon {
      svg {
        color: ${({ theme, active }): string => {
          if (active) return theme.palette.white;
          return theme.palette['grey-600'];
        }};
        fill: ${({ theme, active }): string => {
          if (active) return theme.palette.white;
          return theme.palette['grey-600'];
        }} !important;
      }
    }
  }

  &:active {
    background-color: ${({ theme, active, invalid, color, greyBackground }): string => {
      if (invalid && active) return theme.palette[`${getLighterColor('red-600')}`];
      if (active) return theme.palette[`${getLighterColor(color)}`];
      if (greyBackground && !active) return theme.palette.white;
      return theme.palette['grey-100'];
    }};
  }

  ${InPlaceEditableInputContainer} {
    input {
      color: ${({ theme, active }): string => {
        if (active) return theme.palette.white;
        return theme.palette['grey-800'];
      }};
      padding: 0 !important;
      background-image: linear-gradient(
        to right,
        ${({ theme, active }): string => {
            if (active) return theme.palette.white;
            return theme.palette['grey-800'];
          }}
          0%,
        ${({ theme, active }): string => {
            if (active) return theme.palette.white;
            return theme.palette['grey-800'];
          }}
          33%,
        rgba(255, 255, 255, 0) 34%,
        rgba(255, 255, 255, 0) 100%
      ) !important;
    }
  }

  ${CardTabLabel} {
    color: ${({ theme, active }): string => {
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
