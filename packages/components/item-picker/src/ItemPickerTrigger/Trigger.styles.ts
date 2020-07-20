import styled, { css, FlattenInterpolation } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { ItemPickerSize } from '../ItemPicker';

type TriggerWrapperProps = {
  opened: boolean;
  disabled?: boolean;
  error?: boolean;
  size: ItemPickerSize;
  selected: boolean;
};

const getDefaultStyles = (props: ThemeProps & TriggerWrapperProps): string => {
  if (props.size === 'small') return `box-shadow: inset 0 0 0 1px ${props.theme.palette['grey-300']};`;
  return `border: 1px dashed ${props.theme.palette['grey-300']};`;
};

const getHoverStyles = (props: ThemeProps & TriggerWrapperProps): string => {
  if (props.size === 'small') return `box-shadow: inset 0 0 0 1px ${props.theme.palette['grey-400']};`;
  return `border: 1px dashed ${props.theme.palette['grey-400']};`;
};

const getErrorStyles = (props: ThemeProps & TriggerWrapperProps): string => {
  if (props.size === 'small') return `box-shadow: inset 0 0 0 1px ${props.theme.palette['red-600']};`;
  return `border: 1px dashed ${props.theme.palette['red-600']};`;
};

const getFocusStyles = (props: ThemeProps & TriggerWrapperProps): string => {
  if (props.size === 'small') return `box-shadow: inset 0 0 0 2px ${props.theme.palette['blue-600']};`;
  return `border: 1px dashed ${props.theme.palette['blue-600']};`;
};

export const ClearWrapper = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
`;

export const IconWrapper = styled.div<{ size: ItemPickerSize }>`
  top: ${(props): string => (props.size === 'small' ? '4px' : '12px')};
  right: ${(props): string => (props.size === 'small' ? '8px' : '12px')};
`;

export const Prefix = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Placeholder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  color: ${(props): string => props.theme.palette['grey-500']};
  ${Prefix} {
    svg {
      fill: ${(props): string => props.theme.palette['grey-500']};
      color: ${(props): string => props.theme.palette['grey-500']};
    }
  }
`;

export const Value = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  color: ${(props): string => props.theme.palette['grey-700']};
  max-width: 100%;
  overflow: hidden;
  ${Prefix} {
    svg {
      fill: ${(props): string => props.theme.palette['grey-600']};
      color: ${(props): string => props.theme.palette['grey-600']};
    }
  }
`;

export const Trigger = styled.div<{ size: ItemPickerSize }>`
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 3px;
  height: ${(props): string => (props.size === 'small' ? '32px' : '48px')};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  transition: all 0.3s ease;
  font-weight: ${(props): string => (props.size === 'small' ? '400' : '500')};
`;

export const TriggerWrapper = styled.div<TriggerWrapperProps>`
  width: 282px;
  display: flex;
  cursor: ${(props): string => {
    if (props.disabled) return 'not-allowed';
    if (props.selected) return 'default';
    return 'pointer';
  }};
  pointer-events: ${(props): string => (props.disabled ? 'none' : 'all')};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-radius: 3px;
  transition: all 0.3s ease;
  padding ${(props): string => (props.size === 'small' ? '0 8px' : '0 12px')};
  background-color: ${(props): string => {
    if (props.disabled) return props.theme.palette['grey-050'];
    if (props.error) return props.theme.palette['red-050'];
    return props.theme.palette.white;
  }};
  
  ${(props): string => getDefaultStyles(props)}
  &:hover {
    ${(props): string => getHoverStyles(props)};
  }

  &:focus {
    background-color: ${(props): string => props.theme.palette['blue-050']};
    ${(props): string => getFocusStyles(props)};
  }

  && {
    ${(props): FlattenInterpolation<ThemeProps> | false =>
      props.selected &&
      props.size === 'large' &&
      css`
        border: 1px solid ${props.theme.palette['grey-300']};
        &:hover {
          border: 1px solid ${props.theme.palette['grey-400']};
        }
      `};
    ${Value} {
      ${(props): FlattenInterpolation<ThemeProps> | false =>
        props.selected &&
        Boolean(props.disabled) &&
        css`
          color: ${props.theme.palette['grey-500']};
        `};
      }
    
    ${(props): FlattenInterpolation<ThemeProps> | false =>
      props.opened &&
      !props.error &&
      css`
        background-color: ${props.theme.palette['blue-050']};
        ${getFocusStyles(props)};
      `}
    ${(props): FlattenInterpolation<ThemeProps> | false =>
      Boolean(props.error) &&
      css`
        background-color: ${props.theme.palette['red-050']};
        ${getErrorStyles(props)}
      `};

    ${(props): FlattenInterpolation<ThemeProps> | false =>
      Boolean(props.disabled) &&
      css`
        ${IconWrapper} {
          opacity: 0.4;
        }
        ${Prefix} {
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
