import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  background-color: ${(props): string => props.theme.palette.white};
  border-radius: 3px;
  box-shadow: 0 4px 12px 0 #2329360a;
  min-width: 594px;
`;

export const CrudsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  opacity: 0;
  visibility: hidden;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 22px 24px;
  width: 100%;
  border-bottom: 1px dotted ${(props): string => props.theme.palette['grey-300']};
  &:hover {
    ${CrudsWrapper} {
      opacity: 1;
      visibility: visible;
    }
  }
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
