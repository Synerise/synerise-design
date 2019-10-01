import styled, { css } from 'styled-components';

export const Container = styled.div<{
  raised?: boolean;
  disabled?: boolean;
  lively?: boolean;
}>`
  background: #fff;
  box-shadow: ${props => props.theme.variable('@box-shadow-base')};
  border-radius: ${props => props.theme.variable('@border-radius-base')};
  padding: 24px;
  display: flex;
  flex-flow: column;
  transition: 0.3s ease;
  width: 100%;

  ${props =>
    props.raised &&
    css`
      box-shadow: ${props.theme.variable('@box-shadow-active')};
    `}

  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
    `};

  ${props =>
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

  ${props =>
    props.isContentful &&
    css`
      margin: 0 0 24px;
    `};
`;

export const HeaderContent = styled.div`
  width: 100%;
`;

export const HeaderSideChildren = styled.div``;

export const Title = styled.h4`
  font-size: 16px;
  color: ${props => props.theme.variable('@gray-color')};
  margin: 0 0 8px;
  font-weight: 500;
`;

export const Description = styled.p`
  margin: 0;
  color: ${props => props.theme.palette['grey-600']};
  font-size: 13px;
`;

export const IconContainer = styled.div`
  width: 48px;
`;
