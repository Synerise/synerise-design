import styled from 'styled-components';

export const AddItemLayout = styled.div`
  display: inline;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  margin-bottom: 8px;
  padding: 4px 12px;
  && {
    .ant-btn {
      padding: 0 9px;
    }
  }
  .ant-btn {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 36px;
    margin-left: -4px;
  }
`;

export const AddItemLabel = styled.span`
  margin-left: 12px;
`;
