import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor, within } from '@testing-library/react';

import { VarTypeStringM } from '@synerise/ds-icon';
import { renderWithProvider, sleep } from '@synerise/ds-utils';

import Factors from './../Factors';
import { type FactorsProps } from '../Factors.types';
import { FACTORS_GROUPS, FACTORS_ITEMS, FACTORS_TEXTS } from './data/Factors.data';


const DEFAULT_PROPS: FactorsProps = {
    selectedFactorType: 'array',
    setSelectedFactorType: () => { },
    value: '',
    onChangeValue: () => { },
    textType: 'default',
    defaultFactorType: 'text',
    autocompleteText: {
        options: ['First name', 'Last name', 'City'],
    },
    availableFactorTypes: ['array'],
    parameters: {
        buttonLabel: 'Parameter',
        buttonIcon: <VarTypeStringM />,
        groups: FACTORS_GROUPS,
        items: FACTORS_ITEMS,
    },
    withoutTypeSelector: true,
    texts: FACTORS_TEXTS,
};


const RENDER_FACTORS = (props = {}) => <Factors {...DEFAULT_PROPS} {...props} />;

const VALUE = ['item1', 'item2'];

describe('Factors array component', () => {
    beforeEach(() => {
        Element.prototype.scrollTo = jest.fn();
    });

    test('Should render with value', () => {
        renderWithProvider(RENDER_FACTORS({ value: VALUE }));

        expect(screen.getByText(VALUE.join(', '))).toBeInTheDocument();
    });

    test('should show modal', async () => {
        renderWithProvider(RENDER_FACTORS({ value: VALUE }));

        userEvent.click(screen.getByText(VALUE.join(', ')));

        const modal = await screen.findByRole('dialog');

        await waitFor(() => {
            VALUE.forEach(val => expect(within(modal).getByDisplayValue(val)).toBeInTheDocument());
        });
    });

    test('should search in modal', async () => {
        renderWithProvider(RENDER_FACTORS({ value: VALUE }));

        userEvent.click(screen.getByText(VALUE.join(', ')));

        const modal = await screen.findByRole('dialog');

        userEvent.click(await screen.findByTestId('ds-icon-search-m'))

        userEvent.type(await screen.findByPlaceholderText('Search'), '2');

        await waitFor(() => {
            expect(within(modal).getByDisplayValue('item2')).toBeInTheDocument()
            expect(within(modal).queryByDisplayValue('item1')).not.toBeInTheDocument()
        });
    });

    test('should show limit', async () => {
        const LIMIT = 3
        renderWithProvider(RENDER_FACTORS({ value: VALUE, arrayProps: { limit: LIMIT } }));

        userEvent.click(screen.getByText(VALUE.join(', ')));

        const modal = await screen.findByRole('dialog');

        await waitFor(() => {
            expect(within(modal).getByText('Limit')).toBeInTheDocument()
            expect(within(modal).getByText(`${VALUE.length}/${LIMIT}`)).toBeInTheDocument()
        });
    });

    test('should show limit reached message', async () => {
        const LIMIT = 2
        renderWithProvider(RENDER_FACTORS({ value: VALUE, arrayProps: { limit: LIMIT } }));

        userEvent.click(screen.getByText(VALUE.join(', ')));

        const modal = await screen.findByRole('dialog');

        await waitFor(() => {
            expect(within(modal).getByText('Limit has been reached')).toBeInTheDocument()
        });
    });

    test.skip('should add multiple items', async () => {
        const LIMIT = 10
        const onChangeValue = jest.fn();
        const NEW_ITEMS = ['item3', 'item4', 'item5', 'item6', 'item7'];
        renderWithProvider(RENDER_FACTORS({ value: VALUE, onChangeValue, arrayProps: { limit: LIMIT } }));

        userEvent.click(screen.getByText(VALUE.join(', ')));

        const modal = within(await screen.findByRole('dialog'));
        await Promise.all(NEW_ITEMS.map(async item => {
            await userEvent.type(await modal.findByTestId('ds-collector-input'), `${item},`, { delay: 100 })
            await sleep(100);
        }))

        await sleep(500);
        userEvent.click(screen.getByText('Add'));
        await sleep(500);

        await waitFor(() => {
            expect(modal.getAllByTestId('input-autosize-input')).toHaveLength(7)
        });
        userEvent.click(screen.getByText('Apply'));
        await waitFor(() => expect(onChangeValue).toHaveBeenCalledWith([...VALUE, ...NEW_ITEMS]));
    });


});
