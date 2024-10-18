import React, { useCallback, useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import * as S from './Highlight.styles';
import { HighlightProps } from './Highlight.types';

const Highlight = ({ languages, style, children }: HighlightProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const manageHighlight = useCallback(() => {
    if (elementRef.current) {
      const elements = elementRef.current.querySelectorAll('pre code');
      languages.forEach(language => {
        // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
        hljs.registerLanguage(language, require(`highlight.js/lib/languages/${language}`));
      });
      elements.forEach(element => {
        hljs.highlightElement(element as HTMLElement);
      });
    }
  }, [languages]);

  useEffect(() => {
    manageHighlight();
  }, [manageHighlight]);

  return (
    <S.Highlight ref={elementRef} style={style}>
      {children}
    </S.Highlight>
  );
};
export default Highlight;
