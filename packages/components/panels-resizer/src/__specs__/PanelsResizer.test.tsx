import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen } from '@testing-library/react';

import { PanelsResizer } from '../PanelsResizer';

describe('PanelsResizer Component', () => {
  const LeftPanel = () => (
    <div data-testid="left-panel">Left Panel Content</div>
  );
  const RightPanel = () => (
    <div data-testid="right-panel">Right Panel Content</div>
  );

  const setup = (props = {}) => {
    return renderWithProvider(
      <div style={{ width: '1000px', height: '800px' }}>
        <PanelsResizer
          leftPanel={<LeftPanel />}
          rightPanel={<RightPanel />}
          {...props}
        />
      </div>,
    );
  };

  it('should render both panels', () => {
    setup();
    expect(screen.getByTestId('left-panel')).toBeInTheDocument();
    expect(screen.getByTestId('right-panel')).toBeInTheDocument();
  });

  it('should initialize with correct panel widths', () => {
    setup({ initial: { leftPanel: 600 } });
    const leftPanelWrapper = screen.getByTestId('left-panel-wrapper');
    const rightPanelWrapper = screen.getByTestId('right-panel-wrapper');

    expect(leftPanelWrapper).toHaveStyle('width: calc(50% + 600px)');
    expect(rightPanelWrapper).toHaveStyle('width: calc(50% - 600px)');
  });

  it('should adjust panel widths when resizing', () => {
    setup();
    const resizer = screen.getByTestId('resizer-handler');
    const panelsContainer = screen.getByTestId('panels-resizer-container');

    fireEvent.mouseDown(resizer, { clientX: 500 });

    fireEvent.mouseMove(panelsContainer, { clientX: 550 });

    const leftPanelWrapper = screen.getByTestId('left-panel-wrapper');
    const rightPanelWrapper = screen.getByTestId('right-panel-wrapper');

    expect(leftPanelWrapper).toHaveStyle('width: calc(50% + 50px)');
    expect(rightPanelWrapper).toHaveStyle('width: calc(50% - 50px)');

    fireEvent.mouseUp(panelsContainer);
  });

  it('should not resize panels when not dragging', () => {
    setup();
    const panelsContainer = screen.getByTestId('panels-resizer-container');

    fireEvent.mouseMove(panelsContainer, { clientX: 550 });

    const leftPanelWrapper = screen.getByTestId('left-panel-wrapper');
    const rightPanelWrapper = screen.getByTestId('right-panel-wrapper');

    expect(leftPanelWrapper).toHaveStyle('width: calc(50% + 0px)');
    expect(rightPanelWrapper).toHaveStyle('width: calc(50% - 0px)');
  });
});
