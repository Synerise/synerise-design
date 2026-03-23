// @ts-expect-error — no type declarations
import hljs from 'highlight.js/lib/core';
// @ts-expect-error — no type declarations
import css from 'highlight.js/lib/languages/css';
// @ts-expect-error — no type declarations
import javascript from 'highlight.js/lib/languages/javascript';
// @ts-expect-error — no type declarations
import json from 'highlight.js/lib/languages/json';
// @ts-expect-error — no type declarations
import typescript from 'highlight.js/lib/languages/typescript';
// @ts-expect-error — no type declarations
import xml from 'highlight.js/lib/languages/xml';
import React, { useCallback, useEffect, useRef } from 'react';

import * as S from './Highlight.styles';
import { type HighlightProps } from './Highlight.types';

const BUNDLED_LANGUAGES: Record<string, unknown> = {
  css,
  html: xml,
  xml,
  javascript,
  json,
  typescript,
};

const registeredLanguages = new Set<string>();

function registerLanguages(languages: string[]) {
  for (const language of languages) {
    if (registeredLanguages.has(language)) {
      continue;
    }
    const definition = BUNDLED_LANGUAGES[language];
    if (definition) {
      hljs.registerLanguage(language, definition);
      registeredLanguages.add(language);
    }
  }
}

const Highlight = ({ languages, style, children }: HighlightProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const manageHighlight = useCallback(async () => {
    if (elementRef.current) {
      const elements = elementRef.current.querySelectorAll('pre code');

      registerLanguages(languages);

      const unbundled = languages.filter(
        (lang) => !registeredLanguages.has(lang),
      );
      await Promise.all(
        unbundled.map(async (language) => {
          try {
            const module = await import(
              /* @vite-ignore */ `highlight.js/lib/languages/${language}`
            );
            hljs.registerLanguage(language, module.default);
            registeredLanguages.add(language);
          } catch {
            // language not available
          }
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
