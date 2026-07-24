import styled from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';

export const RendererWrapper = styled.div`
  font-size: 13px;
  line-height: 1.6;
  color: ${(props: ThemeProps) => props.theme.palette['grey-800']};

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
    color: ${(props: ThemeProps) => props.theme.palette['blue-600']};
    text-decoration: underline;
    cursor: pointer;
  }

  code {
    background: ${(props: ThemeProps) => props.theme.palette['grey-100']};
    padding: 2px 4px;
    border-radius: 3px;
    font-family:
      'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    font-size: 12px;
  }

  pre {
    background: ${(props: ThemeProps) => props.theme.palette['grey-100']};
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
    background: ${(props: ThemeProps) => props.theme.palette['grey-050']};
    padding: 6px 12px;
    margin: 0 0 4px;

    code {
      white-space: pre;
      overflow-x: auto;
    }
  }

  blockquote {
    border-left: 3px solid
      ${(props: ThemeProps) => props.theme.palette['grey-300']};
    padding-left: 12px;
    margin: 0 0 4px;
    color: ${(props: ThemeProps) => props.theme.palette['grey-500']};
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 0 0 4px;
    table-layout: fixed;

    td,
    th {
      border: 1px solid
        ${(props: ThemeProps) => props.theme.palette['grey-300']};
      padding: 6px 10px;
      vertical-align: top;
      text-align: left;

      > * {
        margin: 0;
      }
    }

    th {
      background: ${(props: ThemeProps) => props.theme.palette['grey-050']};
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
