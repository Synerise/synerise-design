import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent } from '@testing-library/react';

import FileUploader, { AvatarUploader, ItemUploader } from '../index';

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
    const onUpload = vi.fn();

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

  it('should render file size by default', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FileUploader
        mode="single"
        files={[{ file }]}
        accept={['image/*']}
        texts={defaultTexts}
      />,
    );

    // ASSERT
    expect(getByText(/Size:/)).toBeTruthy();
  });

  it('should not render file size when hideSize is set', () => {
    // ARRANGE
    const { queryByText } = renderWithProvider(
      <FileUploader
        mode="single"
        files={[{ file }]}
        accept={['image/*']}
        texts={defaultTexts}
        hideSize
      />,
    );

    // ASSERT
    expect(queryByText(/Size:/)).toBeFalsy();
  });

  it('should render individual file error even when hideSize is set', () => {
    // ARRANGE
    const ERROR_TEXT = 'SOME ERROR HAPPENED';

    const { getByText } = renderWithProvider(
      <FileUploader
        mode="single"
        files={[{ file, error: ERROR_TEXT }]}
        accept={['image/*']}
        texts={defaultTexts}
        hideSize
      />,
    );

    // ASSERT
    expect(getByText(ERROR_TEXT)).toBeTruthy();
  });

  it('should render the preview url as the file thumbnail', () => {
    // ARRANGE
    const PREVIEW_URL = 'https://storage.example.com/origin/stored-icon.png';

    const { container } = renderWithProvider(
      <FileUploader
        mode="single"
        files={[{ file, previewUrl: PREVIEW_URL }]}
        accept={['image/*']}
        texts={defaultTexts}
      />,
    );

    // ASSERT
    expect(container.querySelector(`img[src="${PREVIEW_URL}"]`)).toBeTruthy();
  });

  it('should keep the mime-type glyph when no preview url is given', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <FileUploader
        mode="single"
        files={[{ file }]}
        accept={['image/*']}
        texts={defaultTexts}
      />,
    );

    // ASSERT
    expect(container.querySelector('img')).toBeFalsy();
  });

  // AvatarUploader paints the avatar from the url and renders a file row beside it; the row has
  // its own thumbnail branch, so covering the avatar alone left it showing the glyph.
  it.each([
    ['ItemUploader', ItemUploader],
    ['AvatarUploader', AvatarUploader],
  ])('should render the preview url as the thumbnail in %s', (_name, Uploader) => {
    // ARRANGE
    const PREVIEW_URL = 'https://storage.example.com/origin/stored-icon.png';

    const { container } = renderWithProvider(
      <Uploader
        mode="single"
        files={[{ file, previewUrl: PREVIEW_URL }]}
        accept={['image/*']}
        texts={defaultTexts}
      />,
    );

    // ASSERT
    expect(container.querySelector(`img[src="${PREVIEW_URL}"]`)).toBeTruthy();
    expect(container.querySelector('[class*="PlaceholderImage"]')).toBeFalsy();
  });

  it('should still show the file name next to the preview url thumbnail', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FileUploader
        mode="single"
        files={[
          { file, previewUrl: 'https://storage.example.com/origin/stored-icon.png' },
        ]}
        accept={['image/*']}
        texts={defaultTexts}
      />,
    );

    // ASSERT
    expect(getByText(file.name)).toBeTruthy();
  });
});
