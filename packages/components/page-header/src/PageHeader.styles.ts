import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';

export const MainContainer = styled.div<{ isolated?: boolean }>`
  background-color: #fff;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    ${(props): string => (props.isolated ? `background-color: ${props.theme.palette['grey-100']}` : '')}
    z-index: 0;
  }
`;

export const PageHeaderContainer = styled.div`
  width: 100%;
  min-height: 80px;
  padding: 24px;
  display: flex;
  align-items: center;
  align-content: center;
`;

export const PageHeaderBack = styled.div`
  margin-right 52px;
  display: flex;
  align-items: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute
    width: 1px;
    height: 40px
    right: -29px;
    background-color: ${(props): string => props.theme.palette['grey-300']};
  }
`;

export const PageHeaderRightSide = styled.div`
  display: flex;
  flex: 1 auto;
  justify-content: flex-end;

  > div {
    display: flex;

    > * {
      margin-left: 8px;
    }
  }
`;

export const PageHeaderDescription = styled.div`
  margin: 0 24px;
  font-size: 13px;
  line-height: 18px;
  color: ${(props): string => props.theme.palette['grey-500']};
`;

export const PageHeaderClamp = styled.div`
  ${macro.h600};
  line-height: 26px;
  display: -webkit-box; // prefix required for line-clamp
  -webkit-line-clamp: 1; // prefix required for line-clamp
  -webkit-box-orient: vertical; // prefix required for line-clamp
  overflow: hidden;
  color: ${(props): string => props.theme.palette['grey-800']};
`;

export const PageHeaderTabsWrapper = styled.div`
  padding: 0 24px;
`;

export const PageHeaderBar = styled.div`
  padding: 12px 24px;
  border-top: 1px solid ${(props): string => props.theme.palette['grey-100']};
  position: relative;
  top: -1px;
`;

export const PageHeaderMore = styled.div`
  padding: 0 24px;
`;

export const PageHeaderInlineEdit = styled.div`
  display: flex;
  margin-left: 14px;
`;

export const PageHeaderClose = styled.div`
  & div {
  margin-left 52px;
  display: flex;
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute
    width: 1px;
    height: 40px
    left: -25px;
    background-color: ${(props): string => props.theme.palette['grey-300']};
  }}
`;
