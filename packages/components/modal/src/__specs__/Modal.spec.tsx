import * as React from 'react';
import { fireEvent, render } from "@testing-library/react";
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
        const { getByText } = render(<Modal visible title={TITLE} />);

        // ASSERT
        expect(getByText(TITLE)).toBeTruthy();
    });

    it('content render', () => {
        // ARRANGE
        const { getByText } = render(<Modal visible >{MODAL_CONTENT}</Modal>);

        // ASSERT
        expect(getByText(MODAL_CONTENT)).toBeTruthy();
    });

    it('onCancel should be called', () => {
        // ARRANGE
        const { getByText } = render(<Modal visible onCancel={onCancel} cancelText={CANCEL_TEXT} />);

        // ACT
        fireEvent.click(getByText(CANCEL_TEXT));

        // ASSERT
        expect(onCancel).toHaveBeenCalled();
    });

    it('onOk should be called', () => {
        // ARRANGE
        const { getByText } = render(<Modal visible onOk={onOk} okText={OK_TEXT} />);

        // ACT
        fireEvent.click(getByText(OK_TEXT));

        // ASSERT
        expect(onOk).toHaveBeenCalled();
    });
});