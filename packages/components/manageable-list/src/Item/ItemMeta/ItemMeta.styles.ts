import styled from 'styled-components';

export const ItemMetaCreated = styled.span`
  color: ${(props): string => props.theme.palette['grey-500']};
  font-size: 13px;
  line-height: 18px;
`;

export const ItemMeta = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding-left: 16px;
  .ds-avatar {
    margin-left: 12px;
  }
`;
