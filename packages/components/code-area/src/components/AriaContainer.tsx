import React, { useEffect, useRef } from 'react';

export const AriaContainer = ({ element }: { element: HTMLElement }) => {
  const ariaContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = ariaContainerRef.current;
    if (container && element.childNodes.length > 0) {
      container.appendChild(element);
    }
  }, [element]);

  return <div className="monaco-aria-custom-container" data-testid="monaco-aria-container" ref={ariaContainerRef} />;
};
