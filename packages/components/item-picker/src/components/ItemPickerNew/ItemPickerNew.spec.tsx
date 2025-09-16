import React from 'react';

import { screen, fireEvent } from '@testing-library/react';
import Icon, { LaptopM, MobileM, UserM } from '@synerise/ds-icon';
import { renderWithProvider } from '@synerise/ds-core';
import Avatar from '@synerise/ds-avatar';
import DSFlag from '@synerise/ds-flag';

import { ItemPickerNew } from './ItemPickerNew';

const imgSrc = 'https://www.w3schools.com/howto/img_avatar.png';

const DATA_SOURCE = [
    {
        text: 'iPhone R',
        prefixel: <Icon component={<MobileM />} />,
    },
    {
        text: 'iPhone X',
        prefixel: (
            <Avatar src={imgSrc} size="small">
                M
            </Avatar>
        ),
    },
    {
        text: 'MacBook Pro 15',
        prefixel: <DSFlag country="US" />,
    },
    {
        text: 'MacBook Air 13',
        prefixel: (
            <Avatar size="small" shape="square" backgroundColor="green">
                E
            </Avatar>
        ),
    },
    {
        text: 'Macbook Pro 15',
        prefixel: <Icon component={<LaptopM />} />,
    },
    {
        text: 'iPad Air 3',
    },
];

const SEARCH_PLACEHOLDER = 'Search';
const LABEL = 'Label';
const DESCRIPTION = 'Description';
const PLACEHOLDER = 'Set customer';
const REMOVE = 'Remove';
const ERROR_MESSAGE = 'Error';
const CHANGE_BUTTON_LABEL = 'Change';
const CLEAR_TEST_ID = 'ds-icon-close-3-s';
const ANGLE_DOWN_TEST_ID = 'angle-icon';
const PREFIXEL_TEST_ID = 'value-prefixel';


const SHARED_PROPS = {
    items: DATA_SOURCE,
    isNewVersion: true as const,
    size: 'small' as const,
    placeholder: PLACEHOLDER,
    clear: REMOVE,
    texts: {
        yes: 'Yes',
        no: 'No',
        changeButtonLabel: CHANGE_BUTTON_LABEL,
        searchPlaceholder: SEARCH_PLACEHOLDER,
        clearConfirmTitle: 'Are you sure to remove this selection?',
    }
};

describe('ItemPickerNew component', () => {
    beforeEach(() => {
        Element.prototype.scrollTo = jest.fn();
    })
    it('should render with placeholder', async () => {
        const handleClear = jest.fn();
        const handleChange = jest.fn();

        renderWithProvider(<ItemPickerNew {...SHARED_PROPS} onClear={handleClear} onChange={handleChange} />);

        expect(screen.getByText(PLACEHOLDER)).toBeTruthy();
    });

    it('should render with placeholderIcon', async () => {
        const handleClear = jest.fn();
        const handleChange = jest.fn();

        renderWithProvider(
            <ItemPickerNew
                {...SHARED_PROPS}
                onClear={handleClear}
                onChange={handleChange}
                description={DESCRIPTION}
                placeholderIcon={<Icon component={<UserM />} />}
            />
        );

        expect(screen.getByTestId('ds-icon-user-m')).toBeTruthy();
    });

    it('should render with label', async () => {
        const handleClear = jest.fn();
        const handleChange = jest.fn();

        renderWithProvider(<ItemPickerNew {...SHARED_PROPS} onClear={handleClear} onChange={handleChange} label={LABEL} />);

        expect(screen.getByText(LABEL)).toBeTruthy();
    });

    it('should render with description', async () => {
        const handleClear = jest.fn();
        const handleChange = jest.fn();

        renderWithProvider(
            <ItemPickerNew {...SHARED_PROPS} onClear={handleClear} onChange={handleChange} description={DESCRIPTION} />
        );

        expect(screen.getByText(DESCRIPTION)).toBeTruthy();
    });

    it('should render with AngleDown icon', async () => {
        const handleClear = jest.fn();
        const handleChange = jest.fn();

        renderWithProvider(
            <ItemPickerNew {...SHARED_PROPS} onClear={handleClear} onChange={handleChange} description={DESCRIPTION} />
        );

        expect(screen.getByTestId(ANGLE_DOWN_TEST_ID)).toBeTruthy();
    });

    it('should render without AngleDown icon', async () => {
        const handleClear = jest.fn();
        const handleChange = jest.fn();

        renderWithProvider(
            <ItemPickerNew

                {...SHARED_PROPS}
                onClear={handleClear}
                onChange={handleChange}
                description={DESCRIPTION}
                triggerProps={{ size: "large" }}
            />
        );

        expect(screen.queryByTestId(ANGLE_DOWN_TEST_ID)).toBeFalsy();
    });

    it('should render with error', async () => {
        const handleClear = jest.fn();
        const handleChange = jest.fn();

        renderWithProvider(
            <ItemPickerNew
                {...SHARED_PROPS}
                onClear={handleClear}
                onChange={handleChange}
                description={DESCRIPTION}
                error
                errorText={ERROR_MESSAGE}
            />
        );

        expect(screen.getByText(ERROR_MESSAGE)).toBeTruthy();
    });

    it('should render as disabled', async () => {
        const handleClear = jest.fn();
        const handleChange = jest.fn();

        const { container } = renderWithProvider(
            <ItemPickerNew {...SHARED_PROPS} onClear={handleClear} onChange={handleChange} description={DESCRIPTION} disabled />
        );

        expect(container.querySelectorAll('[disabled]').length).toBe(2);
    });

    it('should render with selected item', async () => {
        const handleClear = jest.fn();
        const handleChange = jest.fn();

        renderWithProvider(
            <ItemPickerNew
                {...SHARED_PROPS}
                onClear={handleClear}
                onChange={handleChange}
                description={DESCRIPTION}
                selectedItem={DATA_SOURCE[0]}
            />
        );

        expect(screen.getByText(DATA_SOURCE[0].text)).toBeTruthy();
    });

    it('should render selected item with prefixel', async () => {
        const handleClear = jest.fn();
        const handleChange = jest.fn();

        renderWithProvider(
            <ItemPickerNew
                {...SHARED_PROPS}
                onClear={handleClear}
                onChange={handleChange}
                description={DESCRIPTION}
                selectedItem={DATA_SOURCE[0]}
            />
        );

        expect(screen.queryByTestId(PREFIXEL_TEST_ID)).toBeTruthy();
    });

    it('should render selected item without prefixel', async () => {
        const handleClear = jest.fn();
        const handleChange = jest.fn();

        renderWithProvider(
            <ItemPickerNew
                {...SHARED_PROPS}
                onClear={handleClear}
                onChange={handleChange}
                description={DESCRIPTION}
                selectedItem={DATA_SOURCE[5]}
            />
        );

        expect(screen.queryByTestId(PREFIXEL_TEST_ID)).toBeFalsy();
    });

    it('should render with clear icon', async () => {
        const handleClear = jest.fn();
        const handleChange = jest.fn();

        renderWithProvider(
            <ItemPickerNew
                {...SHARED_PROPS}
                onClear={handleClear}
                onChange={handleChange}
                selectedItem={DATA_SOURCE[0]}
            />
        );

        expect(screen.getByTestId(CLEAR_TEST_ID)).toBeTruthy();
    });

    it('should render without clear icon', async () => {
        const handleChange = jest.fn();

        renderWithProvider(
            <ItemPickerNew
                {...SHARED_PROPS}
                onChange={handleChange}
                description={DESCRIPTION}
                selectedItem={DATA_SOURCE[0]}
            />
        );

        expect(screen.queryByTestId(CLEAR_TEST_ID)).toBeFalsy();
    });

    it('should render without custom change button', async () => {
        const handleClear = jest.fn();
        const handleChange = jest.fn();

        renderWithProvider(
            <ItemPickerNew
                {...SHARED_PROPS}
                onClear={handleClear}
                onChange={handleChange}
                description={DESCRIPTION}
                selectedItem={DATA_SOURCE[0]}
                triggerProps={{ size: "large", withChangeButton: true, withClearConfirmation: true }}
            />
        );

        expect(screen.queryByTestId(CHANGE_BUTTON_LABEL)).toBeFalsy();
    });

    it('should render with custom change button', async () => {
        const handleClear = jest.fn();
        const handleChange = jest.fn();

        renderWithProvider(
            <ItemPickerNew
                {...SHARED_PROPS}
                onClear={handleClear}
                onChange={handleChange}
                description={DESCRIPTION}
                selectedItem={DATA_SOURCE[0]}
                triggerProps={{ size: "large", withChangeButton: true }}

            />
        );

        expect(screen.getByText(CHANGE_BUTTON_LABEL)).toBeTruthy();
    });

    it('should render without search bar', async () => {
        const handleClear = jest.fn();
        const handleChange = jest.fn();
        const { getByText } = renderWithProvider(
            <ItemPickerNew {...SHARED_PROPS} onClear={handleClear} onChange={handleChange} includeSearchBar={false} />
        );
        fireEvent.click(getByText(PLACEHOLDER));
        expect(screen.queryByPlaceholderText(SEARCH_PLACEHOLDER)).toBeFalsy();
    });

    it('should render with search bar', async () => {
        const handleClear = jest.fn();
        const handleChange = jest.fn();
        const { getByText } = renderWithProvider(
            <ItemPickerNew {...SHARED_PROPS} onClear={handleClear} onChange={handleChange} />
        );
        fireEvent.click(getByText(PLACEHOLDER));
        expect(screen.queryByPlaceholderText(SEARCH_PLACEHOLDER)).toBeTruthy();
    });
    it.todo('should call onYReachEnd function');
    it.todo('should shows loading state');
    it.todo('should highlight labels based on searchBarProps.value');
});
