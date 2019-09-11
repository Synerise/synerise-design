import * as React from 'react';
import { fireEvent, render } from "@testing-library/react";
import Modal from '../index';

describe('Modal', () => {
    const TITLE = 'Test';
    const CANCEL_TEXT = 'CANCEL';

    const onCancel = jest.fn();

    it('should render', () => {
        // ARRANGE
        const { getByText } = render(<Modal visible={true} title={TITLE} />);

        // ASSERT
        getByText(TITLE);
    });

    it('onCancel should be called', () => {

        // ARRANGE
        const {getByText} = render(<Modal visible={true} onCancel={onCancel} />);

        // ACT
        fireEvent.click(getByText(CANCEL_TEXT));

        // ASSERT
        expect(onCancel).toHaveBeenCalled();
    });

});

