import React, { useEffect, useRef } from 'react';

import * as S from '../CodeArea.styles';

export const AriaContainer = ({ element }: { element: HTMLElement }) => {
  const ariaContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = ariaContainerRef.current;
    if (container && element.childNodes.length > 0) {
      container.appendChild(element);
    }
  }, [element]);

  return (
    <S.AriaContainer
      className="monaco-aria-custom-container"
      data-testid="monaco-aria-container"
      ref={ariaContainerRef}
    />
  );
};
