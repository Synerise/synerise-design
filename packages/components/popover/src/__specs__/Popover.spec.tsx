import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Popover, PopoverContent, PopoverTrigger} from '../index';

const TRIGGER_LABEL = 'trigger'
const TRIGGER = <button>{TRIGGER_LABEL}</button>
const OVERLAY_CONTENT = 'the overlay';
const OVERLAY = <div>{OVERLAY_CONTENT}</div>

describe('Popover', () => {
    it('should render', () => {
        renderWithProvider(<Popover>
            <PopoverTrigger>
              {TRIGGER}
            </PopoverTrigger>
            <PopoverContent>{OVERLAY}</PopoverContent>
        </Popover>)
        
        expect(screen.getByText(TRIGGER_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(OVERLAY_CONTENT)).not.toBeInTheDocument();
    })
    it('should show overlay on click', async () => {
        renderWithProvider(<Popover>
            <PopoverTrigger>
              {TRIGGER}
            </PopoverTrigger>
            <PopoverContent>{OVERLAY}</PopoverContent>
        </Popover>)
        
        expect(screen.getByText(TRIGGER_LABEL)).toBeInTheDocument();
        userEvent.click(screen.getByText(TRIGGER_LABEL));
        await waitFor(() =>  expect(screen.getByText(OVERLAY_CONTENT)).toBeInTheDocument())
    })
    it('should show overlay on hover', async () => {
        renderWithProvider(<Popover trigger='hover'>
            <PopoverTrigger>
              {TRIGGER}
            </PopoverTrigger>
            <PopoverContent>{OVERLAY}</PopoverContent>
        </Popover>)
        
        expect(screen.getByText(TRIGGER_LABEL)).toBeInTheDocument();
        
        userEvent.hover(screen.getByRole('button'));
        await waitFor(() =>  expect(screen.getByText(OVERLAY_CONTENT)).toBeInTheDocument())
    })
})
