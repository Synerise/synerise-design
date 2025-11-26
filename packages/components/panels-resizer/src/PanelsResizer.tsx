import React, {
  type MouseEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import * as S from './PanelResizer.styles';
import { Resizer } from './Resizer';
import {
  type InitialVectorOptions,
  calculateLeftPanelWidth,
  calculateRightPanelWidth,
  getInitialVector,
} from './utils';

type PanelsResizerProps = {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
  initial?: InitialVectorOptions;
  scrollable?: boolean;
};

export const PanelsResizer = ({
  leftPanel,
  rightPanel,
  initial,
  scrollable,
}: PanelsResizerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [vector, setVector] = useState(0);
  const startClientXRef = useRef(0);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const initialVector = getInitialVector(initial, containerWidth);
      setVector(initialVector);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!isResizing) {
        return;
      }

      const deltaX = event.clientX - startClientXRef.current;
      setVector((prevVector) =>
        prevVector !== null ? prevVector + deltaX : deltaX,
      );
      startClientXRef.current = event.clientX;
    },
    [isResizing],
  );

  const handleMouseUpOrLeave = useCallback(() => {
    if (!isResizing) {
      return;
    }

    setIsResizing(false);
  }, [isResizing]);

  const handleMouseDownOnResizer = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsResizing(true);
      startClientXRef.current = event.clientX;
    },
    [],
  );

  return (
    <S.PanelsResizerContainer
      ref={containerRef}
      data-testid="panels-resizer-container"
      onMouseUp={handleMouseUpOrLeave}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUpOrLeave}
    >
      <div
        data-testid="left-panel-wrapper"
        style={{
          width: calculateLeftPanelWidth(vector),
          pointerEvents: isResizing ? 'none' : 'auto',
          ...(scrollable ? { overflow: 'auto' } : {}),
        }}
      >
        {leftPanel}
      </div>
      <Resizer onMouseDown={handleMouseDownOnResizer} />
      <div
        data-testid="right-panel-wrapper"
        style={{
          width: calculateRightPanelWidth(vector),
          pointerEvents: isResizing ? 'none' : 'auto',
          zIndex: 4,
          ...(scrollable ? { overflow: 'auto' } : {}),
        }}
      >
        {rightPanel}
      </div>
    </S.PanelsResizerContainer>
  );
};
