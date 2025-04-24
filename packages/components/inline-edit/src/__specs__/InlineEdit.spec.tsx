import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
  disabled?: boolean;
  maxLength?: number;
  autoComplete?: string;
  name?: string;
  hideIcon?: boolean;
}) => {
  renderWithProvider(
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
  );
  const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

  return {
    input,
  };
};

describe('InlineEdit', () => {
  it('should render', () => {
    const { input } = setup({});

    expect(input).toBeTruthy();
  });

  it('should trigger onChange', async () => {
    const { input } = setup({});
    userEvent.type(input, INPUT_VALUE_CHANGED, { allAtOnce: true});
    await waitFor(() => expect(onChange).toHaveBeenCalled());
  });
  beforeEach(() => {
    Element.prototype.scrollTo = jest.fn();
  });

  const names = ['is-input-name', 'test_input', 'is_input_name', 'is-input_test-name'];
  const ids = ['isInputName', 'testInput', 'isInputName', 'isInputTestName'];
  names.map((name: string, i: number) => {
    it(`should have id of string ${name} wrote by camelCase`, () => {
      const { input } = setup({
        name,
      });

      expect(input.id).toBe(ids[i]);
    });
  });

  it('should have name attribute', () => {
    const { input } = setup({});

    expect(input.name).toBe('name-of-input');
  });

  it('should have disabled', () => {
    const { input } = setup({
      disabled: true,
    });

    expect(input).toBeDisabled();
  });

  it('should not have disabled', () => {
    const { input } = setup({
      disabled: false,
    });

    expect(input).not.toBeDisabled();
  });

  const maxLengths = [50, 100, 200];
  maxLengths.map((maxLength: number) => {
    it(`should have max-length ${maxLength}`, () => {
      const { input } = setup({
        maxLength,
      });

      expect(input).toHaveAttribute('maxlength', String(maxLength));
    });
  });

  const autoCompleteAttrs = ['off', 'on'];
  autoCompleteAttrs.map((autoComplete: string) => {
    it(`should autoComplete ${autoComplete}`, () => {
      const { input } = setup({
        autoComplete,
      });

      expect(input).toHaveAttribute('autoComplete', autoComplete);
    });
  });

  it('should have style', () => {
    const { input } = setup({});

    expect(input).toHaveAttribute('style');
  });

  it('should hide icon', () => {
    setup({
      hideIcon: true,
    });

    expect(screen.queryAllByTestId('inline-edit-icon').length).toBe(0);
  });

  it('should fire onEnterPress', async () => {
    const { input } = setup({});

    fireEvent.focus(input);
    fireEvent.keyPress(input, { key: 'Enter', keyCode: 13 });

    await waitFor(() => expect(onEnterPress).toBeCalled(), { timeout: 500 });
  });

  it('should fire onBlur', async () => {
    const { input } = setup({});

    fireEvent.focus(input);
    fireEvent.blur(input);
    await waitFor(() => expect(onBlur).toBeCalled(), { timeout: 500 });
  });
});
