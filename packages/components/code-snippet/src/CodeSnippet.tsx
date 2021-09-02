import * as React from 'react';

import InlineCode from './CodeTypes/InlineCode/InlineCode';
import SingleCode from './CodeTypes/SingleCode/SingleCode';
import MultiCode from './CodeTypes/MultiCode/MultiCode';
import { CodeSnippetProps, CodeSnippetType, FontSize } from './CodeSnippet.types';

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  type = CodeSnippetType.INLINE,
  languages = ['javascript', 'typescript', 'json'],
  children = '',
  colorSyntax = false,
  fontSize = FontSize.SMALL,
  tooltipTitleHover = 'Copy',
  tooltipTitleClick = 'Copied!',
  labelBeforeExpanded,
  labelAfterExpanded,
  wrap = false,
  rows = 6,
}) => {
  switch (type) {
    case CodeSnippetType.SINGLE_LINE:
      return (
        <SingleCode
          type={type}
          fontSize={fontSize}
          tooltipTitleHover={tooltipTitleHover}
          tooltipTitleClick={tooltipTitleClick}
        >
          {children}
        </SingleCode>
      );
    case CodeSnippetType.MULTI_LINE:
      return (
        <MultiCode
          type={type}
          languages={languages}
          colorSyntax={colorSyntax}
          fontSize={fontSize}
          tooltipTitleHover={tooltipTitleHover}
          tooltipTitleClick={tooltipTitleClick}
          labelBeforeExpanded={labelBeforeExpanded}
          labelAfterExpanded={labelAfterExpanded}
          wrap={wrap}
          rows={rows}
        >
          {children}
        </MultiCode>
      );
    default:
      return <InlineCode>{children}</InlineCode>;
  }
};

export default CodeSnippet;
