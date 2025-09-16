import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import userEvent from '@testing-library/user-event';

import Stepper from '../Stepper';

describe('Stepper component', () => {
  it('Should render with 3 steps', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Stepper>
        <Stepper.Step label="First step" stepNumber={1} />
        <Stepper.Step label="Second step" stepNumber={2} />
        <Stepper.Step label="Third step" stepNumber={3} />
      </Stepper>,
    );

    // ASSERT
    expect(getByText('First step')).toBeTruthy();
    expect(getByText('Second step')).toBeTruthy();
    expect(getByText('Third step')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });

  it('Should render with step content', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Stepper orientation="vertical">
        <Stepper.Step label="First step" stepNumber={1}>
          Step 1 content
        </Stepper.Step>
        <Stepper.Step label="Second step" stepNumber={2}>
          Step 2 content
        </Stepper.Step>
        <Stepper.Step label="Third step" stepNumber={3}>
          Step 3 content
        </Stepper.Step>
      </Stepper>,
    );

    // ASSERT
    expect(getByText('Step 1 content')).toBeTruthy();
    expect(getByText('Step 2 content')).toBeTruthy();
    expect(getByText('Step 3 content')).toBeTruthy();
  });

  it('Should render call onClick callback', () => {
    // ARRANGE
    const onClick = jest.fn();
    const { getByText } = renderWithProvider(
      <Stepper orientation="vertical">
        <Stepper.Step label="First step" stepNumber={1} onClick={onClick}>
          Step 1 content
        </Stepper.Step>
      </Stepper>,
    );

    // ACT
    userEvent.click(getByText('First step'));

    // ASSERT
    expect(onClick).toBeCalled();
  });

  it('Should render active step with tooltip icon', () => {
    // ARRANGE
    const onClick = jest.fn();
    const { container } = renderWithProvider(
      <Stepper orientation="vertical">
        <Stepper.Step
          label="First step"
          stepNumber={1}
          onClick={onClick}
          active
          tooltip={'Tooltip info'}
        >
          Step 1 content
        </Stepper.Step>
      </Stepper>,
    );

    // ASSERT
    expect(container.querySelector('.warning-fill-s')).toBeTruthy();
  });
});
