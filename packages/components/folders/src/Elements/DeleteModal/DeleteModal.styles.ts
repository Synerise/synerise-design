import styled from 'styled-components';

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const DeleteMessage = styled.div`
  line-height: 1.38;
  strong {
    display: block;
    font-weight: 500;
    margin-bottom: 4px;
    color: ${(props): string => props.theme.palette['grey-700']};
  }
  span {
    color: ${(props): string => props.theme.palette['grey-600']};
  }
`;
export const ModePicker = styled.div`
  margin: 30px 12px 0 12px;
  .ant-radio-group {
    width: 100%;
  }
`;
export const SelectWrapper = styled.div`
  margin: 15px 0;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
