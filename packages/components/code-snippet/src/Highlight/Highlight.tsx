// @ts-ignore
import hljs from 'highlight.js/lib/core';
import React, { useCallback, useEffect, useRef } from 'react';

import * as S from './Highlight.styles';
import { type HighlightProps } from './Highlight.types';

const Highlight = ({ languages, style, children }: HighlightProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const manageHighlight = useCallback(async () => {
    if (elementRef.current) {
      const elements = elementRef.current.querySelectorAll('pre code');
      await Promise.all(
        languages.map(async (language) => {
          const module = await import(`highlight.js/lib/languages/${language}`);
          return hljs.registerLanguage(language, module.default);
        }),
      );

      elements.forEach((element) => {
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
