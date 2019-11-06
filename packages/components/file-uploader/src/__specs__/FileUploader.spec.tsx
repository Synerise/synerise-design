import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent } from '@testing-library/react';
import FileUploader from '../index';
import { defaultTexts } from '../FileUploader';

describe('FileUploader', () => {
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
      />
    );

    // ASSERT
    expect(getByText(BUTTON_LABEL)).toBeTruthy();
  });

  it('should render with multi-large type and description', () => {
    // ARRANGE
    const BUTTON_LABEL = 'UPLOAD NOW';
    const BUTTON_DESC = 'OR DROP HERE';

    const { getByText } = renderWithProvider(
      <FileUploader
        mode="multi-large"
        files={[]}
        texts={{
          ...defaultTexts,
          buttonLabel: BUTTON_LABEL,
          buttonDescription: BUTTON_DESC,
        }}
      />
    );

    // ASSERT
    expect(getByText(BUTTON_LABEL)).toBeTruthy();
    expect(getByText(BUTTON_DESC)).toBeTruthy();
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
        infoTooltip="Some tooltip text"
      />
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
      />
    );

    // ASSERT
    expect(getByText(ERROR_TEXT)).toBeTruthy();
  });

  it('should not fire onUpload when disabled', () => {
    // ARRANGE
    const DROPAREA_TESTID = 'droparea';
    const onUpload = jest.fn();

    const file = new File(['foo'], 'hello from the other side.png', {
      type: 'image/png',
    });

    const { getByTestId } = renderWithProvider(
      <FileUploader
        mode="single"
        files={[]}
        texts={defaultTexts}
        onUpload={onUpload}
        disabled
      />
    );

    const dropAreaInput = getByTestId('droparea-input');
    Object.defineProperty(dropAreaInput, 'files', { value: [file] });

    // ACT
    fireEvent.change(dropAreaInput);

    // ASSERT
    expect(onUpload).not.toHaveBeenCalled();
  });
});
