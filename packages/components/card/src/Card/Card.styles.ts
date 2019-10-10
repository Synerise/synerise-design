import styled, { css } from 'styled-components';
import Typography from '@synerise/ds-typography';

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
  align-items: flex-start;

  ${(props): string =>
    props.isContentful &&
    css`
      margin: 0 0 24px;
    `};
`;

export const HeaderSideChildren = styled.div`
  padding-left: 24px;
`;

export const Title = styled<{ fat: boolean }>(Typography.Title)`
  && {
    height: ${(props): string => (props.fat ? '32px' : '20px')};
    line-height: ${(props): string => (props.fat ? '32px' : '20px')};
    margin: 0;
  }
`;

export const Description = styled(Typography.Paragraph)`
  && {
    margin: 6px 0 0;
  }
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
