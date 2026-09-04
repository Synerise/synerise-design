import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent } from '@testing-library/react';

import FileUploader, { AvatarUploader, ItemUploader } from '../index';
import { toCssUrl } from '../AvatarUploader/FileViewAvatar/FileViewAvatar.util';

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

  const PREVIEW_THUMBNAIL_TESTID = 'file-preview-thumbnail';
  // Both glyph branches carry this, so the assertions need not know which of the two the
  // fixture's mime type would have taken.
  const MIME_GLYPH_TESTID = 'file-mime-glyph';

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
  //
  // The glyph assertion is the point of these: the shared fixture is image/png, which is a
  // previewable mime type, so the branch actually replaced is PreviewImage — asserting the
  // absence of PlaceholderImage would hold whether or not the feature works. Both branches render
  // an icon, so counting the row's svg is what separates them, and it needs no generated class
  // name to match on.
  it.each([
    ['FileUploader', FileUploader],
    ['ItemUploader', ItemUploader],
    ['AvatarUploader', AvatarUploader],
  ])('should replace the mime-type glyph with the preview url in %s', (_name, Uploader) => {
    // ARRANGE
    const PREVIEW_URL = 'https://storage.example.com/origin/stored-icon.png';

    const { getByTestId, queryByTestId } = renderWithProvider(
      <Uploader
        mode="single"
        files={[{ file, previewUrl: PREVIEW_URL }]}
        accept={['image/*']}
        texts={defaultTexts}
      />,
    );

    // ASSERT
    expect(getByTestId(PREVIEW_THUMBNAIL_TESTID)).toHaveAttribute(
      'src',
      PREVIEW_URL,
    );
    expect(queryByTestId(MIME_GLYPH_TESTID)).toBeNull();
  });

  it.each([
    ['FileUploader', FileUploader],
    ['ItemUploader', ItemUploader],
    ['AvatarUploader', AvatarUploader],
  ])('should keep the mime-type glyph in %s without a preview url', (_name, Uploader) => {
    // ARRANGE
    const { queryByTestId } = renderWithProvider(
      <Uploader
        mode="single"
        files={[{ file }]}
        accept={['image/*']}
        texts={defaultTexts}
      />,
    );

    // ASSERT
    expect(queryByTestId(PREVIEW_THUMBNAIL_TESTID)).toBeNull();
    expect(queryByTestId(MIME_GLYPH_TESTID)).not.toBeNull();
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

  describe('toCssUrl', () => {
    // FileViewAvatar interpolates the source into a CSS url('…'), which used to be safe only
    // because it was always a locally created blob: url.
    it('should neutralise a value that would close the url() and inject declarations', () => {
      const escaped = toCssUrl("https://x/a');background:red;a('");

      expect(escaped).not.toContain("'");
      expect(escaped).not.toContain(')');
      expect(escaped).not.toContain('(');
    });

    // The first attempt used encodeURI, which escapes % and so double-encoded anything already
    // percent-escaped — the stories' data: uri rendered as a broken request.
    it('should leave an already percent-escaped url alone', () => {
      const dataUri = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22x%22%3E';

      expect(toCssUrl(dataUri)).toBe(dataUri.replace(/"/g, '%22'));
      expect(toCssUrl(dataUri)).not.toContain('%25');
    });

    it('should leave a blob url untouched', () => {
      const blobUrl = 'blob:https://portal.example.com/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';

      expect(toCssUrl(blobUrl)).toBe(blobUrl);
    });
  });
});
