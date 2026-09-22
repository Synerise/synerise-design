import styled from 'styled-components';

export const Text = styled.span<{ $muted?: boolean }>`
  flex: 0 0 auto;
  align-self: center;
  white-space: nowrap;
  font-size: 13px;
  line-height: 1.85;
  color: ${({ theme, $muted }) =>
    theme.palette[$muted ? 'grey-500' : 'grey-800']};
`;
