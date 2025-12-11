import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import type { TabsProps } from '@synerise/ds-tabs';

import { fixedWrapper300 } from '../../utils';
import StoriesMeta, {
  TabsWithConfiguration,
  TabsWithConfigurationDisabled,
} from './Tabs.stories';

const WAIT_FOR_OPTIONS = {
  timeout: 2000,
};

export default {
  ...StoriesMeta,
  title: 'Components/Tabs/Tests',
  tags: ['visualtests'],
} as Meta<TabsProps>;

type Story = StoryObj<TabsProps>;

export const EmptyTabs: Story = {
  args: {
    tabs: [],
  },
};

export const EmptyTabsWithConfigurationOpen: Story = {
  args: {
    ...TabsWithConfiguration.args,
    configuration: {
      label: 'Manage tabs',
      action: fn(),
      disabled: false,
    },
    tabs: [],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(canvas.getByRole('button'));
    await waitFor(
      () =>
        expect(
          canvas.getByTestId('popover-tabs-hidden-content'),
        ).toBeInTheDocument(),
      WAIT_FOR_OPTIONS,
    );
    await waitFor(
      () =>
        expect(canvas.getByTestId('popover-tabs-hidden-content')).toBeVisible(),
      WAIT_FOR_OPTIONS,
    );

    const dropdown = within(canvas.getByTestId('popover-tabs-hidden-content'));
    const label = args.configuration?.label || 'Manage tabs';
    await waitFor(
      () =>
        expect(dropdown.getByText(label)).not.toHaveStyle({
          pointerEvents: 'none',
        }),
      WAIT_FOR_OPTIONS,
    );
  },
};

export const TabsWithConfigurationOpen: Story = {
  ...TabsWithConfiguration,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(canvas.getByTestId('tabs-dropdown-trigger'));
    await waitFor(
      () =>
        expect(
          canvas.getByTestId('popover-tabs-hidden-content'),
        ).toBeInTheDocument(),
      WAIT_FOR_OPTIONS,
    );
    await waitFor(
      () =>
        expect(canvas.getByTestId('popover-tabs-hidden-content')).toBeVisible(),
      WAIT_FOR_OPTIONS,
    );

    const dropdown = within(canvas.getByTestId('popover-tabs-hidden-content'));
    const label = args.configuration?.label || 'Manage tabs';
    await waitFor(
      () =>
        expect(dropdown.getByText(label)).not.toHaveStyle({
          pointerEvents: 'none',
        }),
      WAIT_FOR_OPTIONS,
    );
  },
};

export const TabsWithConfigurationDisabledAndHiddenTabsOpen: Story = {
  ...TabsWithConfigurationDisabled,
  decorators: [fixedWrapper300],
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('Wait for hidden tabs to render', async () => {
      await waitFor(() =>
        expect(canvas.getByTestId('ds-tabs-hidden-helper')).toBeInTheDocument(),
      );
      const hiddenTabsWrapper = within(
        canvas.getByTestId('ds-tabs-hidden-helper'),
      );
      await waitFor(() =>
        expect(hiddenTabsWrapper.getAllByTestId('tab-container')).toHaveLength(
          args.tabs.length,
        ),
      );
    });

    await step('Wait for visible tabs to render', async () => {
      await waitFor(() =>
        expect(canvas.getByTestId('tabs-container')).toBeInTheDocument(),
      );
      const visibleTabsWrapper = within(canvas.getByTestId('tabs-container'));
      await waitFor(() =>
        expect(visibleTabsWrapper.getAllByTestId('tab-container')).toHaveLength(
          2,
        ),
      );
    });

    await step('Open dropdown', async () => {
      await userEvent.click(canvas.getByTestId('tabs-dropdown-trigger'));
      await waitFor(
        () =>
          expect(
            canvas.getByTestId('popover-tabs-hidden-content'),
          ).toBeInTheDocument(),
        WAIT_FOR_OPTIONS,
      );
      await waitFor(
        () =>
          expect(
            canvas.getByTestId('popover-tabs-hidden-content'),
          ).toBeVisible(),
        WAIT_FOR_OPTIONS,
      );
    });

    const dropdown = within(canvas.getByTestId('popover-tabs-hidden-content'));
    const label = args.configuration?.label || 'Manage tabs';
    await waitFor(
      () => expect(dropdown.getByText(label)).toBeInTheDocument(),
      WAIT_FOR_OPTIONS,
    );
  },
};

export const TabsWithConfigurationAndHiddenTabsOpen: Story = {
  ...TabsWithConfiguration,
  decorators: [fixedWrapper300],
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('Wait for hidden tabs to render', async () => {
      await waitFor(() =>
        expect(canvas.getByTestId('ds-tabs-hidden-helper')).toBeInTheDocument(),
      );
      const hiddenTabsWrapper = within(
        canvas.getByTestId('ds-tabs-hidden-helper'),
      );
      await waitFor(() =>
        expect(hiddenTabsWrapper.getAllByTestId('tab-container')).toHaveLength(
          args.tabs.length,
        ),
      );
    });

    await step('Wait for visible tabs to render', async () => {
      await waitFor(() =>
        expect(canvas.getByTestId('tabs-container')).toBeInTheDocument(),
      );
      const visibleTabsWrapper = within(canvas.getByTestId('tabs-container'));
      await waitFor(() =>
        expect(visibleTabsWrapper.getAllByTestId('tab-container')).toHaveLength(
          2,
        ),
      );
    });

    await userEvent.click(canvas.getByTestId('tabs-dropdown-trigger'));

    await waitFor(
      () =>
        expect(
          canvas.getByTestId('popover-tabs-hidden-content'),
        ).toBeInTheDocument(),
      WAIT_FOR_OPTIONS,
    );
    await waitFor(
      () =>
        expect(canvas.getByTestId('popover-tabs-hidden-content')).toBeVisible(),
      WAIT_FOR_OPTIONS,
    );
    const dropdown = within(canvas.getByTestId('popover-tabs-hidden-content'));
    const label = args.configuration?.label || 'Manage tabs';
    await waitFor(
      () =>
        expect(dropdown.getByText(label)).not.toHaveStyle({
          pointerEvents: 'none',
        }),
      WAIT_FOR_OPTIONS,
    );
  },
};

export const TabsDropdownHideAfterConfigurationClick: Story = {
  args: {
    handleTabClick: fn(),
    configuration: {
      label: 'Manage tabs',
      action: fn(),
      disabled: false,
    },
  },
  decorators: [fixedWrapper300],
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('Wait for hidden tabs to render', async () => {
      await waitFor(() =>
        expect(canvas.getByTestId('ds-tabs-hidden-helper')).toBeInTheDocument(),
      );
      const hiddenTabsWrapper = within(
        canvas.getByTestId('ds-tabs-hidden-helper'),
      );
      await waitFor(() =>
        expect(hiddenTabsWrapper.getAllByTestId('tab-container')).toHaveLength(
          args.tabs.length,
        ),
      );
    });

    await step('Wait for visible tabs to render', async () => {
      await waitFor(() =>
        expect(canvas.getByTestId('tabs-container')).toBeInTheDocument(),
      );
      const visibleTabsWrapper = within(canvas.getByTestId('tabs-container'));
      await waitFor(() =>
        expect(visibleTabsWrapper.getAllByTestId('tab-container')).toHaveLength(
          2,
        ),
      );
    });

    await step('Open dropdown', async () => {
      await userEvent.click(canvas.getByTestId('tabs-dropdown-trigger'));
      await waitFor(
        () =>
          expect(
            canvas.getByTestId('popover-tabs-hidden-content'),
          ).toBeInTheDocument(),
        WAIT_FOR_OPTIONS,
      );
      await waitFor(
        () =>
          expect(
            canvas.getByTestId('popover-tabs-hidden-content'),
          ).toBeVisible(),
        WAIT_FOR_OPTIONS,
      );
    });

    await step('Click configuration item', async () => {
      const dropdown = within(
        canvas.getByTestId('popover-tabs-hidden-content'),
      );
      const label = args.configuration?.label || 'Manage tabs';
      await waitFor(() =>
        expect(dropdown.getByText(label)).not.toHaveStyle({
          pointerEvents: 'none',
        }),
      );
      await userEvent.click(dropdown.getByText(label));
    });

    expect(args.handleTabClick).not.toHaveBeenCalled();
    expect(args.configuration?.action).toHaveBeenCalled();
    await waitFor(
      async () =>
        expect(
          canvas.queryByTestId('popover-tabs-hidden-content'),
        ).not.toBeInTheDocument(),
      WAIT_FOR_OPTIONS,
    );
  },
};

export const TabsDropdownHideAfterHiddenTabClick: Story = {
  ...TabsWithConfiguration,
  decorators: [fixedWrapper300],
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('Wait for hidden tabs to render', async () => {
      await waitFor(() =>
        expect(canvas.getByTestId('ds-tabs-hidden-helper')).toBeInTheDocument(),
      );
      const hiddenTabsWrapper = within(
        canvas.getByTestId('ds-tabs-hidden-helper'),
      );
      await waitFor(() =>
        expect(hiddenTabsWrapper.getAllByTestId('tab-container')).toHaveLength(
          args.tabs.length,
        ),
      );
    });

    await step('Wait for visible tabs to render', async () => {
      await waitFor(() =>
        expect(canvas.getByTestId('tabs-container')).toBeInTheDocument(),
      );
      const visibleTabsWrapper = within(canvas.getByTestId('tabs-container'));
      await waitFor(() =>
        expect(visibleTabsWrapper.getAllByTestId('tab-container')).toHaveLength(
          2,
        ),
      );
    });

    await step('Open dropdown', async () => {
      await userEvent.click(canvas.getByTestId('tabs-dropdown-trigger'));
      await waitFor(
        () =>
          expect(
            canvas.getByTestId('popover-tabs-hidden-content'),
          ).toBeInTheDocument(),
        WAIT_FOR_OPTIONS,
      );
      await waitFor(
        () =>
          expect(
            canvas.getByTestId('popover-tabs-hidden-content'),
          ).toBeVisible(),
        WAIT_FOR_OPTIONS,
      );
    });
    await step('Click hidden tab item', async () => {
      const dropdown = within(
        canvas.getByTestId('popover-tabs-hidden-content'),
      );

      await waitFor(
        () =>
          expect(dropdown.getAllByRole('menuitem')[0]).not.toHaveStyle({
            pointerEvents: 'none',
          }),
        WAIT_FOR_OPTIONS,
      );
      await userEvent.click(dropdown.getAllByRole('menuitem')[0]);
    });

    expect(args.handleTabClick).toHaveBeenCalled();
    await waitFor(
      async () =>
        expect(
          canvas.queryByTestId('popover-tabs-hidden-content'),
        ).not.toBeInTheDocument(),
      WAIT_FOR_OPTIONS,
    );
  },
};
