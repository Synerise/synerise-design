import React, { createRef, useState } from 'react';

import {
  OVERLAY_Z_INDEX_STEP,
  OverlayZIndexProvider,
  closeAllOverlays,
  renderWithProvider,
  theme,
} from '@synerise/ds-core';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';

import Dropdown from '@synerise/ds-dropdown';
import Popconfirm from '@synerise/ds-popconfirm';

import Modal from './Modal';
import { type ModalRef } from './Modal.types';

const MODAL_TOKEN_FOR_OVERLAY_TESTS = Number.parseInt(
  theme.variables['zindex-modal'],
  10,
);

describe('Modal', () => {
  const titleMock = 'Test Title';
  const descriptionMock = 'Test Description';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render modal if there is no open prop or open is false', () => {
    renderWithProvider(
      <Modal title={titleMock} description={descriptionMock} />,
    );

    const modalDialog = screen.queryByRole('dialog');

    expect(modalDialog).not.toBeInTheDocument();
  });

  it('should render title, description, and blank correctly', () => {
    renderWithProvider(
      <Modal title={titleMock} description={descriptionMock} open />,
    );

    const titleElement = screen.getByText(titleMock);
    const descriptionElement = screen.getByText(descriptionMock);

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it('should not render title and description when blank, title and description is false', () => {
    renderWithProvider(<Modal open />);

    const titleElement = screen.queryByText(titleMock);
    const descriptionElement = screen.queryByText(descriptionMock);
    const closeButton = screen.queryByTestId('modal-close');

    expect(titleElement).not.toBeInTheDocument();
    expect(descriptionElement).not.toBeInTheDocument();
    expect(closeButton).not.toBeInTheDocument();
  });

  it('should render headerActions when provided', () => {
    const headerActions = <button onClick={vi.fn()}>Test Action</button>;

    renderWithProvider(
      <Modal title={titleMock} headerActions={headerActions} open />,
    );
    const headerActionsElement = screen.getByText('Test Action');

    expect(headerActionsElement).toBeInTheDocument();
  });

  it('should render custom size correctly', () => {
    renderWithProvider(<Modal title="Test Title" size="medium" open />);

    const modalDialog = screen.getByRole('dialog');
    expect(modalDialog).toHaveStyle({ width: '792px' });
  });

  it('should render modal with default footer if its not in props', () => {
    renderWithProvider(<Modal open />);

    const defaultFooter = screen.queryByTestId('modal-footer');
    expect(defaultFooter).toBeInTheDocument();
  });

  it('should render modal without footer if its in props as null', () => {
    renderWithProvider(<Modal open footer={null} />);

    const defaultFooter = screen.queryByTestId('modal-footer');
    expect(defaultFooter).not.toBeInTheDocument();
  });

  it('should not wrap children in scrollbar when maxViewportHeight is set and disableScrollbar is true', () => {
    const { container } = renderWithProvider(
      <Modal open maxViewportHeight={80} disableScrollbar>
        <div data-testid="modal-content">Content</div>
      </Modal>,
    );

    const scrollbar = screen.queryByTestId('virtual-scrollbar');
    expect(scrollbar).not.toBeInTheDocument();
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  it('should wrap children in scrollbar when maxViewportHeight is set', () => {
    const { container } = renderWithProvider(
      <Modal open maxViewportHeight={80}>
        <div data-testid="modal-content">Content</div>
      </Modal>,
    );

    const scrollbar = screen.getByTestId('virtual-scrollbar');
    expect(scrollbar).toBeInTheDocument();
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  it('should expose the custom scrollbar scroll node via bodyScrollRef when maxViewportHeight is set', async () => {
    const bodyScrollRef = createRef<HTMLDivElement>();

    renderWithProvider(
      <Modal open maxViewportHeight={80} bodyScrollRef={bodyScrollRef}>
        <div data-testid="modal-content">Content</div>
      </Modal>,
    );

    await waitFor(() =>
      expect(bodyScrollRef.current).toBeInstanceOf(HTMLElement),
    );
    expect(bodyScrollRef.current).toContainElement(
      screen.getByTestId('modal-content'),
    );
  });

  it('should expose the body element via bodyScrollRef when disableScrollbar is true', () => {
    const bodyScrollRef = createRef<HTMLDivElement>();

    renderWithProvider(
      <Modal open maxViewportHeight={80} disableScrollbar bodyScrollRef={bodyScrollRef}>
        <div data-testid="modal-content">Content</div>
      </Modal>,
    );

    expect(screen.queryByTestId('virtual-scrollbar')).not.toBeInTheDocument();
    expect(bodyScrollRef.current).toBeInstanceOf(HTMLDivElement);
    expect(bodyScrollRef.current).toContainElement(
      screen.getByTestId('modal-content'),
    );
  });

  it('should show custom footer if its in props', () => {
    renderWithProvider(<Modal footer={<div>Custom Footer</div>} open />);

    const customFooter = screen.getByText('Custom Footer');
    const defaultFooter = screen.queryByTestId('modal-footer');
    expect(customFooter).toBeInTheDocument();
    expect(defaultFooter).not.toBeInTheDocument();
  });

  it('should expose scrollToTop and scrollToBottom via ref', () => {
    const ref = createRef<ModalRef>();
    const scrollToMock = vi.fn();

    renderWithProvider(
      <Modal open ref={ref}>
        <div>content</div>
      </Modal>,
    );

    const scrollWrap = document.querySelector('[data-testid="ds-modal"] > div:nth-child(2)') as HTMLElement;
    if (scrollWrap) {
      scrollWrap.scrollTo = scrollToMock;
    }

    expect(typeof ref.current?.scrollToTop).toBe('function');
    expect(typeof ref.current?.scrollToBottom).toBe('function');
  });

  it('should call closeModal after async onCancel resolves', async () => {
    const onCancel = vi.fn().mockReturnValue(Promise.resolve());

    renderWithProvider(<Modal open onCancel={onCancel} title="Async cancel" />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    await waitFor(() => expect(onCancel).toHaveBeenCalledTimes(1));
  });

  it('should call closeModal immediately when onCancel returns void', async () => {
    const onCancel = vi.fn();

    renderWithProvider(<Modal open onCancel={onCancel} title="Sync cancel" />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should close modal when mask is clicked and maskClosable is true', async () => {
    const onCancel = vi.fn();

    renderWithProvider(<Modal open onCancel={onCancel} maskClosable title="mask test" />);

    const mask = document.querySelector('[data-testid="ds-modal"] > div:nth-child(2)') as HTMLElement;
    if (mask) fireEvent.click(mask);

    await waitFor(() => expect(onCancel).toHaveBeenCalledTimes(1));
  });

  it('should not close modal when mask is clicked and maskClosable is false', () => {
    const onCancel = vi.fn();

    renderWithProvider(<Modal open onCancel={onCancel} maskClosable={false} title="mask test" />);

    const mask = document.querySelector('[data-testid="ds-modal"] > div:nth-child(2)') as HTMLElement;
    if (mask) fireEvent.click(mask);

    expect(onCancel).not.toHaveBeenCalled();
  });

  it('should close modal when Escape key is pressed', async () => {
    const onCancel = vi.fn();

    renderWithProvider(<Modal open onCancel={onCancel} title="escape test" />);

    const modalRoot = screen.getByTestId('ds-modal');
    fireEvent.keyDown(modalRoot, { key: 'Escape' });

    await waitFor(() => expect(onCancel).toHaveBeenCalledTimes(1));
  });

  it('should not close on Escape when onCancel is not provided', () => {
    renderWithProvider(<Modal open title="no cancel" />);

    const modalRoot = screen.getByTestId('ds-modal');
    fireEvent.keyDown(modalRoot, { key: 'Escape' });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should trap focus within the modal', () => {
    renderWithProvider(
      <Modal open onCancel={vi.fn()} title="focus trap">
        <button data-testid="first-btn">First</button>
        <button data-testid="last-btn">Last</button>
      </Modal>,
    );

    const lastBtn = screen.getByTestId('last-btn');
    lastBtn.focus();

    // Tab from last focusable element should wrap to first
    fireEvent.keyDown(document, { key: 'Tab' });

    // Focus should stay within modal (not escape to body)
    expect(document.activeElement?.closest('[data-testid="ds-modal"]')).toBeTruthy();
  });

  it('should focus the dialog container itself on open, not the first focusable child', () => {
    renderWithProvider(
      <Modal open onCancel={vi.fn()} title="dialog focus">
        <button data-testid="first-btn">First</button>
      </Modal>,
    );

    // Focus lands on the dialog element (announced by its accessible name),
    // not on the first focusable field — no cursor in a non-critical field.
    expect(document.activeElement).toBe(screen.getByRole('dialog'));
    expect(document.activeElement).not.toBe(screen.getByTestId('first-btn'));
  });

  it('should focus the element passed via initialFocusRef on open', () => {
    const inputRef = createRef<HTMLInputElement>();

    renderWithProvider(
      <Modal
        open
        onCancel={vi.fn()}
        title="initial focus"
        initialFocusRef={inputRef}
      >
        <input data-testid="search" ref={inputRef} />
      </Modal>,
    );

    expect(document.activeElement).toBe(screen.getByTestId('search'));
  });

  describe('afterClose semantics', () => {
    it('fires on every open: true → false transition', async () => {
      const afterClose = vi.fn();
      const { rerender } = renderWithProvider(
        <Modal open afterClose={afterClose} title="t" />,
      );
      expect(afterClose).not.toHaveBeenCalled();

      rerender(<Modal open={false} afterClose={afterClose} title="t" />);
      await waitFor(() => expect(afterClose).toHaveBeenCalledTimes(1));

      rerender(<Modal open afterClose={afterClose} title="t" />);
      rerender(<Modal open={false} afterClose={afterClose} title="t" />);
      await waitFor(() => expect(afterClose).toHaveBeenCalledTimes(2));
    });

    it('does not fire on initial mount when open is false', () => {
      const afterClose = vi.fn();
      renderWithProvider(<Modal afterClose={afterClose} title="t" />);
      expect(afterClose).not.toHaveBeenCalled();
    });

    it('does not fire on initial mount when open is true', () => {
      const afterClose = vi.fn();
      renderWithProvider(<Modal open afterClose={afterClose} title="t" />);
      expect(afterClose).not.toHaveBeenCalled();
    });

    it('fires when the user closes via the cancel button', async () => {
      const afterClose = vi.fn();
      renderWithProvider(
        <Modal open afterClose={afterClose} onCancel={vi.fn()} title="t" />,
      );

      fireEvent.click(screen.getByText('Cancel'));
      await waitFor(() => expect(afterClose).toHaveBeenCalledTimes(1));
    });

    it('fires when the user closes via Escape', async () => {
      const afterClose = vi.fn();
      renderWithProvider(
        <Modal open afterClose={afterClose} onCancel={vi.fn()} title="t" />,
      );

      fireEvent.keyDown(screen.getByTestId('ds-modal'), { key: 'Escape' });
      await waitFor(() => expect(afterClose).toHaveBeenCalledTimes(1));
    });

    it('fires exactly once when destroyOnClose=true (no double-fire with unmount)', async () => {
      const afterClose = vi.fn();
      const { rerender } = renderWithProvider(
        <Modal open destroyOnClose afterClose={afterClose} title="t" />,
      );
      rerender(<Modal open={false} destroyOnClose afterClose={afterClose} title="t" />);
      await waitFor(() => expect(afterClose).toHaveBeenCalledTimes(1));
    });

    it('does not fire when the Modal is hard-unmounted while still open', () => {
      const afterClose = vi.fn();
      const { unmount } = renderWithProvider(
        <Modal open afterClose={afterClose} title="t" />,
      );
      unmount();
      expect(afterClose).not.toHaveBeenCalled();
    });
  });

  it('should restore focus to previously focused element when closed', async () => {
    const outsideButton = document.createElement('button');
    outsideButton.textContent = 'Outside';
    document.body.appendChild(outsideButton);
    outsideButton.focus();

    const { rerender } = renderWithProvider(
      <Modal open onCancel={vi.fn()} title="restore focus">
        <button>Inside</button>
      </Modal>,
    );

    // Focus should have moved inside modal
    expect(document.activeElement?.closest('[data-testid="ds-modal"]')).toBeTruthy();

    rerender(<Modal title="restore focus" onCancel={vi.fn()} />);

    await waitFor(() => {
      expect(document.activeElement).toBe(outsideButton);
    });

    document.body.removeChild(outsideButton);
  });

  describe('accessibility attributes', () => {
    it('should mark the dialog as a modal with aria-modal', () => {
      renderWithProvider(<Modal title={titleMock} open />);

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });

    it('should label the dialog with its title via aria-labelledby', () => {
      renderWithProvider(<Modal title={titleMock} open />);

      // getByRole resolves the accessible name from aria-labelledby
      expect(
        screen.getByRole('dialog', { name: titleMock }),
      ).toBeInTheDocument();
    });

    it('should fall back to ariaLabel when there is no title', () => {
      renderWithProvider(<Modal ariaLabel="Settings dialog" open />);

      expect(
        screen.getByRole('dialog', { name: 'Settings dialog' }),
      ).toBeInTheDocument();
    });

    it('should describe the dialog with its description via aria-describedby', () => {
      renderWithProvider(
        <Modal title={titleMock} description={descriptionMock} open />,
      );

      expect(screen.getByRole('dialog')).toHaveAccessibleDescription(
        descriptionMock,
      );
    });

    it('should give the close button a default accessible name', () => {
      renderWithProvider(
        <Modal title={titleMock} onCancel={vi.fn()} open />,
      );

      expect(
        screen.getByRole('button', { name: 'Close' }),
      ).toBeInTheDocument();
    });

    it('should let the close button label be overridden', () => {
      renderWithProvider(
        <Modal
          title={titleMock}
          onCancel={vi.fn()}
          closeButtonAriaLabel="Dismiss"
          open
        />,
      );

      expect(
        screen.getByRole('button', { name: 'Dismiss' }),
      ).toBeInTheDocument();
    });
  });

  describe('closeAllOverlays', () => {
    it('closes an open modal through onCancel', async () => {
      const onCancel = vi.fn();
      renderWithProvider(<Modal open onCancel={onCancel} title="t" />);

      await act(async () => {
        await closeAllOverlays();
      });

      expect(onCancel).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('ds-modal')).not.toBeVisible();
    });

    it('closes a modal that has no onCancel', async () => {
      renderWithProvider(<Modal open title="t" />);

      await act(async () => {
        await closeAllOverlays();
      });

      expect(screen.getByTestId('ds-modal')).not.toBeVisible();
    });

    it('awaits an async onCancel before closing', async () => {
      const onCancel = vi.fn().mockResolvedValue(undefined);
      renderWithProvider(<Modal open onCancel={onCancel} title="t" />);

      await act(async () => {
        await closeAllOverlays();
      });

      expect(onCancel).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('ds-modal')).not.toBeVisible();
    });

    it('closes every open modal', async () => {
      const onCancelFirst = vi.fn();
      const onCancelSecond = vi.fn();
      renderWithProvider(
        <>
          <Modal open onCancel={onCancelFirst} title="first" />
          <Modal open onCancel={onCancelSecond} title="second" />
        </>,
      );

      await act(async () => {
        await closeAllOverlays();
      });

      expect(onCancelFirst).toHaveBeenCalledTimes(1);
      expect(onCancelSecond).toHaveBeenCalledTimes(1);
    });

    it('leaves modals open when another kind is targeted', async () => {
      const onCancel = vi.fn();
      renderWithProvider(<Modal open onCancel={onCancel} title="t" />);

      await act(async () => {
        await closeAllOverlays({ kinds: ['dropdown'] });
      });

      expect(onCancel).not.toHaveBeenCalled();
      expect(screen.getByTestId('ds-modal')).toBeVisible();
    });

    it('does not close twice when called repeatedly', async () => {
      const onCancel = vi.fn();
      renderWithProvider(<Modal open onCancel={onCancel} title="t" />);

      await act(async () => {
        await closeAllOverlays();
        await closeAllOverlays();
      });

      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('restores focus to the previously focused element', async () => {
      const outsideButton = document.createElement('button');
      document.body.appendChild(outsideButton);
      outsideButton.focus();

      renderWithProvider(
        <Modal open onCancel={vi.fn()} title="restore focus">
          <button>Inside</button>
        </Modal>,
      );

      await act(async () => {
        await closeAllOverlays();
      });

      await waitFor(() => {
        expect(document.activeElement).toBe(outsideButton);
      });

      document.body.removeChild(outsideButton);
    });

    it('stays closed when the parent re-renders with an inline afterClose', async () => {
      const Wrapper = () => {
        const [, forceRender] = useState(0);

        return (
          <>
            <button onClick={() => forceRender((count) => count + 1)}>
              rerender
            </button>
            <Modal open title="t" afterClose={() => undefined} />
          </>
        );
      };
      renderWithProvider(<Wrapper />);

      await act(async () => {
        await closeAllOverlays();
      });
      expect(screen.getByTestId('ds-modal')).not.toBeVisible();

      fireEvent.click(screen.getByRole('button', { name: 'rerender' }));

      expect(screen.getByTestId('ds-modal')).not.toBeVisible();
    });

    it('does nothing when no modal is open', async () => {
      renderWithProvider(<Modal title="t" onCancel={vi.fn()} />);

      await expect(closeAllOverlays()).resolves.toBeUndefined();
    });
  });

  describe('z-index stacking', () => {
    const MODAL_TOKEN = Number.parseInt(theme.variables['zindex-modal'], 10);
    const DROPDOWN_TOKEN = Number.parseInt(
      theme.variables['zindex-dropdown'],
      10,
    );

    const zIndexOf = (root: HTMLElement): number =>
      Number(window.getComputedStyle(root).zIndex);

    const roots = (): HTMLElement[] => screen.getAllByTestId('ds-modal');

    // Nested modals cannot be looked up by DOM order: every modal portals to
    // document.body and React commits the innermost portal FIRST, so the parent
    // ends up after its own child. That inversion is exactly why z-index — not
    // document order — has to carry the stacking.
    const modalTitled = (name: string): HTMLElement => {
      const root = screen
        .getByRole('dialog', { name })
        .closest<HTMLElement>('[data-testid="ds-modal"]');
      if (!root) {
        throw new Error(`No ds-modal root found for dialog "${name}"`);
      }
      return root;
    };

    const zIndexTitled = (name: string): number => zIndexOf(modalTitled(name));

    it('uses the zindex-modal token when nothing encloses it', () => {
      renderWithProvider(<Modal open title="lone" />);

      expect(zIndexOf(screen.getByTestId('ds-modal'))).toBe(MODAL_TOKEN);
    });

    it('stacks a nested modal above the modal that contains it', () => {
      renderWithProvider(
        <Modal open title="outer">
          <Modal open title="inner" />
        </Modal>,
      );

      expect(zIndexTitled('outer')).toBe(MODAL_TOKEN);
      expect(zIndexTitled('inner')).toBe(MODAL_TOKEN + OVERLAY_Z_INDEX_STEP);
      expect(zIndexTitled('inner')).toBeGreaterThan(zIndexTitled('outer'));
    });

    it('keeps stacking through three levels', () => {
      renderWithProvider(
        <Modal open title="first">
          <Modal open title="second">
            <Modal open title="third" />
          </Modal>
        </Modal>,
      );

      expect(
        ['first', 'second', 'third'].map((name) => zIndexTitled(name)),
      ).toEqual([
        MODAL_TOKEN,
        MODAL_TOKEN + OVERLAY_Z_INDEX_STEP,
        MODAL_TOKEN + 2 * OVERLAY_Z_INDEX_STEP,
      ]);
    });

    it('derives from a parent that raised itself with an explicit zIndex', () => {
      // The reported analytics chain: the "Profile filter" modal hardcodes
      // 991002 and the inline-analytics modal measures its way to 991004, so
      // the ds-factors array modal opened inside them has to reach 991006.
      renderWithProvider(
        <Modal open title="profile filter" zIndex={991002}>
          <Modal open title="local aggregate" zIndex={991004}>
            <Modal open title="array editor" />
          </Modal>
        </Modal>,
      );

      expect(
        ['profile filter', 'local aggregate', 'array editor'].map((name) =>
          zIndexTitled(name),
        ),
      ).toEqual([991002, 991004, 991006]);

      // ...and DOM order alone would have got it backwards.
      expect(roots().map(zIndexOf)).toEqual([991006, 991004, 991002]);
    });

    it('lets an explicit zIndex on the nested modal win', () => {
      renderWithProvider(
        <Modal open title="outer">
          <Modal open title="inner" zIndex={42} />
        </Modal>,
      );

      expect(zIndexTitled('inner')).toBe(42);
      expect(zIndexTitled('outer')).toBe(MODAL_TOKEN);
    });

    it('publishes its own resolved z-index to a modal rendered in its footer', () => {
      // Footer/prefix slots are a separate prop, not `children` — the provider
      // has to wrap the whole modal root, not just the body.
      renderWithProvider(
        <Modal
          open
          title="outer"
          prefix={<Modal open title="confirm" />}
          onOk={vi.fn()}
          onCancel={vi.fn()}
        />,
      );

      expect(zIndexTitled('confirm')).toBe(MODAL_TOKEN + OVERLAY_Z_INDEX_STEP);
    });

    it('stays below zindex-dropdown so it cannot cover its own popovers', () => {
      // Dropdowns, selects, popconfirms and tooltips opened INSIDE a modal use
      // flat theme tokens starting at zindex-dropdown. A nested modal that rose
      // past that would paint over its own overlays, so the derived value is
      // clamped. Deep enough to hit the ceiling many times over.
      // The clamp logs one dev-only warning on the way; that is the point.
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      const depth = 40;
      const nested = Array.from({ length: depth }).reduce<React.ReactElement>(
        (child, _, index) => (
          <Modal open title={`level-${index}`}>
            {child}
          </Modal>
        ),
        <span data-testid="deepest" />,
      );

      renderWithProvider(nested);

      const all = roots().map(zIndexOf);
      expect(all).toHaveLength(depth);
      all.forEach((value) => {
        expect(value).toBeLessThan(DROPDOWN_TOKEN);
      });
      expect(Math.max(...all)).toBe(DROPDOWN_TOKEN - OVERLAY_Z_INDEX_STEP);

      warn.mockRestore();
    });

    it('reaches the same value the enclosing-overlay contract promises', () => {
      // Guards the ds-modal side of the ds-core contract: rendering under a bare
      // OverlayZIndexProvider must match what a real parent modal produces.
      renderWithProvider(
        <OverlayZIndexProvider value={991002}>
          <Modal open title="nested" />
        </OverlayZIndexProvider>,
      );

      expect(zIndexOf(screen.getByTestId('ds-modal'))).toBe(991004);
    });
  });

  // The overlays a user actually reaches from inside a modal — a select's
  // dropdown, a Popconfirm — are portalled into document.body by floating-ui, so
  // they are DOM siblings of the modal rather than descendants. They still
  // inherit the modal's React context, and they must keep painting ABOVE the
  // modal that owns them. This is the invariant the derived z-index is clamped
  // to protect; if the step or the ceiling is ever raised, these fail first.
  describe('overlays opened from inside a nested modal', () => {
    const OVERLAY_TEXT = 'overlay content';
    const TRIGGER_TEXT = 'open overlay';

    const zIndexOfNestedModal = (): number => {
      const root = screen
        .getByRole('dialog', { name: 'inner' })
        .closest<HTMLElement>('[data-testid="ds-modal"]');
      if (!root) {
        throw new Error('No ds-modal root found for the nested modal');
      }
      return Number(window.getComputedStyle(root).zIndex);
    };

    // Walks up from the overlay's content to the floating element carrying the
    // z-index that PopoverContent set.
    const zIndexOfOverlay = (text: string): number => {
      const floating = screen
        .getByText(text)
        .closest<HTMLElement>('[data-popover-content="true"]');
      if (!floating) {
        throw new Error(`No popover content wrapper found around "${text}"`);
      }
      return Number(window.getComputedStyle(floating).zIndex);
    };

    it('keeps a Dropdown above the nested modal that owns it', async () => {
      renderWithProvider(
        <Modal open title="outer">
          <Modal open title="inner">
            <Dropdown
              overlay={<div>{OVERLAY_TEXT}</div>}
              trigger={['click']}
            >
              <button type="button">{TRIGGER_TEXT}</button>
            </Dropdown>
          </Modal>
        </Modal>,
      );

      fireEvent.click(screen.getByText(TRIGGER_TEXT));
      await screen.findByText(OVERLAY_TEXT);

      expect(zIndexOfNestedModal()).toBe(
        MODAL_TOKEN_FOR_OVERLAY_TESTS + OVERLAY_Z_INDEX_STEP,
      );
      expect(zIndexOfOverlay(OVERLAY_TEXT)).toBeGreaterThan(
        zIndexOfNestedModal(),
      );
    });

    it('keeps a Dropdown above a nested modal whose ancestor was raised near the ceiling', async () => {
      // The case the clamp exists for: a host modal that hardcoded itself up at
      // zindex-dropdown. Without the clamp the nested modal would land ON or
      // ABOVE its own dropdown and swallow it.
      const DROPDOWN_TOKEN = Number.parseInt(
        theme.variables['zindex-dropdown'],
        10,
      );

      renderWithProvider(
        <Modal open title="outer" zIndex={DROPDOWN_TOKEN}>
          <Modal open title="inner">
            <Dropdown
              overlay={<div>{OVERLAY_TEXT}</div>}
              trigger={['click']}
            >
              <button type="button">{TRIGGER_TEXT}</button>
            </Dropdown>
          </Modal>
        </Modal>,
      );

      fireEvent.click(screen.getByText(TRIGGER_TEXT));
      await screen.findByText(OVERLAY_TEXT);

      expect(zIndexOfNestedModal()).toBe(
        DROPDOWN_TOKEN - OVERLAY_Z_INDEX_STEP,
      );
      expect(zIndexOfOverlay(OVERLAY_TEXT)).toBeGreaterThan(
        zIndexOfNestedModal(),
      );
    });

    it('keeps a Popconfirm above the nested modal that owns it', async () => {
      renderWithProvider(
        <Modal open title="outer">
          <Modal open title="inner">
            <Popconfirm title={OVERLAY_TEXT} okText="ok" cancelText="cancel">
              <button type="button">{TRIGGER_TEXT}</button>
            </Popconfirm>
          </Modal>
        </Modal>,
      );

      fireEvent.click(screen.getByText(TRIGGER_TEXT));
      await screen.findByText(OVERLAY_TEXT);

      expect(zIndexOfOverlay(OVERLAY_TEXT)).toBeGreaterThan(
        zIndexOfNestedModal(),
      );
    });
  });
});
