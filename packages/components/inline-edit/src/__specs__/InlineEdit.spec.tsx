import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent } from "@testing-library/react";
import InlineEdit from '../';

const PLACEHOLDER = 'Placeholder';
const INPUT_VALUE = 'input value';
const INPUT_VALUE_CHANGED = 'input value changed';
const onChange = jest.fn();

const setup = ({
    disabled = false, 
    maxLength,
    autoComplete,
    name = 'name-of-input'
  }: {
    disabled?: boolean,
    maxLength?: number,
    autoComplete?: string,
    name?: string
  }) => {
  const utils = renderWithProvider(
    <InlineEdit
      input={{
        name,
        value: INPUT_VALUE,
      }}
      onChange={e => onChange(e.target.value)}
      maxLength={maxLength}
      placeholder={PLACEHOLDER}
      size={'normal'}
      error={false}
      disabled={disabled}
      autoComplete={autoComplete}
    />
  )
  const input = utils.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement

  return {
    input,
    utils
  }
}

describe('InlineEdit', () => {

  it('should render', () => {
    // ARRANGE
    const { input } = setup({})

    // ASSERT
    expect(input).toBeTruthy()
  });

  
  it('should trigger onChange', () => {
    // ARRANGE
    const { input } = setup({})

    // ACT
    fireEvent.change(input, { target: { value: INPUT_VALUE_CHANGED } })
    
    // ASSERT
    expect(onChange).toHaveBeenCalled()
    expect(input.value).toBe(INPUT_VALUE)
  });

  const names = ['is-input-name', 'test_input', 'is_input_name', 'is-input_test-name'];
  const ids = ['isInputName', 'testInput', 'isInputName', 'isInputTestName'];
  names.map((name: string, i: number) => {
    it(`should have id of string ${name} wrote by camelCase`, () => {
      // ARRANGE
      const { input } = setup({
        name
      })
      
      // ASSERT
      expect(input.id).toBe(ids[i])
    });
  })
  
  it('should have name attribute', () => {
    // ARRANGE
    const { input } = setup({})
    
    // ASSERT
    expect(input.name).toBe('name-of-input')
  });

  it('should have disabled', () => {
    // ARRANGE
    const { input } = setup({
      disabled: true
    })
    
    // ASSERT
    expect(input).toBeDisabled()
  });

  it('should not have disabled', () => {
    // ARRANGE
    const { input } = setup({
      disabled: false
    })
    
    // ASSERT
    expect(input).not.toBeDisabled()
  });

  const maxLengths = [50, 100, 200];
  maxLengths.map((maxLength: number) => {
    it(`should have max-length ${maxLength}`, () => {
        // ARRANGE
        const { input } = setup({
          maxLength
        })

        // ASSERT
        expect(input).toHaveAttribute('maxlength', String(maxLength))
    });
  })

  const autoCompleteAttrs = ['off', 'on'];
  autoCompleteAttrs.map((autoComplete: string) => {
    it(`should autoComplete ${autoComplete}`, () => {
      // ARRANGE
      const { input } = setup({
        autoComplete
      })
      
      // ASSERT
      expect(input).toHaveAttribute('autoComplete', autoComplete)
    });
  })
  

  it('should have style', () => {
    // ARRANGE
    const { input } = setup({})
    
    // ASSERT
    expect(input).toHaveAttribute('style')
  });
});
