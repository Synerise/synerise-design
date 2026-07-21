import styled from 'styled-components';

export const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const Label = styled.span`
  line-height: 1;
  /* ⚑ Shift: label grey-600 → --ds-badge-variant-neutral-text (grey-500; per review). */
  color: var(--ds-badge-variant-neutral-text);
`;
