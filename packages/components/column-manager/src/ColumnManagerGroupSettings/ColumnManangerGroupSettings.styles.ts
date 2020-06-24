import styled from 'styled-components';
import { AntdSelect } from '@synerise/ds-select/dist/Select.styles';
import { AntdAlert } from '@synerise/ds-alert/dist/Alert.styles';

export const Title = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const IconWrapper = styled.span``;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 250px;

  ${AntdAlert} {
    margin-bottom: 20px;
  }

  ${AntdSelect} {
    width: 100%;
    margin-bottom: 26px;
  }
`;

export const IntervalInput = styled.div`
  width: 100%;
  .ant-input-number {
    width: 100%;
  }
`;
