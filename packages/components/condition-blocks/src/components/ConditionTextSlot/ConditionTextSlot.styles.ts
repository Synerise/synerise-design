import styled from 'styled-components';

export const Text = styled.span<{ $muted?: boolean }>`
  flex: 0 0 auto;
  align-self: center;
  white-space: nowrap;
  font-size: 13px;
  line-height: 1.85;
  color: ${({ $muted }) =>
    $muted
      ? 'var(--ds-color-text-neutral-default)'
      : 'var(--ds-color-text-base-default)'};
`;
