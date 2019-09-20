import * as React from 'react';
import { fireEvent, render } from "@testing-library/react";
import Tooltip from '../index';

describe('Tooltip', () => {
    const TITLE = 'Test';
    const TOOLTIP_CONTENT = 'Test content';

    it('should render', () => {
        // ARRANGE
        const { getByText } = render(<Tooltip visible title={TITLE} />);

        // ASSERT
        expect(getByText(TOOLTIP_CONTENT)).toBeTruthy();
    });

    it('should render content', () => {
        // ARRANGE
        const { getByText } = render(<Tooltip visible title={TOOLTIP_CONTENT} />);

        // ASSERT
        expect(getByText(TOOLTIP_CONTENT)).toBeTruthy();
    });

    it('should trigger on click', () => {
        // ARRANGE
        const { getByText } = render(<Tooltip visible title={TOOLTIP_CONTENT} trigger="click" />);

        //ACT
        fireEvent.click(getByText(TOOLTIP_CONTENT));

        // ASSERT
        expect(getByText(TOOLTIP_CONTENT)).toBeTruthy();
    });

    it('should appear on mouseOver', () => {
        // ARRANGE
        const { getByText } = render(<Tooltip visible title={TOOLTIP_CONTENT} />);

        //ACT
        fireEvent.mouseOver(getByText(TOOLTIP_CONTENT));

        // ASSERT
        expect(getByText(TOOLTIP_CONTENT)).toHaveBeenCalled();
    });
});