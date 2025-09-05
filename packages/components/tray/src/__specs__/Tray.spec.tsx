import React, { type ReactNode } from 'react';
import { renderHook, screen, waitFor, within } from '@testing-library/react';

import Tray, { TrayProvider, useTray } from '../index';
import { DSProvider } from '@synerise/ds-core';

const TRAY1_ID = 'TRAY1_ID'
const TRAY2_ID = 'TRAY2_ID'
const TRAY1_TEST_ID = 'TRAY1_TEST_ID'
const TRAY2_TEST_ID = 'TRAY2_TEST_ID'

const TRAY1_DATA = {
    content: 'TEST_CONTENT',
    title: 'TEST_TITLE'
}
const TRAY2_DATA = {
    content: 'TEST_CONTENT2',
    title: 'TEST_TITLE2'
}

const Wrapper = ({ children }: {children?: ReactNode}) => {
    return (
        <DSProvider>
            <TrayProvider>
                {children}
                <Tray id={TRAY1_ID} data-testid={TRAY1_TEST_ID} />
                <Tray id={TRAY2_ID} data-testid={TRAY2_TEST_ID} />
            </TrayProvider>
        </DSProvider>
    )
}
describe('Tray', () => {

    it('should show tray', async () => {
        const { result } = renderHook(() => useTray(), {
            wrapper: Wrapper,
        });
        const { open } = result.current;
        open(TRAY1_ID, TRAY1_DATA)
        await screen.findByTestId(TRAY1_TEST_ID);

        expect(screen.getByText(TRAY1_DATA.content)).toBeInTheDocument();
        expect(screen.getByText(TRAY1_DATA.title)).toBeInTheDocument();
    });

    it('should render content in the correct tray', async () => {
        const { result } = renderHook(() => useTray(), {
            wrapper: Wrapper,
        });
        const { open } = result.current;
        open(TRAY1_ID, TRAY1_DATA)
        const tray1Container = await screen.findByTestId(TRAY1_TEST_ID);

        expect(within(tray1Container).getByText(TRAY1_DATA.content)).toBeInTheDocument();
        expect(within(tray1Container).getByText(TRAY1_DATA.title)).toBeInTheDocument();
        
        open(TRAY2_ID, TRAY2_DATA)
        const tray2Container = await screen.findByTestId(TRAY2_TEST_ID);

        expect(within(tray2Container).getByText(TRAY2_DATA.content)).toBeInTheDocument();
        expect(within(tray2Container).getByText(TRAY2_DATA.title)).toBeInTheDocument();
    })

    it('should hide tray', async () => {
        const { result } = renderHook(() => useTray(), {
            wrapper: Wrapper,
        });
        const { open, close } = result.current;
        open(TRAY1_ID, TRAY1_DATA)
        const tray1Container = await screen.findByTestId(TRAY1_TEST_ID);

        expect(within(tray1Container).getByText(TRAY1_DATA.content)).toBeInTheDocument();
        expect(within(tray1Container).getByText(TRAY1_DATA.title)).toBeInTheDocument();

        close(TRAY1_ID);

        await waitFor(() => {
            expect(screen.queryByText(TRAY1_DATA.content)).not.toBeInTheDocument();
            expect(screen.queryByText(TRAY1_DATA.title)).not.toBeInTheDocument();
        })

    })
});
