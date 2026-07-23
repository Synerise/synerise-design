import styled from 'styled-components';

export const Highlight = styled.div`
  .hljs {
    color: var(--ds-code-snippet-syntax-base);
  }

  .hljs-attr,
  .hljs-template-tag {
    color: var(--ds-code-snippet-syntax-keyword);
  }

  .hljs-comment,
  .hljs-doctag,
  .hljs-quote {
    color: var(--ds-code-snippet-syntax-comment);
  }

  .hljs-params {
    color: var(--ds-code-snippet-syntax-params);
  }

  .hljs-regexp {
    color: var(--ds-code-snippet-syntax-regexp);
  }

  .hljs-tag,
  .hljs-selector-id,
  .hljs-number,
  .hljs-literal {
    color: var(--ds-code-snippet-syntax-literal);
  }

  .hljs-meta,
  .hljs-meta .hljs-keyword {
    color: var(--ds-code-snippet-syntax-keyword);
  }

  /* opt-out */
  .hljs-operator,
  .hljs-punctuation {
  }

  .hljs-selector-class,
  .hljs-code,
  .hljs-formula,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-selector-attr,
  .hljs-selector-pseudo,
  .hljs-link,
  .hljs-keyword {
    color: var(--ds-code-snippet-syntax-keyword);
  }

  .hljs-built_in,
  .hljs-title,
  .hljs-deletion {
    color: var(--ds-code-snippet-syntax-builtin);
  }

  .hljs-type,
  .hljs-section,
  .hljs-function,
  .hljs-name,
  .hljs-property,
  .hljs-attribute {
    color: var(--ds-code-snippet-syntax-type);
  }

  .hljs-meta .hljs-string,
  .hljs-string,
  .hljs-subst,
  .hljs-symbol,
  .hljs-bullet,
  .hljs-addition {
    color: var(--ds-code-snippet-syntax-string);
  }

  .hljs-selector-tag {
    color: var(--ds-code-snippet-syntax-selectortag);
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }
`;
