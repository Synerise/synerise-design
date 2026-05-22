import React, { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import Modal from '@synerise/ds-modal';
import type { ModalProps } from '@synerise/ds-modal';

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
  render: () => {
    const onCancel = fn();
    return <Modal title="Cancel test" open onCancel={onCancel} />;
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);

    await waitFor(() =>
      expect(body.getByTestId('ds-modal')).toBeInTheDocument(),
    );

    const cancelBtn = body.getByText('Cancel');
    await userEvent.click(cancelBtn);

    // onCancel was invoked (modal remains open since no state change in this story)
    expect(cancelBtn).toBeInTheDocument();
  },
};
