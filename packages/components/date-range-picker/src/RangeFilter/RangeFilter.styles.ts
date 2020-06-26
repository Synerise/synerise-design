import styled, { css } from 'styled-components';


const borderStyle = css``;
export const Container = styled.div``;

export const Header = styled.div`
  padding: 24px 24px 12px;
`;

export const Body = styled.div`
  padding: 12px 24px;
  min-height: 500px;
  .ds-button-group {
    position: relative;
    z-index: 2;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: ${borderStyle};
  padding: 12px 24px;
  background-color: ${props => props.theme.variable('@gray-color-lighter-8')};

  > *:not(:last-child) {
    margin-right: 16px;
  }
`;

export const Title = styled.div`
  font-size: 18px;
  line-height: ${props => props.theme.variable('@modal-title-line-height')};
  font-weight: 500;
  color: ${props => props.theme.variable('@heading-color')};
`;
