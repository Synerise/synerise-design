import styled from 'styled-components';
import { Text } from '@synerise/ds-typography';

export const HeaderWrapper = styled.div`
  padding-top: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ObjectWithAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
export const ObjectWithTag = styled.div`
  display: flex;
  gap: 12px;
  align-items: center; 
`

export const ObjectLabel = styled(Text)`
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
`