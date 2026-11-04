import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor, within } from '@testing-library/react';

import { VarTypeStringM } from '@synerise/ds-icon';
import { OVERLAY_Z_INDEX_STEP, theme } from '@synerise/ds-core';
import { renderWithProvider, sleep } from '@synerise/ds-core/testing';
import Modal from '@synerise/ds-modal';

import Factors from './../Factors';
import { type FactorsProps } from '../Factors.types';
import { ArrayFactor, ArrayModal, type ArrayValue, useFactorsTexts } from '../index';
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



    test('should not render an empty state description by default', async () => {
        renderWithProvider(RENDER_FACTORS({ value: [] }));

        userEvent.click(screen.getByTestId('ds-factors-array'));

        const modal = within(await screen.findByRole('dialog'));
        expect(await modal.findByText('No items defined yet')).toBeInTheDocument();
        expect(modal.queryByTestId('empty-states-label')).not.toBeInTheDocument();
    });

    test('should render an empty state description passed in texts', async () => {
        renderWithProvider(
            RENDER_FACTORS({
                value: [],
                texts: { ...FACTORS_TEXTS, array: { emptyDescription: 'Paste or type values' } },
            }),
        );

        userEvent.click(screen.getByTestId('ds-factors-array'));

        const modal = within(await screen.findByRole('dialog'));
        expect(await modal.findByTestId('empty-states-label')).toHaveTextContent('Paste or type values');
    });

    describe('ArrayModal used without the inline trigger', () => {
        const StandaloneArrayModal = ({ onApply }: { onApply: (value: ArrayValue) => void }) => {
            const texts = useFactorsTexts({ array: { modalTitle: 'Edit list' } });
            return (
                <ArrayModal
                    visible
                    itemType="string"
                    value={VALUE}
                    texts={texts}
                    onApply={onApply}
                    onCancel={() => {}}
                />
            );
        };

        test('should apply its value', async () => {
            const onApply = vi.fn();
            renderWithProvider(<StandaloneArrayModal onApply={onApply} />);

            const modal = within(await screen.findByRole('dialog'));
            expect(modal.getByText('Edit list')).toBeInTheDocument();
            userEvent.click(modal.getByText('Apply'));

            await waitFor(() => expect(onApply).toHaveBeenCalledWith(VALUE));
        });
    });

    describe('ArrayFactor used without Factors', () => {
        test('should render the default trigger label', () => {
            renderWithProvider(<ArrayFactor onChange={() => {}} />);

            expect(screen.getByTestId('ds-factors-array')).toHaveTextContent('Define array');
        });

        test('should merge partial texts with the defaults', async () => {
            renderWithProvider(
                <ArrayFactor onChange={() => {}} texts={{ array: { triggerLabel: 'Add values' } }} />,
            );

            userEvent.click(screen.getByText('Add values'));

            const modal = within(await screen.findByRole('dialog'));
            expect(modal.getByText('Array')).toBeInTheDocument();
        });

        test('should open, apply and report the value', async () => {
            const onChange = vi.fn();
            const onActivate = vi.fn();
            renderWithProvider(<ArrayFactor value={VALUE} onChange={onChange} onActivate={onActivate} />);

            userEvent.click(screen.getByText(VALUE.join(', ')));
            const modal = within(await screen.findByRole('dialog'));
            expect(onActivate).toHaveBeenCalledOnce();
            userEvent.click(modal.getByText('Apply'));

            await waitFor(() => expect(onChange).toHaveBeenCalledWith(VALUE));
        });

        test('should report cancel without a change', async () => {
            const onChange = vi.fn();
            const onDeactivate = vi.fn();
            renderWithProvider(<ArrayFactor value={VALUE} onChange={onChange} onDeactivate={onDeactivate} />);

            userEvent.click(screen.getByText(VALUE.join(', ')));
            const modal = within(await screen.findByRole('dialog'));
            userEvent.click(modal.getByText('Cancel'));

            await waitFor(() => expect(onDeactivate).toHaveBeenCalledOnce());
            expect(onChange).not.toHaveBeenCalled();
        });
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
