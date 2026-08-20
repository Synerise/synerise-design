import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor, within } from '@testing-library/react';

import { VarTypeStringM } from '@synerise/ds-icon';
import {
    OVERLAY_Z_INDEX_STEP,
    renderWithProvider,
    sleep,
    theme,
} from '@synerise/ds-core';
import Modal from '@synerise/ds-modal';

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
        Element.prototype.scrollTo = vi.fn();
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
        const onChangeValue = vi.fn();
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



    describe('z-index when opened from inside another modal', () => {
        const MODAL_TOKEN = Number.parseInt(theme.variables['zindex-modal'], 10);
        const DROPDOWN_TOKEN = Number.parseInt(theme.variables['zindex-dropdown'], 10);

        const modalRootZIndexes = () =>
            Array.from(document.querySelectorAll<HTMLElement>('[data-testid="ds-modal"]')).map(
                root => Number(window.getComputedStyle(root).zIndex),
            );

        const openArrayModal = async () => {
            userEvent.click(screen.getByTestId('ds-factors-array'));
            await waitFor(() => {
                expect(modalRootZIndexes()).toHaveLength(2);
            });
        };

        test('should render above a plain host modal', async () => {
            renderWithProvider(
                <Modal open title="host">
                    {RENDER_FACTORS({ value: VALUE })}
                </Modal>,
            );

            await openArrayModal();

            const zIndexes = modalRootZIndexes();
            expect(zIndexes).toContain(MODAL_TOKEN);
            expect(zIndexes).toContain(MODAL_TOKEN + OVERLAY_Z_INDEX_STEP);
        });

        test('should render above a host modal that raised itself, reproducing the analytics chain', async () => {
            // new metric → "Profile filter" (991002) → "local aggregate" (991004)
            // → condition with the "In array" operator → this modal.
            renderWithProvider(
                <Modal open title="profile filter" zIndex={991002}>
                    <Modal open title="local aggregate" zIndex={991004}>
                        {RENDER_FACTORS({ value: VALUE })}
                    </Modal>
                </Modal>,
            );

            userEvent.click(screen.getByTestId('ds-factors-array'));
            await waitFor(() => {
                expect(modalRootZIndexes()).toHaveLength(3);
            });

            const zIndexes = modalRootZIndexes();
            expect(Math.max(...zIndexes)).toBe(991006);
            expect(zIndexes.filter(value => value === 991006)).toHaveLength(1);
        });

        test('should stay below zindex-dropdown so its own search and collector overlays stay usable', async () => {
            renderWithProvider(
                <Modal open title="host" zIndex={DROPDOWN_TOKEN - 4}>
                    {RENDER_FACTORS({ value: VALUE })}
                </Modal>,
            );

            await openArrayModal();

            modalRootZIndexes().forEach(value => {
                expect(value).toBeLessThan(DROPDOWN_TOKEN);
            });
        });
    });
});
