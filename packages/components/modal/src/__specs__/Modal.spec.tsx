import * as React from 'react';
import { fireEvent, render } from "@testing-library/react";
import Modal from '../index';

describe('Modal', () => {
    const TITLE = 'Test';

    it('should render', () => {
        const { getByText } = render(<Modal title={TITLE} />);
        getByText(TITLE);
    });
});

