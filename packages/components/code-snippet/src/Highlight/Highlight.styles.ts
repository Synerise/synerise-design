import styled from 'styled-components';

export const Highlight = styled.div`
  .hljs {
    color: ${(props): string => props.theme.palette['grey-700']};
  }

  .hljs-attr,
  .hljs-template-tag {
    color: ${(props): string => props.theme.palette['blue-600']};
  }

  .hljs-comment,
  .hljs-doctag,
  .hljs-quote {
    color: ${(props): string => props.theme.palette['cyan-600']};
  }

  .hljs-params {
    color: ${(props): string => props.theme.palette['grey-600']};
  }

  .hljs-regexp {
    color: ${(props): string => props.theme.palette['violet-600']};
  }

  .hljs-tag,
  .hljs-selector-id,
  .hljs-number,
  .hljs-literal {
    color: ${(props): string => props.theme.palette['red-600']};
  }

  .hljs-meta,
  .hljs-meta .hljs-keyword {
    color: ${(props): string => props.theme.palette['blue-600']};
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
    color: ${(props): string => props.theme.palette['blue-600']};
  }

  .hljs-built_in,
  .hljs-title,
  .hljs-deletion {
    color: ${(props): string => props.theme.palette['orange-600']};
  }

  .hljs-type,
  .hljs-section,
  .hljs-function,
  .hljs-name,
  .hljs-property,
  .hljs-attribute {
    color: ${(props): string => props.theme.palette['yellow-600']};
  }

  .hljs-meta .hljs-string,
  .hljs-string,
  .hljs-subst,
  .hljs-symbol,
  .hljs-bullet,
  .hljs-addition {
    color: ${(props): string => props.theme.palette['green-600']};
  }

  .hljs-selector-tag {
    color: ${(props): string => props.theme.palette['purple-600']};
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }
`;
