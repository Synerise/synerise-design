import styled from 'styled-components';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';
import { macro } from '@synerise/ds-typography';
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
  .ant-list {
    width: 100%;
    padding: 0;
  }
`;

export const ShowMoreButton = styled.div`
  background: transparent;
  outline: 0;
  cursor: pointer;
  margin: 16px 12px;
  strong {
    font-weight: 500;
  }
`;

export const AddContentButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  .ant-btn {
    ${macro.h200};
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: transparent;
    color: ${({ theme }): string => theme.palette['grey-500']};
    svg {
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      color: ${({ theme }): string => theme.palette['grey-500']};
      fill: ${({ theme }): string => theme.palette['grey-500']};
    }
    ${IconContainer} {
      margin-right: 12px;
    }

    &:hover {
      color: ${({ theme }): string => theme.palette['grey-600']};
      border-color: ${({ theme }): string => theme.palette['grey-400']};
      background-color: transparent;
      svg {
        color: ${({ theme }): string => theme.palette['grey-600']};
        fill: ${({ theme }): string => theme.palette['grey-600']};
      }
    }
    &:focus {
      background-color: transparent;
      box-shadow: none;
      color: ${({ theme }): string => theme.palette['grey-500']};
      border-color: ${({ theme }): string => theme.palette['blue-600']};
    }

    &:disabled {
      border-color: ${({ theme }): string => theme.palette['grey-300']};
      opacity: 0.4;
      background-color: transparent;
      color: ${({ theme }): string => theme.palette['grey-500']};
      svg {
        color: ${({ theme }): string => theme.palette['grey-500']};
        fill: ${({ theme }): string => theme.palette['grey-500']};
      }
      &:hover {
        background-color: transparent;
      }
    }
  }
`;
