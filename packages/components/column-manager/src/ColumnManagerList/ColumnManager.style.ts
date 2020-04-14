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
  }

  .sortable-list-ghost-element {
    background-color: ${(props): string => props.theme.palette['blue-050']};
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
