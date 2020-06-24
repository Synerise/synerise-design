import styled from 'styled-components';
import { AntdInputNumber } from '@synerise/ds-input-number/dist/InputNumber.styles';

export const RangesForm = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
`;

export const InputNumberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  align-self: flex-start;
  height: 32px;
  padding: 4px 0;
`;

export const RangeRow = styled.div<{ first: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 24px;
  grid-column-gap: 8px;
  margin-bottom: 16px;
  ${IconWrapper} {
    maring-top: ${(props): string => (props.first ? '25px' : '0px')};
  }
`;

export const RangeRowInputs = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 24px;
  ${AntdInputNumber} {
    width: 100%;
  }
`;
