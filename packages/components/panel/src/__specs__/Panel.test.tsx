import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import Panel from '../Panel';
import { DEFAULT_PADDING, DEFAULT_RADIUS } from '../Panel.const';

describe('Panel Component', () => {
  it('should render with children', () => {
    renderWithProvider(
      <Panel>
        <div data-testid="panel-child">Panel Content</div>
      </Panel>,
    );

    expect(screen.getByTestId('panel-child')).toBeInTheDocument();
    expect(screen.getByText('Panel Content')).toBeInTheDocument();
  });

  it('should have default padding applied', () => {
    const { container } = renderWithProvider(
      <Panel>
        <div>Content</div>
      </Panel>,
    );

    const panelWrapper = container.firstChild;
    expect(panelWrapper).toHaveStyle(`padding: ${DEFAULT_PADDING}px`);
  });

  it('should have default border radius applied', () => {
    const { container } = renderWithProvider(
      <Panel>
        <div>Content</div>
      </Panel>,
    );

    const panelWrapper = container.firstChild;
    expect(panelWrapper).toHaveStyle(`border-radius: ${DEFAULT_RADIUS}px`);
  });

  it('should accept custom radius prop', () => {
    const customRadius = 16;
    const { container } = renderWithProvider(
      <Panel radius={customRadius}>
        <div>Content</div>
      </Panel>,
    );

    const panelWrapper = container.firstChild;
    expect(panelWrapper).toHaveStyle(`border-radius: ${customRadius}px`);
  });

  it('should accept custom padding via BoxProps', () => {
    const customPadding = 16;
    const { container } = renderWithProvider(
      <Panel p={customPadding}>
        <div>Content</div>
      </Panel>,
    );

    const panelWrapper = container.firstChild;
    expect(panelWrapper).toHaveStyle(`padding: ${customPadding}px`);
  });

  it('should forward ref to the underlying DOM element', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithProvider(
      <Panel ref={ref}>
        <div>Content</div>
      </Panel>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should render multiple children', () => {
    renderWithProvider(
      <Panel>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </Panel>,
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    const { container } = renderWithProvider(
      <Panel className="custom-panel">
        <div>Content</div>
      </Panel>,
    );

    const panelWrapper = container.firstChild;
    expect(panelWrapper).toHaveClass('custom-panel');
  });

  it('should render with custom data attributes', () => {
    const { container } = renderWithProvider(
      <Panel data-testid="custom-panel">
        <div>Content</div>
      </Panel>,
    );

    expect(screen.getByTestId('custom-panel')).toBeInTheDocument();
  });

  it('should combine custom props with default props', () => {
    const { container } = renderWithProvider(
      <Panel radius={12} p={12} display="flex" alignItems="center">
        <div>Content</div>
      </Panel>,
    );

    const panelWrapper = container.firstChild;
    expect(panelWrapper).toHaveStyle('border-radius: 12px');
    expect(panelWrapper).toHaveStyle('padding: 12px');
    expect(panelWrapper).toHaveStyle('display: flex');
    expect(panelWrapper).toHaveStyle('align-items: center');
  });

  it('should render as a Box component (styled div)', () => {
    const { container } = renderWithProvider(
      <Panel>
        <div>Content</div>
      </Panel>,
    );

    const panelWrapper = container.firstChild;
    expect(panelWrapper?.nodeName).toBe('DIV');
  });

  it('should accept width and height props', () => {
    const { container } = renderWithProvider(
      <Panel width="100%" height="auto">
        <div>Content</div>
      </Panel>,
    );

    const panelWrapper = container.firstChild;
    expect(panelWrapper).toHaveStyle('width: 100%');
    expect(panelWrapper).toHaveStyle('height: auto');
  });

  it('should render empty when no children provided', () => {
    const { container } = renderWithProvider(<Panel />);
    const panelWrapper = container.firstChild;
    expect(panelWrapper).toBeInTheDocument();
  });
});
