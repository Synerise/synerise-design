import styled from 'styled-components';

export const Wrapper = styled.li`
  color: ${(props): string => {
    if (props.danger) return props.theme.palette['red-600'];

    if (props.disabled) return props.theme.palette['grey-600'];

    return props.theme.palette['grey-700'];
  }};
  opacity: ${(props): string => (props.disabled ? '0.4' : '1')};
  cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'pointer')};
  font-weight: 500;
  border-radius: 3px;
  padding: 4px 12px 4px 8px;
  display: flex;
  align-items: center;

  &:hover {
    ${(props): string =>
      !props.disabled &&
      `
      color: ${props.danger ? props.theme.palette['red-600'] : props.theme.palette['blue-600']};
      background: ${props.danger ? props.theme.palette['red-050'] : props.theme.palette['grey-050']};
    `}
  }

  &:focus {
    box-shadow: inset 0 0 0 2px ${(props): string => props.theme.palette['blue-600']};
  }
`;

export const IconWrapper = styled.div`
  margin-right: 12px;
`;

export const Actions = styled.div`
  flex-grow: 1;
`;
