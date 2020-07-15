import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const CollapseContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const CollapseHeader = styled.div<{ iconHandle: boolean }>`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  ${(props): FlattenSimpleInterpolation | false =>
    !props.iconHandle &&
    css`
      cursor: pointer;
    `}
  color: ${(props): string =>
    props.theme.isDarkTheme ? props.theme.variable('@component-background') : props.theme.variable('@gray-color')};
  user-select: none;
  .ds-icon {
    fill: ${(props): string => props.theme.variable('@gray-color-lighter-1')};
  }
`;

export const IconWrapper = styled.div<{ iconHandle: boolean }>`
  margin-left: 10px;
  ${(props): FlattenSimpleInterpolation | false =>
    !!props.iconHandle &&
    css`
      cursor: pointer;
    `}
`;

export const CollapseContent = styled.div`
  display: flex;
  flex-flow: column;
  padding-top: 16px;
`;
