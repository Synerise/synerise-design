import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, cleanup, screen } from '@testing-library/react';

import ColorPicker from '../ColorPicker';
import { ColorPickerProps } from '../ColorPicker.types';
import {
  convert3DigitHexTo6Digit,
  filterAlphanumeric,
  isValidHexColor,
  isValidTextColor,
} from '../utils';

afterEach(cleanup);

describe('ColorPicker', () => {
  let props: ColorPickerProps;
  beforeEach(() => {
    props = {
      value: '#ffffff',
      onChange: jest.fn(),
    };
  });

  it('should render correctly', () => {
    renderWithProvider(<ColorPicker {...props} />);
    const colorPicker = screen.getByTestId('color-picker');
    expect(colorPicker).toBeInTheDocument();
  });

  it('should render disabled', () => {
    renderWithProvider(<ColorPicker disabled {...props} />);
    const colorPicker = screen.getByTestId('color-picker');
    expect(colorPicker).toBeDisabled();
    fireEvent.click(colorPicker as HTMLElement);
    expect(document.querySelector('.react-colorful')).not.toBeInTheDocument()
  });

  it('should render readonly', () => {
    renderWithProvider(<ColorPicker readOnly {...props} />);
    const colorPicker = screen.getByTestId('color-picker');
    fireEvent.click(colorPicker as HTMLElement);
    expect(document.querySelector('.react-colorful')).not.toBeInTheDocument()
  });

  it('should open modal when component is clicked', () => {
    renderWithProvider(<ColorPicker {...props} />);
    const colorPicker = screen.getByTestId('color-picker');
    fireEvent.click(colorPicker as HTMLElement);
    const reactColorful = document.querySelector('.react-colorful');
    expect(reactColorful).toBeInTheDocument();
  });

  it('should render saved colors', async () => {
    props.isShownSavedColors = true;
    props.colors = ['#ffffff', '#ff0000', '#00ff00'];
    renderWithProvider(<ColorPicker {...props} />);
    const colorPicker = screen.getByTestId('color-picker');
    await fireEvent.click(colorPicker as HTMLElement);
    const savedColors = document.querySelectorAll('.ds-tags .ds-tag');
    expect(savedColors.length).toBe(3);
  });

  it('should call onChange function when color is changed', () => {
    renderWithProvider(<ColorPicker {...props} />);
    const colorPicker = screen.getByTestId('color-picker');
    fireEvent.change(colorPicker, { target: { value: '#ff0000' } });
    expect(props.onChange).toHaveBeenCalledWith('#ff0000');
  });

  it('should show an error message', () => {
    props.errorText = 'Invalid color';
    renderWithProvider(<ColorPicker {...props} />);
    const errorMessage = screen.getByText('Invalid color');
    expect(errorMessage).toBeInTheDocument();
  });
});

describe('convert3DigitHexTo6Digit', () => {
  it('converts 3 digit hex color to 6 digit hex color', () => {
    expect(convert3DigitHexTo6Digit('#123')).toBe('#112233');
    expect(convert3DigitHexTo6Digit('#4c6')).toBe('#44cc66');
  });

  it('returns the original hex color if it is already 6 digits', () => {
    expect(convert3DigitHexTo6Digit('#112233')).toBe('#112233');
    expect(convert3DigitHexTo6Digit('#44cc66')).toBe('#44cc66');
  });
});

describe('isValidTextColor', () => {
  it('returns true for valid text colors', () => {
    expect(isValidTextColor('red')).toBe(true);
    expect(isValidTextColor('whitesmoke')).toBe(true);
  });

  it('returns false for invalid text colors', () => {
    expect(isValidTextColor('gren')).toBe(false);
    expect(isValidTextColor('lack')).toBe(false);
  });
});

describe('isValidHexColor', () => {
  it('returns true for valid hex colors', () => {
    expect(isValidHexColor('#ff0000')).toBe(true);
    expect(isValidHexColor('#000')).toBe(true);
  });

  it('returns false for invalid hex colors', () => {
    expect(isValidHexColor('invalid-color')).toBe(false);
    expect(isValidHexColor('#ff0g00')).toBe(false);
    expect(isValidHexColor('#ff00')).toBe(false);
  });
});

describe('filterAlphanumeric', () => {
  it('filters out non-alphanumeric characters from the color value', () => {
    expect(filterAlphanumeric('abc123!@#$%^&*')).toBe('abc123');
    expect(filterAlphanumeric('   abc123  ')).toBe('abc123');
  });

  it('returns an empty string if the color value only contains non-alphanumeric characters', () => {
    expect(filterAlphanumeric('!@#$%^&*')).toBe('');
    expect(filterAlphanumeric('   ')).toBe('');
  });
});
