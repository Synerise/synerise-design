import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: ${(props): string =>
    props.theme.isDarkTheme ? props.theme.variable('@menu-dark-color') : props.theme.variable('@gray-color-lighter-8')};
`;

export const Text = styled.div`
  flex: 1;
  font-weight: 500;
  color: ${(props): string =>
    props.theme.isDarkTheme ? props.theme.variable('@component-background') : props.theme.variable('@gray-color')};
`;

export const Actions = styled.div`
  flex: 0;
  display: flex;
  align-items: center;
  white-space: nowrap;

  > *:not(:last-child) {
    margin-right: 16px;
  }
`;

export const LinkButton = styled.button`
  font-weight: 500;
  padding: 0;
  border: none;
  color: ${(props): string => props.theme.variable('@link-color')};
  background-color: transparent; // remove the gray background on active links in IE 10.
  outline: none;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${(props): string => props.theme.variable('@link-hover-color')};
  }

  &:active {
    color: ${(props): string => props.theme.variable('@link-active-color')};
  }

  &:active,
  &:hover {
    outline: 0;
  }

  &[disabled] {
    color: ${(props): string => props.theme.variable('@disabled-color')};
    cursor: not-allowed;
    pointer-events: none;
  }
`;
