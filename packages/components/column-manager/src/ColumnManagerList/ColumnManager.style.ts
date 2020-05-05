import styled from 'styled-components';

export const ColumnManagerList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  & > .sortable-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .sortable-chosen {
    cursor: grabbing;
    background-color: ${(props): string => props.theme.palette.white};
    opacity: 1;
  }

  .sortable-drag {
    opacity: 1 !important;
    box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.1);
  }

  .sortable-list-ghost-element {
    background-color: ${(props): string => props.theme.palette['blue-050']};
    &:hover {
      background-color: ${(props): string => props.theme.palette['blue-050']};
    }
    opacity: 1;
    cursor: grabbing;
    * {
      visibility: hidden;
    }
  }
`;

export const ListHeadline = styled.span`
  display: flex;
  width: 100%;
  font-size: 14px;
  line-height: 1.42;
  font-weight: 500;
  padding: 24px 24px 12px;
  border-bottom: 1px solid ${(props): string => props.theme.palette['grey-200']};
  color: ${(props): string => props.theme.palette['grey-800']};
`;
