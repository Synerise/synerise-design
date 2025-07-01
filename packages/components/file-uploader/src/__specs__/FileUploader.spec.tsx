import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent } from '@testing-library/react';

import FileUploader from '../index';

const defaultTexts = {
  buttonLabel: 'Upload a new file or drag one here',
  buttonDescription: '',
  size: 'Size:',
  uploading: 'Uploading...',
};

window.URL.createObjectURL = function () {
  return '';
};

describe('FileUploader', () => {
  const REMOVE_BUTTON_TESTID = 'fileview-remove';
  const file = new File(['foo'], 'hello from the other side.png', {
    type: 'image/png',
  });

  it('should render with drop area', () => {
    // ARRANGE
    const BUTTON_LABEL = 'UPLOAD NOW';

    const { getByText } = renderWithProvider(
      <FileUploader
        mode="single"
        files={[]}
        texts={{
          ...defaultTexts,
          buttonLabel: BUTTON_LABEL,
        }}
      />,
    );

    // ASSERT
    expect(getByText(BUTTON_LABEL)).toBeTruthy();
  });

  it('should render with tooltip', () => {
    // ARRANGE
    const TOOLTIP_TEST_ID = 'tooltip-info';

    const { getByTestId } = renderWithProvider(
      <FileUploader
        mode="multi-large"
        files={[]}
        texts={defaultTexts}
        label="Some label"
        tooltip="Some tooltip text"
      />,
    );

    // ASSERT
    expect(getByTestId(TOOLTIP_TEST_ID)).toBeTruthy();
  });

  it('should render with error', () => {
    // ARRANGE
    const ERROR_TEXT = 'CRAZY ERROR';

    const { getByText } = renderWithProvider(
      <FileUploader
        mode="single"
        files={[]}
        texts={defaultTexts}
        error={ERROR_TEXT}
      />,
    );

    // ASSERT
    expect(getByText(ERROR_TEXT)).toBeTruthy();
  });

  it('should not fire onUpload when disabled', () => {
    // ARRANGE
    const onUpload = jest.fn();

    const { getByTestId } = renderWithProvider(
      <FileUploader
        mode="single"
        files={[]}
        texts={defaultTexts}
        onUpload={onUpload}
        disabled
      />,
    );

    const dropAreaInput = getByTestId('droparea-input');
    Object.defineProperty(dropAreaInput, 'files', { value: [file] });

    // ACT
    fireEvent.change(dropAreaInput);

    // ASSERT
    expect(onUpload).not.toHaveBeenCalled();
  });

  it('should not show remove button if `removable` prop is false', () => {
    // ARRANGE
    const { queryByTestId } = renderWithProvider(
      <FileUploader
        mode="single"
        files={[{ file }]}
        texts={defaultTexts}
        removable={false}
      />,
    );

    // ASSERT
    expect(queryByTestId(REMOVE_BUTTON_TESTID)).toBeFalsy();
  });

  it('should not show remove button if file is disabled', () => {
    // ARRANGE
    const { queryByTestId } = renderWithProvider(
      <FileUploader
        mode="single"
        files={[{ file, disabled: true }]}
        texts={defaultTexts}
      />,
    );

    // ASSERT
    expect(queryByTestId(REMOVE_BUTTON_TESTID)).toBeFalsy();
  });

  it('should render individual file error', () => {
    // ARRANGE
    const ERROR_TEXT = 'SOME ERROR HAPPENED';

    const { getByText } = renderWithProvider(
      <FileUploader
        mode="single"
        files={[{ file, error: ERROR_TEXT }]}
        accept={['image/*']}
        texts={defaultTexts}
      />,
    );

    // ASSERT
    expect(getByText(ERROR_TEXT)).toBeTruthy();
  });
});
