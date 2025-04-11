import { userEvent, waitFor, expect, within } from '@storybook/test';



import ItemPickerMeta, { RelativeHeight, Story } from './ItemPicker.stories'

export default {
    ...ItemPickerMeta,
    title: 'Components/Pickers/ItemPicker/ItemPicker/Tests',
    tags: ['visualtests'],

}
export const RelativeHeightSmall: Story = {
    ...RelativeHeight,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement.parentElement!);
        await userEvent.click(canvas.getByText('5 items'));
        await canvas.findByPlaceholderText('Search');
        const dropdown1 = within(canvas.getByTestId('ds-item-picker-dropdown'));
        await waitFor(() => expect(dropdown1.getAllByRole('menuitem')).toHaveLength(5));
    },
};
export const RelativeHeightMedium: Story = {
    ...RelativeHeight,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement.parentElement!);
        await userEvent.click(canvas.getByText('10 items'));
        await canvas.findByPlaceholderText('Search');
        const dropdown1 = within(canvas.getByTestId('ds-item-picker-dropdown'));
        await waitFor(() => expect(dropdown1.getAllByRole('menuitem')).toHaveLength(10));
    },
};
export const RelativeHeightLarge: Story = {
    ...RelativeHeight,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement.parentElement!);
        await userEvent.click(canvas.getByText('16 items'));
        await canvas.findByPlaceholderText('Search');
        const dropdown1 = within(canvas.getByTestId('ds-item-picker-dropdown'));
        await waitFor(() => expect(dropdown1.getAllByRole('menuitem')).toHaveLength(16));
    },
};