import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Wizard from '../Wizard';

const TITLE = 'Wizard title';
const NEXT_STEP = 'Next step';
const BACK = 'Back';
const FOOTER = 'Footer';
const FOOTER_ACTION = 'Footer action';
const SUFFIX = 'Suffix action';
const HEADER_ACTION = 'Header action';
const STEPPER = 'Stepper';
const CONTENT = 'Content';

const isRenderedBefore = (first: HTMLElement, second: HTMLElement) =>
  Boolean(
    first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING,
  );

describe('Wizard component', () => {
  it('should render with title', () => {
    const handleClose = vi.fn();
    renderWithProvider(
      <Wizard title={TITLE} visible={true} onClose={handleClose} />,
    );

    expect(screen.getByText(TITLE)).toBeTruthy();
  });

  it('should render footer', () => {
    const handleClose = vi.fn();
    renderWithProvider(
      <Wizard
        title={TITLE}
        visible={true}
        onClose={handleClose}
        footer={FOOTER}
      />,
    );

    expect(screen.getByText(FOOTER)).toBeTruthy();
  });

  it('should render header action', () => {
    const handleClose = vi.fn();
    renderWithProvider(
      <Wizard
        title={TITLE}
        visible={true}
        onClose={handleClose}
        headerAction={HEADER_ACTION}
      />,
    );

    expect(screen.getByText(HEADER_ACTION)).toBeTruthy();
  });

  it('should render stepper', () => {
    const handleClose = vi.fn();
    renderWithProvider(
      <Wizard
        title={TITLE}
        visible={true}
        onClose={handleClose}
        stepper={STEPPER}
      />,
    );

    expect(screen.getByText(STEPPER)).toBeTruthy();
  });

  it('should render content', () => {
    const handleClose = vi.fn();
    renderWithProvider(
      <Wizard title={TITLE} visible={true} onClose={handleClose}>
        {CONTENT}
      </Wizard>,
    );

    expect(screen.getByText(CONTENT)).toBeTruthy();
  });

  it('should not render prev and next step buttons', () => {
    const handleClose = vi.fn();
    renderWithProvider(
      <Wizard
        title={TITLE}
        visible={true}
        onClose={handleClose}
        texts={{ prevButtonLabel: BACK, nextButtonLabel: NEXT_STEP }}
      />,
    );

    expect(screen.queryByText(BACK)).toBeFalsy();
    expect(screen.queryByText(NEXT_STEP)).toBeFalsy();
  });

  it('should render prev step button with custom props', async () => {
    const handleClose = vi.fn();
    const handleNextStep = vi.fn();
    const handlePrevStep = vi.fn();
    renderWithProvider(
      <Wizard
        title={TITLE}
        visible={true}
        onClose={handleClose}
        stepButtonProps={{
          prevButtonProps: {
            disabled: true,
          },
        }}
        onNextStep={handleNextStep}
        onPrevStep={handlePrevStep}
        texts={{ prevButtonLabel: BACK, nextButtonLabel: NEXT_STEP }}
      />,
    );

    await waitFor(() =>
      expect(screen.getByText(BACK).closest('button')).toBeDisabled(),
    );
    await waitFor(() =>
      expect(screen.getByText(NEXT_STEP).closest('button')).not.toBeDisabled(),
    );
  });

  it('should render next step button with custom props', async () => {
    const handleClose = vi.fn();
    const handleNextStep = vi.fn();
    const handlePrevStep = vi.fn();
    renderWithProvider(
      <Wizard
        title={TITLE}
        visible={true}
        onClose={handleClose}
        stepButtonProps={{
          nextButtonProps: {
            disabled: true,
          },
        }}
        onNextStep={handleNextStep}
        onPrevStep={handlePrevStep}
        texts={{ prevButtonLabel: BACK, nextButtonLabel: NEXT_STEP }}
      />,
    );

    await waitFor(() =>
      expect(screen.getByText(BACK).closest('button')).not.toBeDisabled(),
    );
    await waitFor(() =>
      expect(screen.getByText(NEXT_STEP).closest('button')).toBeDisabled(),
    );
  });

  it('should call handleClose callback', () => {
    const handleClose = vi.fn();
    renderWithProvider(
      <Wizard title={TITLE} visible={true} onClose={handleClose} />,
    );

    userEvent.click(document.querySelector('.close-m') as HTMLElement);

    expect(handleClose).toBeCalled();
  });

  it('should call handlePrevStep and handleNextStep callback', () => {
    const handleClose = vi.fn();
    const handleNextStep = vi.fn();
    const handlePrevStep = vi.fn();
    renderWithProvider(
      <Wizard
        title={TITLE}
        visible={true}
        onClose={handleClose}
        onNextStep={handleNextStep}
        onPrevStep={handlePrevStep}
        texts={{ prevButtonLabel: BACK, nextButtonLabel: NEXT_STEP }}
      />,
    );

    userEvent.click(screen.getByText(BACK));
    userEvent.click(screen.getByText(NEXT_STEP));

    expect(handlePrevStep).toBeCalled();
    expect(handleNextStep).toBeCalled();
  });
});

describe('Wizard.OnModal component', () => {
  it('should render footerAction in the footer', () => {
    const handleClose = vi.fn();
    renderWithProvider(
      <Wizard.OnModal
        title={TITLE}
        visible={true}
        onClose={handleClose}
        footerAction={<span>{FOOTER_ACTION}</span>}
        modalProps={{ size: 'medium' }}
      />,
    );

    expect(screen.getByText(FOOTER_ACTION)).toBeTruthy();
  });

  it('should render footerAction without next step button and suffix', () => {
    const handleClose = vi.fn();
    renderWithProvider(
      <Wizard.OnModal
        title={TITLE}
        visible={true}
        onClose={handleClose}
        footerAction={<span>{FOOTER_ACTION}</span>}
        texts={{ prevButtonLabel: BACK, nextButtonLabel: NEXT_STEP }}
        modalProps={{ size: 'medium' }}
      />,
    );

    expect(screen.getByText(FOOTER_ACTION)).toBeTruthy();
    expect(screen.queryByText(NEXT_STEP)).toBeFalsy();
  });

  it('should render footerAction before the next step button', () => {
    const handleClose = vi.fn();
    const handleNextStep = vi.fn();
    renderWithProvider(
      <Wizard.OnModal
        title={TITLE}
        visible={true}
        onClose={handleClose}
        footerAction={<span>{FOOTER_ACTION}</span>}
        onNextStep={handleNextStep}
        texts={{ prevButtonLabel: BACK, nextButtonLabel: NEXT_STEP }}
        modalProps={{ size: 'medium' }}
      />,
    );

    expect(
      isRenderedBefore(
        screen.getByText(FOOTER_ACTION),
        screen.getByText(NEXT_STEP),
      ),
    ).toBe(true);
  });

  it('should render modalProps.suffix after the next step button', () => {
    const handleClose = vi.fn();
    const handleNextStep = vi.fn();
    renderWithProvider(
      <Wizard.OnModal
        title={TITLE}
        visible={true}
        onClose={handleClose}
        footerAction={<span>{FOOTER_ACTION}</span>}
        onNextStep={handleNextStep}
        texts={{ prevButtonLabel: BACK, nextButtonLabel: NEXT_STEP }}
        modalProps={{ size: 'medium', suffix: <span>{SUFFIX}</span> }}
      />,
    );

    expect(
      isRenderedBefore(screen.getByText(NEXT_STEP), screen.getByText(SUFFIX)),
    ).toBe(true);
  });

  it('should render suffix without footerAction', () => {
    const handleClose = vi.fn();
    renderWithProvider(
      <Wizard.OnModal
        title={TITLE}
        visible={true}
        onClose={handleClose}
        modalProps={{ size: 'medium', suffix: <span>{SUFFIX}</span> }}
      />,
    );

    expect(screen.getByText(SUFFIX)).toBeTruthy();
    expect(screen.queryByText(FOOTER_ACTION)).toBeFalsy();
  });
});
