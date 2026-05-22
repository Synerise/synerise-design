import React from 'react';
import { act, render, screen } from '@testing-library/react';

import PortalRenderer from '../PortalRenderer';
import { clearPortalOwner, setPortalContent, setPortalOwner } from '../portalStore';

const resetStoreState = (): void => {
  setPortalContent(null);
  const resetId = Symbol('reset');
  setPortalOwner(resetId);
  clearPortalOwner(resetId);
};

beforeEach(() => {
  resetStoreState();
});

describe('PortalRenderer', () => {
  it('renders nothing when no content is set', () => {
    const { container } = render(<PortalRenderer />);
    expect(container).toBeEmptyDOMElement();
    expect(document.body.querySelector('[data-testid="portal-content"]')).toBeNull();
  });

  it('renders portal content into document.body when it is the owner', async () => {
    const { unmount } = render(<PortalRenderer />);
    act(() => {
      setPortalContent(<p data-testid="portal-content">Hello</p>);
    });
    expect(screen.getByTestId('portal-content')).toBeInTheDocument();
    unmount();
  });

  it('removes portal content from document.body after unmount', async () => {
    const { unmount } = render(<PortalRenderer />);
    act(() => {
      setPortalContent(<p data-testid="portal-content">Hello</p>);
    });
    expect(screen.getByTestId('portal-content')).toBeInTheDocument();
    unmount();
    expect(screen.queryByTestId('portal-content')).not.toBeInTheDocument();
  });

  it('renders nothing when another instance holds ownership', () => {
    const { container: c1 } = render(<PortalRenderer />);
    // A second renderer mounts later and takes ownership
    render(<PortalRenderer />);
    act(() => {
      setPortalContent(<p data-testid="portal-content">Hello</p>);
    });
    // First renderer's container should be empty — it is not the owner
    expect(c1).toBeEmptyDOMElement();
    // Content should still appear in body (rendered by second renderer)
    expect(screen.getByTestId('portal-content')).toBeInTheDocument();
  });

  it('reclaims ownership when the current owner unmounts so a remaining renderer keeps working', () => {
    const { container: first } = render(<PortalRenderer />);
    const second = render(<PortalRenderer />);

    // Second renderer is the active owner — content goes through it.
    act(() => {
      setPortalContent(<p data-testid="initial">Initial</p>);
    });
    expect(screen.getByTestId('initial')).toBeInTheDocument();
    expect(first).toBeEmptyDOMElement();

    // The active owner unmounts (mirrors the puib navigation that breaks confirmations).
    second.unmount();
    act(() => {
      setPortalContent(null);
    });

    // New content set after the unmount must be rendered by the surviving renderer.
    act(() => {
      setPortalContent(<p data-testid="after-unmount">After</p>);
    });
    expect(screen.getByTestId('after-unmount')).toBeInTheDocument();
  });

  it('updates rendered content when store content changes', () => {
    render(<PortalRenderer />);
    act(() => {
      setPortalContent(<p data-testid="v1">First</p>);
    });
    expect(screen.getByTestId('v1')).toBeInTheDocument();
    act(() => {
      setPortalContent(<p data-testid="v2">Second</p>);
    });
    expect(screen.queryByTestId('v1')).not.toBeInTheDocument();
    expect(screen.getByTestId('v2')).toBeInTheDocument();
  });

  it('renders nothing when content is set to null', () => {
    render(<PortalRenderer />);
    act(() => {
      setPortalContent(<p data-testid="portal-content">Hello</p>);
    });
    act(() => {
      setPortalContent(null);
    });
    expect(screen.queryByTestId('portal-content')).not.toBeInTheDocument();
  });
});
