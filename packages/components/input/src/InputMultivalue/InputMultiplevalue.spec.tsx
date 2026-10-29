import React from 'react';

import { declarationsFor, renderWithProvider } from '@synerise/ds-core/testing';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InputMultivalue } from '../index';

describe('Input', () => {
  const onChange = vi.fn();

  describe('Input multivalue', () => {
    it('should trigger onChange', async () => {
      const INPUT_VALUE = 'valueC';
      const values = ['valueA', 'valueB'];
      renderWithProvider(
        <InputMultivalue onChange={onChange} values={values} />,
      );
      const input = screen.getByTestId('input-multivalue') as HTMLInputElement;
      expect(input).toBeInTheDocument();

      await userEvent.type(input, INPUT_VALUE);
      fireEvent.keyDown(input, {
        key: 'Enter',
        keyCode: 13,
        which: 13,
      });

      expect(onChange).toBeCalledWith([...values, INPUT_VALUE]);
    });
  });
});

describe('InputMultivalue disabled', () => {
  it('styles the disabled field like Input, with no fade', () => {
    renderWithProvider(<InputMultivalue values={['valueA']} disabled />);

    const field = declarationsFor(screen.getByTestId('input-multivalue').parentElement);
    expect(field).toContain('color:var(--ds-form-field-text-disabled)');
    expect(field).toContain('background-color:var(--ds-form-field-bg-disabled)');
    expect(field).toContain('--ds-form-field-border-default');
  });

  // Every state's declarations of the value chip and its wrappers up to the field.
  const chipDeclarations = () => {
    let chip: Element | null = screen.getByText('valueA');
    let declarations = '';
    while (chip && !chip.querySelector('[data-testid="input-multivalue"]')) {
      declarations += declarationsFor(chip, { state: 'any' });
      chip = chip.parentElement;
    }
    return declarations;
  };

  it('keeps the chip disabled tokens on values and drops the hover background', () => {
    renderWithProvider(<InputMultivalue values={['valueA']} disabled />);

    const declarations = chipDeclarations();
    expect(declarations).toContain('color:var(--ds-form-chip-text-disabled)');
    expect(declarations).toContain('var(--ds-form-chip-bg-disabled)');
    expect(declarations).not.toContain('--ds-form-chip-bg-hover');
  });

  it('gives an enabled chip its hover background', () => {
    renderWithProvider(<InputMultivalue values={['valueA']} />);

    expect(chipDeclarations()).toContain('var(--ds-form-chip-bg-hover)');
  });
});

