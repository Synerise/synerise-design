import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { getPopupContainer as defaultGetPopupContainer } from '@synerise/ds-utils';

import { CodeAreaProps } from './CodeArea.types';
import { CodeAreaEditor } from './components';

const CodeArea = ({
  getPopupContainer = defaultGetPopupContainer,
  onFullscreenChange,
  ...codeAreaProps
}: CodeAreaProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    setIsFullscreen(prevState => !prevState);
    onFullscreenChange && onFullscreenChange(isFullscreen);
  };

  return (
    <>
      <CodeAreaEditor {...codeAreaProps} toggleFullscreen={toggleFullscreen} isFullscreen={false} />
      <div ref={wrapperRef}>
        {wrapperRef.current &&
          isFullscreen &&
          createPortal(
            <CodeAreaEditor {...codeAreaProps} toggleFullscreen={toggleFullscreen} isFullscreen={isFullscreen} />,
            getPopupContainer(wrapperRef.current)
          )}
      </div>
    </>
  );
};

export default CodeArea;
