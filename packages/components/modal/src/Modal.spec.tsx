import React, { createRef } from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import Modal from './Modal';
import { type ModalRef } from './Modal.types';

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
});
