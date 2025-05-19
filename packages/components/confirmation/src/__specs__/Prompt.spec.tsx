import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import userEvent from '@testing-library/user-event';


import { Prompt } from '../index';
import { COLOR_TEST_CASES, PROPS } from './testData';


const TITLE = 'prompt title';
describe('Prompt component', () => {
    it('Should render', async () => {
        renderWithProvider(
            <Prompt title={TITLE} type='negative' open />
        );

        expect(await screen.findByText(TITLE)).toBeInTheDocument();
    });

    it.each(COLOR_TEST_CASES)('Should render correct color', async ({ type, color }) => {
        renderWithProvider(
            <Prompt {...PROPS} type={type} open />
        );

        expect(await screen.findByTestId(PROPS.mainButtonProps['data-testid'])).toBeInTheDocument();
        expect(screen.getByTestId(PROPS.mainButtonProps['data-testid'])).toHaveStyle({ backgroundColor: color });

    });

    it('Should trigger onOk on main button click', async () => {
        const onOk = jest.fn()
        renderWithProvider(
            <Prompt {...PROPS} type='negative' open onOk={onOk} />
        );

        expect(await screen.findByTestId(PROPS.mainButtonProps['data-testid'])).toBeInTheDocument();
        userEvent.click(screen.getByTestId(PROPS.mainButtonProps['data-testid']));
        expect(onOk).toHaveBeenCalled()
    });

    it('Should trigger onCancel on secondary button click', async () => {
        const onCancel = jest.fn()
        renderWithProvider(
            <Prompt {...PROPS} type='negative' open onCancel={onCancel} />
        );

        expect(await screen.findByTestId(PROPS.secondaryButtonProps['data-testid'])).toBeInTheDocument();
        userEvent.click(screen.getByTestId(PROPS.secondaryButtonProps['data-testid']));
        expect(onCancel).toHaveBeenCalled()
    });
});