import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  background-color: ${(props): string => props.theme.palette.white};
  border-radius: 3px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 22px 24px;
  border-bottom: 1px dotted ${(props): string => props.theme.palette['grey-300']};
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  > * {
    margin-right: 8px;
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  > * {
    margin-left: 8px;
  }
`;

export const Body = styled.div`
  padding: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Footer = styled.div`
  background-color: rgba(249, 250, 251, 0.6);
  border-top: 1px solid ${(props): string => props.theme.palette['grey-100']};
  padding: 16px 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  > * {
    margin-left: 8px;
  }
`;
