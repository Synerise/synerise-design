import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent } from "@testing-library/react";
import InlineEdit from '../';

const PLACEHOLDER = 'Placeholder';
const INPUT_VALUE = 'input value';
const INPUT_VALUE_CHANGED = 'input value changed';
const onChange = jest.fn();
const onEnterPress = jest.fn();
const onBlur = jest.fn();

const setup = ({
    disabled = false,
    maxLength,
    autoComplete,
    name = 'name-of-input',
    hideIcon,
  }: {
    disabled?: boolean,
    maxLength?: number,
    autoComplete?: string,
    name?: string
    hideIcon?: boolean
  }) => {
  const utils = renderWithProvider(
    <InlineEdit
      input={{
        name,
        value: INPUT_VALUE,
        onChange: e => onChange(e.target.value),
        onEnterPress: e => onEnterPress(e),
        onBlur: e => onBlur(e),
        maxLength: maxLength,
        placeholder: PLACEHOLDER,
        autoComplete: autoComplete,
      }}
      size={'normal'}
      error={false}
      disabled={disabled}
      hideIcon={hideIcon}
    />
  )
  const input = utils.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

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
    expect(onChange).toHaveBeenCalled();
    expect(input.value).toBe(INPUT_VALUE)
  });
  beforeEach(()=>{
    Element.prototype.scrollTo = jest.fn();
  })

  const names = ['is-input-name', 'test_input', 'is_input_name', 'is-input_test-name'];
  const ids = ['isInputName', 'testInput', 'isInputName', 'isInputTestName'];
  names.map((name: string, i: number) => {
    it(`should have id of string ${name} wrote by camelCase`, () => {
      // ARRANGE
      const { input } = setup({
        name
      });

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

  it('shoud hide icon', () => {
    // ARRANGE
    const { utils } = setup({
      hideIcon: true,
    });

    // ASSERT
    expect(utils.queryAllByTestId('inline-edit-icon').length).toBe(0);
  });

  it('should fire onEnterPress', () => {
    // ARRANGE
    const { input } = setup({});

    // ACT
    fireEvent.focus(input);
    fireEvent.keyPress(input, {key: 'Enter', keyCode: 13});

    // ASSERT
    expect(onEnterPress).toBeCalled();
  });

  it('should fire onBlur', () => {
    // ARRANGE
    const { input } = setup({});

    // ACT
    fireEvent.focus(input);
    fireEvent.blur(input);

    // ASSERT
    expect(onBlur).toBeCalled();
  });
});
