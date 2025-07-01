import styled from 'styled-components';

export const PageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  background-color: rgb(243, 245, 246);
  overflow: hidden;
`;

export const ContentWrapper = styled.div<{ withNavBar: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  position: absolute;
  top: ${(props): string => (props.withNavBar ? '56px' : '0')};
  height: ${(props): string =>
    props.withNavBar ? 'calc(100% - 56px)' : '100%'};
`;

export const MenuWrapper = styled.div<{ withAppMenu: boolean }>`
  width: ${(props): string => (props.withAppMenu ? '64px' : '0')};
  position: relative;
  z-index: 1200;
  height: 100%;
`;

export const LayoutWrapper = styled.div<{ withAppMenu: boolean }>`
  width: ${(props): string =>
    props.withAppMenu ? 'calc(100% - 64px)' : '100%'};
  display: flex;
  flex-direction: column;
  height: 100%;
`;
