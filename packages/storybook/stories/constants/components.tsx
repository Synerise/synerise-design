import styled from 'styled-components';

export const Placeholder = styled.div<{
  $height?: number;
  $background?: string;
  $foreground?: string;
}>`
  --bg: ${(props) => props.$background || props.theme.palette.white};
  --stripe: ${(props) => props.$foreground || props.theme.palette['grey-100']};
  --size: 16px;
  height: ${(props) => props.$height || 400}px;
  background:
    repeating-linear-gradient(
      135deg,
      var(--stripe) 0 var(--size),
      transparent var(--size) calc(var(--size) * 2)
    ),
    var(--bg);
`;
