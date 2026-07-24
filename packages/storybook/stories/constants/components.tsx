import styled from 'styled-components';

export const Placeholder = styled.div<{
  $height?: number;
  $background?: string;
  $foreground?: string;
}>`
  --bg: ${(props) =>
    props.$background || 'var(--ds-color-background-base-default)'};
  --stripe: ${(props) =>
    props.$foreground || 'var(--ds-color-background-base-muted)'};
  --size: 16px;
  height: ${(props) => props.$height || 400}px;
  flex: 1 1 auto;
  background:
    repeating-linear-gradient(
      135deg,
      var(--stripe) 0 var(--size),
      transparent var(--size) calc(var(--size) * 2)
    ),
    var(--bg);
`;

export const PropNamePill = styled.span`
  background: var(--ds-color-background-base-muted);
  padding: 3px 7px;
  border-radius: 3px;
  font-family: monospace;
  color: var(--ds-color-text-base-subtle);
`;
