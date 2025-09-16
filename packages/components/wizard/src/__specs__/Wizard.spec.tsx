import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Wizard from '../Wizard';

const TITLE = 'Wizard title';
const NEXT_STEP = 'Next step';
const BACK = 'Back';
const FOOTER = 'Footer';
const HEADER_ACTION = 'Header action';
const STEPPER = 'Stepper';
const CONTENT = 'Content';

describe('Wizard component', () => {
  it('should render with title', () => {
    const handleClose = jest.fn();
    renderWithProvider(
      <Wizard title={TITLE} visible={true} onClose={handleClose} />,
    );

    expect(screen.getByText(TITLE)).toBeTruthy();
  });

  it('should render footer', () => {
    const handleClose = jest.fn();
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
    const handleClose = jest.fn();
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
    const handleClose = jest.fn();
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
    const handleClose = jest.fn();
    renderWithProvider(
      <Wizard title={TITLE} visible={true} onClose={handleClose}>
        {CONTENT}
      </Wizard>,
    );

    expect(screen.getByText(CONTENT)).toBeTruthy();
  });

  it('should not render prev and next step buttons', () => {
    const handleClose = jest.fn();
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
    const handleClose = jest.fn();
    const handleNextStep = jest.fn();
    const handlePrevStep = jest.fn();
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
    const handleClose = jest.fn();
    const handleNextStep = jest.fn();
    const handlePrevStep = jest.fn();
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
    const handleClose = jest.fn();
    renderWithProvider(
      <Wizard title={TITLE} visible={true} onClose={handleClose} />,
    );

    userEvent.click(document.querySelector('.close-m') as HTMLElement);

    expect(handleClose).toBeCalled();
  });

  it('should call handlePrevStep and handleNextStep callback', () => {
    const handleClose = jest.fn();
    const handleNextStep = jest.fn();
    const handlePrevStep = jest.fn();
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
