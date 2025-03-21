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
  padding: ${({ listType }): string => (listType === ListType.CONTENT ? '24px' : '0')};

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
  .sortable-chosen {
    cursor: grabbing;
    background-color: ${(props): string => props.theme.palette.white};
    opacity: 1;
  }
  .sorting-started {
    user-select: none;
  }
  .sortable-drag {
    opacity: 1 !important;
    box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.1);
  }
  .sortable-list-ghost-element {
    box-shadow: none;
    background-color: ${(props): string => props.theme.palette['blue-050']};
    &:hover {
      box-shadow: none;
      background-color: ${(props): string => props.theme.palette['blue-050']};
    }
    border: dashed 1px ${(props): string => props.theme.palette['blue-300']};

    opacity: 1;
    cursor: grabbing;
    * {
      visibility: hidden;
    }
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
