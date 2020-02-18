import styled from 'styled-components';
import { ManageableListContainer } from '@synerise/ds-manageable-list/dist/ManageableList.styles';

// eslint-disable-next-line import/prefer-default-export
export const FiltersList = styled.div`
  ${ManageableListContainer} {
    padding: 0;
  }
`;

export const NoResults = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: ${(props): string => props.theme.palette['grey-600']};
  margin: 48px 0 0;

  .ant-avatar {
    margin-bottom: 16px;
  }
`;
