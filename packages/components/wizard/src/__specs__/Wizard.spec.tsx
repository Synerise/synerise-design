import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { screen } from '@testing-library/react';
import * as React from 'react';
import Wizard from '../Wizard';
import userEvent from '@testing-library/user-event';

const TITLE = 'Wizard title';
const NEXT_STEP = 'Next step';
const BACK = 'Back';
const FOOTER = 'Footer';
const HEADER_ACTION = 'Header action';
const STEPPER = 'Stepper';
const CONTENT = 'Content';

describe('Wizard component', () => {
  it('should render with title', () => {
    // ARRANGE
    const handleClose = jest.fn();
    renderWithProvider(<Wizard title={TITLE} visible={true} onClose={handleClose} />);

    // ASSERT
    expect(screen.getByText(TITLE)).toBeTruthy();
  });

  it('should render footer', () => {
    // ARRANGE
    const handleClose = jest.fn();
    renderWithProvider(<Wizard title={TITLE} visible={true} onClose={handleClose} footer={FOOTER} />);

    // ASSERT
    expect(screen.getByText(FOOTER)).toBeTruthy();
  });

  it('should render header action', () => {
    // ARRANGE
    const handleClose = jest.fn();
    renderWithProvider(<Wizard title={TITLE} visible={true} onClose={handleClose} headerAction={HEADER_ACTION} />);

    // ASSERT
    expect(screen.getByText(HEADER_ACTION)).toBeTruthy();
  });

  it('should render stepper', () => {
    // ARRANGE
    const handleClose = jest.fn();
    renderWithProvider(<Wizard title={TITLE} visible={true} onClose={handleClose} stepper={STEPPER} />);

    // ASSERT
    expect(screen.getByText(STEPPER)).toBeTruthy();
  });

  it('should render content', () => {
    // ARRANGE
    const handleClose = jest.fn();
    renderWithProvider(
      <Wizard title={TITLE} visible={true} onClose={handleClose}>
        {CONTENT}
      </Wizard>
    );

    // ASSERT
    expect(screen.getByText(CONTENT)).toBeTruthy();
  });

  it('should not render prev and next step buttons', () => {
    // ARRANGE
    const handleClose = jest.fn();
    renderWithProvider(
      <Wizard
        title={TITLE}
        visible={true}
        onClose={handleClose}
        texts={{ prevButtonLabel: BACK, nextButtonLabel: NEXT_STEP }}
      />
    );

    // ASSERT
    expect(screen.queryByText(BACK)).toBeFalsy();
    expect(screen.queryByText(NEXT_STEP)).toBeFalsy();
  });

  it('should call handleClose callback', () => {
    // ARRANGE
    const handleClose = jest.fn();
    renderWithProvider(<Wizard title={TITLE} visible={true} onClose={handleClose} />);

    // ACT
    userEvent.click(document.querySelector('.close-s') as HTMLElement);

    // ASSERT
    expect(handleClose).toBeCalled();
  });

  it('should call handlePrevStep and handleNextStep callback', () => {
    // ARRANGE
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
      />
    );

    // ACT
    userEvent.click(screen.getByText(BACK));
    userEvent.click(screen.getByText(NEXT_STEP));

    // ASSERT
    expect(handlePrevStep).toBeCalled();
    expect(handleNextStep).toBeCalled();
  });
});
