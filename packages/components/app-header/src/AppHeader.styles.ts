import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';

export const Container = styled.div<{ backgroundColor?: string }>`
  background-color: ${(props): string => props.theme.palette[`${props.backgroundColor}-600`]};
  height: 56px;
  width: 100%;
  padding: 12px 24px;
`;

export const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
`;

export const Main = styled.div`
  display: flex;
  align-items: center;
`;

export const Aside = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0 24px;
`;

export const Logo = styled.img`
  height: 16px;
`;

export const Seperator = styled.div`
  width: 1px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 12px;
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const Title = styled.div`
  ${macro.h300}
  color: ${(props): string => props.theme.palette.white};
`;
