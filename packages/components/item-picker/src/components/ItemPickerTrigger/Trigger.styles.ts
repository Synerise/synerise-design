import styled, { css } from 'styled-components';

import type { ThemeProps } from '@synerise/ds-core';

import type { ItemPickerSize } from '../ItemPickerLegacy/ItemPickerLegacy.types';

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
    return `box-shadow: inset 0 0 0 1px var(--ds-form-field-border-default);`;
  }
  return `border: 1px dashed var(--ds-form-field-border-default);`;
};

const getHoverStyles = (props: ThemeProps & TriggerWrapperProps) => {
  if (props.size === 'small') {
    return `box-shadow: inset 0 0 0 1px var(--ds-form-field-border-hover);`;
  }
  return `border: 1px dashed var(--ds-form-field-border-hover);`;
};

const getErrorStyles = (props: ThemeProps & TriggerWrapperProps) => {
  if (props.size === 'small') {
    // 2px ring to match the standard DS field error border (and getFocusStyles).
    return `box-shadow: inset 0 0 0 2px var(--ds-form-field-border-validated);`;
  }
  return `border: 1px dashed var(--ds-form-field-border-validated);`;
};

const getFocusStyles = (props: ThemeProps & TriggerWrapperProps) => {
  if (props.size === 'small') {
    return `box-shadow: inset 0 0 0 2px var(--ds-form-field-border-focus);`;
  }
  return `border: 1px dashed var(--ds-form-field-border-focus);`;
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
  color: var(--ds-form-field-text-placeholder);
  padding: 0 0 0 4px;
  ${Prefix} {
    svg {
      fill: var(--ds-color-icon-base-subtle);
      color: var(--ds-color-icon-base-subtle);
    }
  }
  &:hover {
    color: ${(props) =>
      props.size === 'large'
        ? 'var(--ds-color-text-base-muted)'
        : 'var(--ds-form-field-text-placeholder)'};
    ${Prefix} {
      svg {
        fill: var(--ds-form-icon-color-default);
        color: var(--ds-form-icon-color-default);
      }
    }
  }
`;

export const Value = styled.div<{ isObjectDeleted?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  color: var(--ds-form-field-text-value);
  max-width: 100%;
  overflow: hidden;
  padding: 0 0 0 4px;
  ${(props) =>
    !props.isObjectDeleted &&
    css`
      ${Prefix} {
        svg {
          fill: var(--ds-form-icon-color-default);
          color: var(--ds-form-icon-color-default);
        }
      }
    `}
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
  padding: ${(props) => (props.size === 'small' ? '0 8px' : '0 12px')};
  background-color: ${(props) => {
    if (props.disabled) {
      return 'var(--ds-form-field-bg-disabled)';
    }
    if (props.error) {
      return 'var(--ds-form-field-bg-validated)';
    }
    if (props.size === 'large') {
      return 'transparent';
    }
    return 'var(--ds-form-field-bg-default)';
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
    background-color: var(--ds-form-field-bg-focus);
    ${(props) => getFocusStyles(props)};
  }

  && {
    ${(props) =>
      props.selected &&
      props.size === 'large' &&
      css`
        border: 1px solid var(--ds-form-field-border-default);
        &:hover {
          border: 1px solid var(--ds-form-field-border-hover);
        }
      `};

    ${(props) =>
      props.opened &&
      !props.error &&
      css`
        background-color: var(--ds-form-field-bg-focus);
        ${getFocusStyles(props)};
      `}
    ${(props) =>
      Boolean(props.error) &&
      css`
        background-color: var(--ds-form-field-bg-validated);
        ${getErrorStyles(props)}
      `};

    ${(props) =>
      Boolean(props.disabled) &&
      css`
        ${IconWrapper} {
          opacity: var(--ds-opacity-disabled);
        }
      `};
  }
`;

export const ChangeButtonWrapper = styled.div`
  margin: 0 4px 0 8px;
`;

export const ValueText = styled.span<{ isObjectDeleted?: boolean }>`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  ${(props) =>
    props.isObjectDeleted &&
    css`
      color: var(--ds-color-text-danger-default);
    `}
`;
