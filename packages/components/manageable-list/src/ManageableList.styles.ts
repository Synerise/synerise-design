import styled from 'styled-components';
import { ListType } from './ManageableList';

type ManageableListProps = {
  listType: ListType;
  greyBackground: boolean;
};

export const ManageableListContainer = styled.div<ManageableListProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: ${({ listType }): string => (listType === ListType.content ? '24px' : '12px')};
  background-color: ${({ theme, greyBackground }): string =>
    greyBackground ? theme.palette['grey-050'] : theme.palette.white};
  & > div {
    width: 100%;
    padding: 0;
  }
  .ant-list {
    width: 100%;
    padding: 0;
  }
`;

export const ShowMoreButton = styled.div`
  background: transparent;
  outline: 0;
  cursor: pointer;
  && {
    padding: 16px 12px;
    margin: 0;
  }
  strong {
    font-weight: 500;
  }
`;
