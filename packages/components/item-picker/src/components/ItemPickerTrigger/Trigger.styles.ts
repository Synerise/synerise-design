import styled, { css } from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';
import { InformationCardTooltip } from '@synerise/ds-information-card';

import { type ItemPickerSize } from '../ItemPickerLegacy/ItemPickerLegacy.types';

type TriggerWrapperProps = {
  opened: boolean;
  disabled?: boolean;
  error?: boolean;
  size: ItemPickerSize;
  selected: boolean;
  clearable: boolean;
};

const getDefaultStyles = (props: ThemeProps & TriggerWrapperProps) => {
  if (props.size === 'small') {
    return `box-shadow: inset 0 0 0 1px ${props.theme.palette['grey-400']};`;
  }
  return `border: 1px dashed ${props.theme.palette['grey-400']};`;
};

const getHoverStyles = (props: ThemeProps & TriggerWrapperProps) => {
  if (props.size === 'small') {
    return `box-shadow: inset 0 0 0 1px ${props.theme.palette['grey-500']};`;
  }
  return `border: 1px dashed ${props.theme.palette['grey-500']};`;
};

const getErrorStyles = (props: ThemeProps & TriggerWrapperProps) => {
  if (props.size === 'small') {
    return `box-shadow: inset 0 0 0 1px ${props.theme.palette['red-600']};`;
  }
  return `border: 1px dashed ${props.theme.palette['red-600']};`;
};

const getFocusStyles = (props: ThemeProps & TriggerWrapperProps) => {
  if (props.size === 'small') {
    return `box-shadow: inset 0 0 0 2px ${props.theme.palette['blue-600']};`;
  }
  return `border: 1px dashed ${props.theme.palette['blue-600']};`;
};

export const ClearIconWrapper = styled.div``;
export const AngleIconWrapper = styled.div``;

export const ClearWrapper = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
`;

export const IconWrapper = styled.div<{ size: ItemPickerSize }>`
  top: ${(props) => (props.size === 'small' ? '4px' : '12px')};
  right: ${(props) => (props.size === 'small' ? '8px' : '12px')};
`;

export const Prefix = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Placeholder = styled.div<{ size: ItemPickerSize }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  color: ${(props) => props.theme.palette['grey-500']};
  padding: 0 0 0 4px;
  ${Prefix} {
    svg {
      fill: ${(props) => props.theme.palette['grey-500']};
      color: ${(props) => props.theme.palette['grey-500']};
    }
  }
  &:hover {
    color: ${(props) =>
      props.size === 'large'
        ? props.theme.palette['grey-600']
        : props.theme.palette['grey-500']};
    ${Prefix} {
      svg {
        fill: ${(props) => props.theme.palette['grey-600']};
        color: ${(props) => props.theme.palette['grey-600']};
      }
    }
  }
`;

export const Value = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  color: ${(props) => props.theme.palette['grey-800']};
  max-width: 100%;
  overflow: hidden;
  padding: 0 0 0 4px;
  ${Prefix} {
    svg {
      fill: ${(props) => props.theme.palette['grey-600']};
      color: ${(props) => props.theme.palette['grey-600']};
    }
  }
`;

export const Trigger = styled.div<{ size: ItemPickerSize }>`
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 3px;
  height: ${(props) => (props.size === 'small' ? '32px' : '48px')};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  transition: all 0.3s ease;
  font-weight: ${(props) => (props.size === 'small' ? '400' : '500')};
`;

export const TriggerWrapper = styled.div<TriggerWrapperProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: ${(props) => {
    if (props.disabled) {
      return 'not-allowed';
    }
    if (props.selected) {
      return 'default';
    }
    return 'pointer';
  }};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'all')};
  
  position: relative;
  border-radius: 3px;
  transition: all 0.3s ease;
  padding ${(props) => (props.size === 'small' ? '0 8px' : '0 12px')};
  background-color: ${(props) => {
    if (props.disabled) {
      return props.theme.palette['grey-100'];
    }
    if (props.error) {
      return props.theme.palette['red-050'];
    }
    if (props.size === 'large') {
      return 'transparent';
    }
    return props.theme.palette.white;
  }};
  
  ${(props) => getDefaultStyles(props)}
  ${(props) =>
    props.clearable &&
    props.size === 'small' &&
    `
    ${AngleIconWrapper} {
      display: block; 
    }
    ${ClearIconWrapper} {
      display: none; 
    }
  `}
  &:hover {
    ${(props) => getHoverStyles(props)};
    ${(props) =>
      props.clearable &&
      props.size === 'small' &&
      `
      ${AngleIconWrapper} {
        display: none; 
      }
      ${ClearIconWrapper} {
        display: block; 
      }
    `}
    
  }

  &:focus {
    background-color: ${(props) => props.theme.palette['blue-050']};
    ${(props) => getFocusStyles(props)};
  }

  && {
    ${(props) =>
      props.selected &&
      props.size === 'large' &&
      css`
        border: 1px solid ${props.theme.palette['grey-300']};
        &:hover {
          border: 1px solid ${props.theme.palette['grey-400']};
        }
      `};
    
    ${(props) =>
      props.opened &&
      !props.error &&
      css`
        background-color: ${props.theme.palette['blue-050']};
        ${getFocusStyles(props)};
      `}
    ${(props) =>
      Boolean(props.error) &&
      css`
        background-color: ${props.theme.palette['red-050']};
        ${getErrorStyles(props)}
      `};

    ${(props) =>
      Boolean(props.disabled) &&
      css`
        ${IconWrapper} {
          opacity: 0.4;
        }
      `};
  }
`;

export const ChangeButtonWrapper = styled.div`
  margin: 0 4px 0 8px;
`;

export const ValueText = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const TriggerTooltip = styled(InformationCardTooltip)`
  width: 100%;
`;
