import styled from 'styled-components';

export const RendererWrapper = styled.div`
  font-size: 13px;
  line-height: 1.6;
  color: var(--ds-color-text-base-default);

  > * + * {
    margin-top: 0.5em;
  }

  h1 {
    font-size: 24px;
    font-weight: 500;
    line-height: 1.3;
    margin: 0 0 0.5em;
  }

  h2 {
    font-size: 20px;
    font-weight: 500;
    line-height: 1.3;
    margin: 0 0 0.5em;
  }

  h3 {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.3;
    margin: 0 0 0.5em;
  }

  p {
    margin: 0 0 4px;
  }

  ul,
  ol {
    padding-left: 24px;
    margin: 0 0 4px;
  }

  li {
    margin: 2px 0;
  }

  a {
    color: var(--ds-color-text-brand-default);
    text-decoration: underline;
    cursor: pointer;
  }

  code {
    background: var(--ds-color-background-base-muted);
    padding: 2px 4px;
    border-radius: 3px;
    font-family:
      'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    font-size: 12px;
  }

  pre {
    background: var(--ds-color-background-base-muted);
    padding: 12px;
    border-radius: 3px;
    overflow-x: auto;

    code {
      background: none;
      padding: 0;
      border-radius: 0;
      font-size: 12px;
    }
  }

  pre[data-type='code-snippet'] {
    display: flex;
    align-items: center;
    background: var(--ds-color-background-base-subtle);
    padding: 6px 12px;
    margin: 0 0 4px;

    code {
      white-space: pre;
      overflow-x: auto;
    }
  }

  blockquote {
    border-left: 3px solid var(--ds-color-border-base-strong);
    padding-left: 12px;
    margin: 0 0 4px;
    color: var(--ds-color-text-neutral-default);
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 0 0 4px;
    table-layout: fixed;

    td,
    th {
      border: 1px solid var(--ds-color-border-base-strong);
      padding: 6px 10px;
      vertical-align: top;
      text-align: left;

      > * {
        margin: 0;
      }
    }

    th {
      background: var(--ds-color-background-base-subtle);
      font-weight: 500;
    }
  }

  s {
    text-decoration: line-through;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 3px;
    display: block;
    margin: 8px 0;
  }
`;
