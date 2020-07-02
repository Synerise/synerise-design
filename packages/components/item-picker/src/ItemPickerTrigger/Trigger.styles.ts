import styled, { css, FlattenInterpolation } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

export const ClearWrapper = styled.div`
  position: relative;
  display: flex;
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 8px;
`;

export const Prefix = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

export const Placeholder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  margin-right: 32px;
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
  margin-right: 32px;
  color: ${(props): string => props.theme.palette['grey-700']};
  ${Prefix} {
    svg {
      fill: ${(props): string => props.theme.palette['grey-600']};
      color: ${(props): string => props.theme.palette['grey-600']};
    }
  }
`;

export const SmallTrigger = styled.div`
  width: 100%;
  border-radius: 3px;
  height: 32px;
  display: flex;
  position: relative;
  transition: all 0.3s ease;
  padding: 0 8px;
  box-shadow: 0 0 0 1px ${(props): string => props.theme.palette['grey-300']};
`;

export const TriggerWrapper = styled.div<{ opened: boolean; disabled?: boolean; error?: boolean }>`
  min-width: 282px;
  display: flex;
  cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${(props): string => (props.disabled ? 'none' : 'all')};
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  background-color: ${(props): string => {
    if (props.disabled) return props.theme.palette['grey-050'];
    if (props.error) return props.theme.palette['red-050'];
    return props.theme.palette.white;
  }};

  &:hover {
    ${SmallTrigger} {
      box-shadow: 0 0 0 1px ${(props): string => props.theme.palette['grey-400']};
    }
  }

  &:focus {
    ${SmallTrigger} {
      box-shadow: 0 0 0 2px ${(props): string => props.theme.palette['blue-600']};
      background-color: ${(props): string => props.theme.palette['blue-050']};
    }
  }

  && {
    ${(props): FlattenInterpolation<ThemeProps> | false =>
      props.opened &&
      !props.error &&
      css`
        ${SmallTrigger} {
          box-shadow: 0 0 0 2px ${props.theme.palette['blue-600']};
          background-color: ${props.theme.palette['blue-050']};
        }
      `};

    ${(props): FlattenInterpolation<ThemeProps> | false =>
      Boolean(props.error) &&
      css`
        ${SmallTrigger} {
          box-shadow: 0 0 0 2px ${props.theme.palette['red-600']};
          background-color: ${props.theme.palette['red-050']};
        }
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
