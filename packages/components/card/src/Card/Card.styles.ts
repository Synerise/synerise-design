import styled, { css } from 'styled-components';

export const Container = styled.div<{
  raised?: boolean;
  disabled?: boolean;
  lively?: boolean;
}>`
  background: #fff;
  box-shadow: ${(props): string => props.theme.variable('@box-shadow-base')};
  border-radius: ${(props): string => props.theme.variable('@border-radius-base')};
  padding: 24px;
  display: flex;
  flex-flow: column;
  transition: 0.3s ease;
  width: 100%;

  ${(props): string =>
    props.raised &&
    css`
      box-shadow: ${props.theme.variable('@box-shadow-active')};
    `}

  ${(props): string =>
    props.disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `};

  ${(props): string =>
    props.lively &&
    css`
      &:hover {
        box-shadow: ${props.theme.variable('@box-shadow-active')};
      }
    `}
`;

export const Header = styled.div<{ isContentful?: boolean }>`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;

  ${(props): string =>
    props.isContentful &&
    css`
      margin: 0 0 24px;
    `};
`;

export const HeaderSideChildren = styled.div``;

export const Title = styled.h4`
  font-size: 16px;
  color: ${(props): string => props.theme.variable('@gray-color')};
  margin: 0 0 8px;
  font-weight: 500;
`;

export const Description = styled.p`
  margin: 0;
  color: ${(props): string => props.theme.palette['grey-600']};
  font-size: 13px;
`;

export const HeaderContent = styled.div<{ compact?: boolean }>`
  width: 100%;

  ${(props): string =>
    props.compact &&
    css`
      display: flex;
      align-items: flex-start;
      flex-direction: row;

      ${Title} {
        height: 32px;
        line-height: 32px;
        margin: 0;
      }

      ${Description} {
        border-left: 1px solid ${props.theme.palette['grey-200']};
        height: 32px;
        line-height: 32px;
        padding: 0 0 0 24px;
        margin: 0 0 0 24px;
      }
    `}
`;

export const IconContainer = styled.div`
  width: 48px;
`;
