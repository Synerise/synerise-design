import React from 'react';

import { declarationsFor, renderWithProvider } from '@synerise/ds-core/testing';
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
    const onClick = vi.fn();
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
    const onClick = vi.fn();
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

describe('Stepper step token usage', () => {
  // An Icon's `color` prop styles the svg through its container (`.ds-icon svg`).
  const iconSvgDeclarations = (icon: Element | null | undefined) =>
    declarationsFor(icon?.querySelector('svg') ?? null, { within: icon });

  it('colours the active step number with the circle content token', () => {
    const { getByText } = renderWithProvider(
      <Stepper>
        <Stepper.Step label="First step" stepNumber={1} active />
      </Stepper>,
    );

    expect(declarationsFor(getByText('1'))).toContain(
      '--ds-stepper-step-circle-content-active',
    );
  });

  it('colours the validated step number with the circle content token', () => {
    const { getByText } = renderWithProvider(
      <Stepper>
        <Stepper.Step label="First step" stepNumber={1} validated />
      </Stepper>,
    );

    expect(declarationsFor(getByText('1'))).toContain(
      '--ds-stepper-step-circle-content-validation',
    );
  });

  it('colours the done check icon with the circle content token', () => {
    const { container } = renderWithProvider(
      <Stepper>
        <Stepper.Step label="First step" stepNumber={1} done />
      </Stepper>,
    );

    const declarations = iconSvgDeclarations(container.querySelector('.ds-icon'));
    expect(declarations).toContain('--ds-stepper-step-circle-content-done');
    expect(declarations).not.toContain('--ds-stepper-step-circle-border-done');
  });

  it('colours the done check icon in warning with the circle content token', () => {
    const { container } = renderWithProvider(
      <Stepper>
        <Stepper.Step label="First step" stepNumber={1} done warning />
      </Stepper>,
    );

    expect(iconSvgDeclarations(container.querySelector('.ds-icon'))).toContain(
      '--ds-stepper-step-circle-content-warning',
    );
  });

  it('colours the tooltip warning icon with the label token', () => {
    const { container } = renderWithProvider(
      <Stepper>
        <Stepper.Step
          label="First step"
          stepNumber={1}
          active
          tooltip="Tooltip info"
        />
      </Stepper>,
    );

    const icon = container.querySelector('.warning-fill-s')?.closest('.ds-icon');
    expect(iconSvgDeclarations(icon)).toContain(
      '--ds-stepper-step-label-warning',
    );
  });
});
