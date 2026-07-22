import styled from 'styled-components';

export const TabsWrapper = styled.div`
  width: 100%;
  padding: 0 0 8px 0;
`;
export const ContentPlaceholder = styled.div`
  height: 100px;
`;

export const ItemsList = styled.div<{ contentHeight?: number }>`
  width: 100%;
  ${(props) =>
    props.contentHeight !== undefined && `height: ${props.contentHeight}px;`}
`;

export const SearchResult = styled.span`
  font-weight: 400;
  color: var(--ds-color-text-neutral-default);
`;

export const SearchResultHighlight = styled.span`
  font-weight: 500;
  color: var(--ds-color-text-base-subtle);
`;

export const Title = styled.div`
  font-size: 10px;
  line-height: 1.6;
  font-weight: 500;
  text-transform: uppercase;
  /* Uppercase group/section header. list-item module has no section-title token
     (only content.description.color = grey-600) → semantic grey-500 (exact). DS follow-up: add list-item group-title token. */
  color: var(--ds-color-text-neutral-default);
  padding: 8px 12px;
`;

export const Value = styled.span`
  max-width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
`;
