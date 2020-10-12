import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.div`
  padding: 24px 24px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 68px;
`;

export const Body = styled.div`
  padding: 12px 24px;
  min-height: 500px;
  .ds-button-group {
    position: relative;
    z-index: 2;
  }
`;
export const MainComponentWrapper = styled.div``;
export const FooterSeparator = styled.div`
  display: flex;
  flex: 1;
`;
export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 24px;
  background-color: ${(props): string => props.theme.palette['grey-050']};

  > *:not(:last-child) {
    margin-right: 16px;
  }
`;

export const Title = styled.div`
  font-size: 16px;
  line-height: 1.39;
  font-weight: 500;
  color: ${(props): string => props.theme.palette['grey-800']};
`;

export const WeeklyFilterContainer = styled.div`
  margin-top: 24px;
`;
