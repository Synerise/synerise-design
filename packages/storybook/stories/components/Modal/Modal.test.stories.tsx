import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import Button from '@synerise/ds-button';
import type { ModalProps } from '@synerise/ds-modal';
import Modal from '@synerise/ds-modal';

import { NO_SNAPSHOT } from '../../utils/chromatic';

const meta: Meta<ModalProps> = {
  title: 'Components/Modal/Tests',
  tags: ['visualtests'],
  parameters: { layout: 'centered' },
  component: Modal,
};

export default meta;

type Story = StoryObj<ModalProps>;

// ---------------------------------------------------------------------------
// Close via X button
// ---------------------------------------------------------------------------
export const ClosesViaXButton: Story = {
  parameters: { ...NO_SNAPSHOT },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        {!open && <Button onClick={() => setOpen(true)}>Reopen</Button>}
        <Modal
          title="Close test"
          open={open}
          onCancel={() => setOpen(false)}
          footer={null}
        />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);

    await waitFor(() =>
      expect(body.getByTestId('ds-modal')).toBeInTheDocument(),
    );

    const closeBtn = body.getByTestId('modal-close');
    await userEvent.click(closeBtn);

    await waitFor(() => expect(body.getByTestId('ds-modal')).not.toBeVisible());
  },
};

// ---------------------------------------------------------------------------
// Close via mask click
// ---------------------------------------------------------------------------
export const ClosesViaMaskClick: Story = {
  parameters: { ...NO_SNAPSHOT },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Modal
        title="Mask close test"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        maskClosable
      />
    );
  },
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    const body = within(doc.body);

    await waitFor(() =>
      expect(body.getByTestId('ds-modal')).toBeInTheDocument(),
    );

    // Click the scroll-wrap (the mask area) directly via the portal container
    const scrollWrap = doc.querySelector(
      '[data-testid="ds-modal"] > div:nth-child(2)',
    ) as HTMLElement;
    await userEvent.click(scrollWrap);

    await waitFor(() => expect(body.getByTestId('ds-modal')).not.toBeVisible());
  },
};

// ---------------------------------------------------------------------------
// Mask click does NOT close when maskClosable=false
// ---------------------------------------------------------------------------
export const MaskClickDoesNotClose: Story = {
  parameters: { ...NO_SNAPSHOT },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Modal
        title="maskClosable=false"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        maskClosable={false}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    const body = within(doc.body);

    await waitFor(() =>
      expect(body.getByTestId('ds-modal')).toBeInTheDocument(),
    );

    const scrollWrap = doc.querySelector(
      '[data-testid="ds-modal"] > div:nth-child(2)',
    ) as HTMLElement;
    await userEvent.click(scrollWrap);

    // modal should still be present
    expect(body.getByTestId('ds-modal')).toBeInTheDocument();
  },
};

// ---------------------------------------------------------------------------
// onOk callback fires and closes modal
// ---------------------------------------------------------------------------
export const OkButtonCallsHandler: Story = {
  parameters: { ...NO_SNAPSHOT },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Modal
        title="OK test"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);

    await waitFor(() =>
      expect(body.getByTestId('ds-modal')).toBeInTheDocument(),
    );

    const applyBtn = body.getByText('Apply');
    await userEvent.click(applyBtn);

    await waitFor(() => expect(body.getByTestId('ds-modal')).not.toBeVisible());
  },
};

// ---------------------------------------------------------------------------
// Async onCancel — modal stays open until promise resolves
// ---------------------------------------------------------------------------
export const AsyncOnCancelResolvesBeforeClose: Story = {
  parameters: { ...NO_SNAPSHOT },
  render: () => {
    const [open, setOpen] = useState(true);
    const [resolved, setResolved] = useState(false);

    const handleCancel = async () => {
      await new Promise<void>((resolve) => setTimeout(resolve, 50));
      setResolved(true);
      setOpen(false);
    };

    return (
      <>
        {resolved && <div data-testid="resolved-marker">resolved</div>}
        <Modal
          title="Async cancel"
          open={open}
          onCancel={handleCancel}
          footer={null}
        />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);

    await waitFor(() =>
      expect(body.getByTestId('ds-modal')).toBeInTheDocument(),
    );

    const closeBtn = body.getByTestId('modal-close');
    await userEvent.click(closeBtn);

    await waitFor(() =>
      expect(body.getByTestId('resolved-marker')).toBeInTheDocument(),
    );
    await waitFor(() => expect(body.getByTestId('ds-modal')).not.toBeVisible());
  },
};

// ---------------------------------------------------------------------------
// Footer cancel button triggers onCancel
// ---------------------------------------------------------------------------
export const CancelButtonCallsHandler: Story = {
  parameters: { ...NO_SNAPSHOT },
  args: { onCancel: fn() },
  render: (args) => <Modal title="Cancel test" open onCancel={args.onCancel} />,
  play: async ({ canvasElement, args }) => {
    const body = within(canvasElement.ownerDocument.body);

    await waitFor(() =>
      expect(body.getByTestId('ds-modal')).toBeInTheDocument(),
    );

    await userEvent.click(body.getByText('Cancel'));

    expect(args.onCancel).toHaveBeenCalledOnce();
    await waitFor(() => expect(body.getByTestId('ds-modal')).not.toBeVisible());
  },
};

// ---------------------------------------------------------------------------
// Nested modals stack above the modal that contains them
// ---------------------------------------------------------------------------
export const StacksNestedModalsAboveTheirParent: Story = {
  render: () => (
    // The host raises itself explicitly, the way the analytics "Profile filter"
    // modal does; its descendants have to derive from that value, not from the
    // flat zindex-modal token.
    <Modal open zIndex={991002} title="Host" footer={null}>
      <Modal open title="Child" footer={null}>
        <Modal open title="Grandchild" footer={null} />
      </Modal>
    </Modal>
  ),
  play: async ({ canvasElement }) => {
    const { body } = canvasElement.ownerDocument;
    const scoped = within(body);

    await waitFor(() => expect(scoped.getByText('Grandchild')).toBeVisible());

    const zIndexOf = (title: string) => {
      const root = scoped
        .getByRole('dialog', { name: title })
        .closest('[data-testid="ds-modal"]') as HTMLElement;
      return Number(window.getComputedStyle(root).zIndex);
    };

    const host = zIndexOf('Host');
    const child = zIndexOf('Child');
    const grandchild = zIndexOf('Grandchild');

    expect(host).toBe(991002);
    expect(child).toBeGreaterThan(host);
    expect(grandchild).toBeGreaterThan(child);
    // Never above the popover tokens (zindex-dropdown is 991050), or a modal
    // would swallow its own dropdowns and selects.
    expect(grandchild).toBeLessThan(991050);
  },
};

// ---------------------------------------------------------------------------
// A short modal opened over one taller than the viewport lines up with it
// ---------------------------------------------------------------------------
export const AlignsStackedModalsOfDifferentHeights: Story = {
  render: () => (
    <>
      {/* Classic scrollbars, as on Windows; overlay ones hide the offset. */}
      <style>{'::-webkit-scrollbar { width: 15px; }'}</style>
      <Modal open size="large" title="Tall" footer={null}>
        <div style={{ height: '200vh' }} />
      </Modal>
      <Modal open size="large" title="Short" footer={null} />
    </>
  ),
  play: async ({ canvasElement }) => {
    const scoped = within(canvasElement.ownerDocument.body);

    await waitFor(() => expect(scoped.getByText('Short')).toBeVisible());

    const tall = scoped.getByRole('dialog', { name: 'Tall' });
    const short = scoped.getByRole('dialog', { name: 'Short' });

    expect(short.getBoundingClientRect().left).toBe(
      tall.getBoundingClientRect().left,
    );
    // The CI browser runs with --hide-scrollbars, so the offset above cannot
    // appear there; the reserved gutter is what keeps it away elsewhere.
    for (const dialog of [tall, short]) {
      const scrollWrap = dialog.parentElement as HTMLElement;
      expect(window.getComputedStyle(scrollWrap).scrollbarGutter).toBe(
        'stable',
      );
    }
  },
};
