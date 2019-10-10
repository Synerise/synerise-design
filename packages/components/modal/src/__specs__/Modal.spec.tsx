import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils';
import Button from '@synerise/ds-button';
import Modal from '../index';

describe('Modal', () => {
  const TITLE = 'Test';
  const CANCEL_TEXT = 'CANCEL';
  const OK_TEXT = 'OK';
  const MODAL_CONTENT = 'Some content';

  const onCancel = jest.fn();
  const onOk = jest.fn();

  it('should render', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Modal visible title={TITLE} />);

    // ASSERT
    expect(getByText(TITLE)).toBeTruthy();
  });

  it('content render', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Modal visible >{MODAL_CONTENT}</Modal>);

    // ASSERT
    expect(getByText(MODAL_CONTENT)).toBeTruthy();
  });

  it('onCancel should be called', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Modal visible onCancel={onCancel} texts={{cancelButton: CANCEL_TEXT}} />);

    // ACT
    fireEvent.click(getByText(CANCEL_TEXT));

    // ASSERT
    expect(onCancel).toHaveBeenCalled();
  });

  it('onOk should be called', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Modal visible onOk={onOk} texts={{okButton: OK_TEXT}} />);

    // ACT
    fireEvent.click(getByText(OK_TEXT));

    // ASSERT
    expect(onOk).toHaveBeenCalled();
  });

  it('should render title & description', () => {
    // ARRANGE
    const TITLE = 'Modal title example';
    const DESCRIPTION = 'Modal description example';

    const { getByText } = renderWithProvider(
      <Modal
        title={TITLE}
        description={DESCRIPTION}
        visible
      >
        {MODAL_CONTENT}
      </Modal>
    );

    // ASSERT
    expect(getByText(TITLE)).toBeTruthy();
    expect(getByText(DESCRIPTION)).toBeTruthy();
  });

  it('should render headerActions', () => {
    // ARRANGE
    const HEADER_ACTION_BUTTON_TEST_ID = 'button-testid';

    const { getByText, getByTestId } = renderWithProvider(
      <Modal
        visible
        title="Modal title"
        headerActions={
          <Button data-testid={HEADER_ACTION_BUTTON_TEST_ID}>
            Additional Header Button
          </Button>
        }
      >
        {MODAL_CONTENT}
      </Modal>
    );

    // ASSERT
    expect(getByTestId(HEADER_ACTION_BUTTON_TEST_ID)).toBeTruthy();
  });
});
