// @flow

import styled, { css } from 'styled-components';

export const CollapseContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const CollapseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  ${props =>
  !props.iconHandle &&
  css`
      cursor: pointer;
    `}
  color: ${props =>
  props.theme.isDarkTheme ? props.theme.variable('@component-background') : props.theme.variable('@gray-color')};
  user-select: none;
  .ds-icon {
    fill: ${props => props.theme.variable('@gray-color-lighter-1')};
  }
`;

export const IconWrapper = styled.div`
  margin-left: 10px;
  ${props =>
  props.iconHandle &&
  css`
      cursor: pointer;
    `}
`;

export const CollapseContent = styled.div`
  display: flex;
  flex-flow: column;
  padding-top: 16px;
`;
