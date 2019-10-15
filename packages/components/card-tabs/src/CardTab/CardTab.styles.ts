import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';

export const CardTabContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 12px;
  width: 180px;
  background-color: #f9fafb;
  border-radius: 3px;
`;

export const CardTabPrefix = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

export const CardTabSuffix = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 24px;
`;

export const CardTabTag = styled.div`
  ${macro.h200}
  color: ${({ theme }): string => theme.palette.white};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 3px;
  background-color: ${({ theme, color }): string => theme.palette[color]}
`;

export const CardTabLabel = styled.span`
  ${macro.h300};
  color: ${({ theme }): string => theme.palette['grey-600']};
  line-height: 20px;
  font-size: 14px;
  flex: 1;
`;
