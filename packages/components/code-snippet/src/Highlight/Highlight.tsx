import * as React from 'react';
// import hljs from 'highlight.js/lib/core';
// import hljs from 'highlight.js/lib';
import hljs from 'highlight.js';
import * as S from './Highlight.styles';
import { HighlightProps } from './Highlight.types';

// import javascript from 'highlight.js/lib/languages/javascript.js'
// import java from 'highlight.js/lib/languages/java'
// import python from 'highlight.js/lib/languages/python'
// import typescript from 'highlight.js/lib/languages/typescript'
// import json from 'highlight.js/lib/languages/json'

// const langs = {
  // javascript,
  // java,
  // python,
  // typescript,
  // json,
// }
// hljs.registerLanguage(language, require(`highlight.js/lib/languages/${language}`));
// hljs.registerLanguage(language, langs[language]);

const Highlight: React.FC<HighlightProps> = ({ languages, style, children }: /* FIXME */ any) => {
  const elementRef = React.useRef<HTMLDivElement>(null);

  const manageHighlight = React.useCallback(() => {
    if (elementRef.current) {
      const elements = elementRef.current.querySelectorAll('pre code');
      // if (0) languages.forEach(language => {
        // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
        // hljs.registerLanguage(language, require(`highlight.js/lib/languages/${language}`));
        // should allow static linking of languages (there's some problem with dynamic linking in webpack5)
        // hljs.registerLanguage(language, langs[language]); // not needed, index.js in highlight.js is already doing this
      // });
      elements.forEach(element => {
        hljs.highlightElement(element as HTMLElement);
      });
    }
  }, [languages]);

  React.useEffect(() => {
    manageHighlight();
  }, [manageHighlight]);

  return (
    <S.Highlight ref={elementRef} style={style}>
      {children}
    </S.Highlight>
  );
};
export default Highlight;
