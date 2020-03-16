import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent } from "@testing-library/react";
import Switch from '../index';

describe('Switch', () => {
  const LABEL_TEXT = 'label text';
  const BUTTON_TESTID = 'button-test-id';

  it('should render', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(<Switch label={LABEL_TEXT} data-testid={BUTTON_TESTID} />);

    // ASSERT
    expect(getByTestId(BUTTON_TESTID)).toBeTruthy();
  });

  it('should render label', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Switch label={LABEL_TEXT} />);

    // ASSERT
    expect(getByText(LABEL_TEXT)).toBeTruthy();
  });

  it('should render description', () => {
    // ARRANGE
    const DESCRIPTION_TEXT = 'Destription text';
    const { getByText } = renderWithProvider(<Switch label={LABEL_TEXT} description={DESCRIPTION_TEXT} />);

    // ASSERT
    expect(getByText(DESCRIPTION_TEXT)).toBeTruthy();
  });

  it('should handle error', () => {
    // ARRANGE
    const ERROR_TEXT = 'Error text';
    const { getByText, container } = renderWithProvider(<Switch label={LABEL_TEXT} errorText={ERROR_TEXT} />);

    // ASSERT
    expect(getByText(ERROR_TEXT)).toBeTruthy();
    expect(container.querySelector('button.error')).toBeTruthy();
  });

  it('should handle disable', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Switch label={LABEL_TEXT} disabled />);

    // ASSERT
    expect(container.getElementsByTagName('button')[0].hasAttribute('disabled')).toBeTruthy();
  });

  it('should handle state change', () => {
    // ARRANGE
    const onChange = jest.fn();
    const { getByTestId } = renderWithProvider(
      <Switch
        label={LABEL_TEXT}
        onChange={e => onChange(e)}
        data-testid={BUTTON_TESTID}
      />
    );

    // ACT
    fireEvent.click(getByTestId(BUTTON_TESTID));

    // ASSERT
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
