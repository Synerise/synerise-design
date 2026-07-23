import styled from 'styled-components';

export const InlineCodeWrapper = styled.code`
  & {
    font-size: 12px;
    font-family: 'IBM Plex Mono Regular', monospace;
    display: inline-block;
    padding: 0 4px;
    margin-right: 4px;
    border-radius: 3px;
    /* ⚑ Shift: inline-code text #e31a5d → --ds-code-snippet-inlinecode-text (pink-600 #ff2f52). */
    color: var(--ds-code-snippet-inlinecode-text);
    background-color: var(--ds-code-snippet-inlinecode-bg);
  }
`;
