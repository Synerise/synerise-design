import styled from 'styled-components';

export const ItemMetaCreated = styled.span`
  color: var(--ds-color-text-neutral-default);
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
