import styled from 'styled-components';

export const PlaceholderContainer = styled.div`
  width: 100%;
  min-height: 63px;
  margin: auto;
  border-radius: 3px;
  background-color: var(--ds-color-background-base-default);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  span.ds-text {
    display: block;
    font-size: 13px;
    margin: 6px 0 5px 11px;
    color: var(--ds-color-text-base-muted);
  }
`;
