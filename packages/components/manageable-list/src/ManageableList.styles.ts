import styled from 'styled-components';

import { ListType } from './ManageableList.types';

type ManageableListProps = {
  listType: string;
  greyBackground: boolean;
};

export const ManageableListContainer = styled.div<ManageableListProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: ${({ listType }): string =>
    listType === ListType.CONTENT ? '24px' : '0'};

  & > div {
    width: 100%;
    padding: 0;
  }
  .ant-list {
    width: 100%;
    padding: 0;
  }
  .ant-spin-nested-loading {
    width: 100%;
  }
`;

export const ShowMoreButton = styled.div`
  background: transparent;
  outline: 0;
  cursor: pointer;
  && {
    padding: 16px 8px;
    margin: 0;
  }
  &:hover {
    color: ${(props): string => props.theme.palette['blue-600']};
  }
  strong {
    font-weight: 500;
  }
`;
