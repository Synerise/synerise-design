import styled from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

type WrapperProps = {
  disabled?: boolean;
  danger?: boolean;
};

export const Wrapper = styled.li<WrapperProps>`
  color: ${(props: WrapperProps & ThemeProps): string => {
    if (props.danger) return props.theme.palette['red-600'];

    if (props.disabled) return props.theme.palette['grey-700'];

    return props.theme.palette['grey-700'];
  }};
  opacity: ${(props): string => (props.disabled ? '0.4' : '1')};
  cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'pointer')};
  font-weight: 500;
  border-radius: 3px;
  padding: 5px 12px 4px 7px;
  display: flex;
  align-items: center;
  svg {
    ${(props): string | false =>
      !props.disabled &&
      `
      fill: ${props.danger ? props.theme.palette['red-600'] : props.theme.palette['grey-600']};
    `}
  }
  &:hover {
    ${(props): string | false =>
      !props.disabled &&
      `
      svg {
        fill: ${props.danger ? props.theme.palette['red-600'] : props.theme.palette['blue-600']};
      }
      color: ${props.danger ? props.theme.palette['red-600'] : props.theme.palette['blue-600']};
      background: ${props.danger ? props.theme.palette['red-050'] : props.theme.palette['grey-050']};
    `}
  }

  &:focus {
    box-shadow: inset 0 0 0 2px ${(props): string => props.theme.palette['blue-600']};
  }
`;

export const IconWrapper = styled.div`
  margin-right: 11px;
`;

export const Actions = styled.div`
  flex-grow: 1;
`;
