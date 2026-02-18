import React, { ReactElement, ReactNode, useRef, useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import type { InformationCardProps } from '@synerise/ds-information-card';
import InformationCard from '@synerise/ds-information-card';
import ListItem, { ListItemProps, ListWrapper } from '@synerise/ds-list-item';
import {
  focusWithArrowKeys,
  getPopupContainer,
  useOnClickOutside,
} from '@synerise/ds-utils';

import InformationCardMeta, {
  CompleteExample,
} from './InformationCard.stories';

export default {
  ...InformationCardMeta,
  title: 'Components/InformationCard/Tests',
  tags: ['visualtests'],
} as Meta<InformationCardProps>;

const renderMenuWithCard = (
  renderHoverTooltip: () => ReactElement,
  title: ReactNode,
) => {
  const data: ListItemProps[] = [
    {
      text: title,
      renderHoverTooltip: renderHoverTooltip,
    },
    {
      text: title,
      renderHoverTooltip: renderHoverTooltip,
    },
    {
      text: title,
      renderHoverTooltip: renderHoverTooltip,
    },
    {
      text: title,
      renderHoverTooltip: renderHoverTooltip,
    },
  ];
  return (
    <ListWrapper>
      {data.map((item) => (
        <ListItem {...item} />
      ))}
    </ListWrapper>
  );
};

export const WithMenu: StoryObj<InformationCardProps> = {
  render: (args) => {
    return renderMenuWithCard(() => <InformationCard {...args} />, 'List item');
  },
  args: {
    ...CompleteExample.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.hover(canvas.getAllByText('List item')[0]);
    await waitFor(() =>
      expect(canvas.getByTestId('information-card')).toBeVisible(),
    );
  },
};

export const WithDropdown: StoryObj<InformationCardProps> = {
  render: (args) => {
    const [dropdownVisible, setDropdownVisible] = useState(true);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => {
      setDropdownVisible(false);
    });

    return (
      <Dropdown
        overlayStyle={{ borderRadius: '3px' }}
        open={dropdownVisible}
        placement="bottomLeft"
        size={220}
        popoverProps={{ testId: 'infocard-story' }}
        overlay={
          <Dropdown.Wrapper
            data-popup-container
            onKeyDown={(e) => focusWithArrowKeys(e, 'ds-menu-item', () => {})}
            ref={ref}
          >
            <ListWrapper>
              {Array.from(Array(3)).map((_e, i) => (
                <ListItem
                  renderHoverTooltip={() => (
                    <InformationCard
                      {...args}
                      descriptionConfig={{ onChange: fn() }}
                    />
                  )}
                  popoverProps={{
                    initialOpen: true,
                    getPopupContainer: getPopupContainer,
                  }}
                >
                  List item
                </ListItem>
              ))}
            </ListWrapper>
          </Dropdown.Wrapper>
        }
      >
        <Button
          onClick={() => setDropdownVisible(!dropdownVisible)}
          type="primary"
        >
          Dropdown
        </Button>
      </Dropdown>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);

    await canvas.findByTestId('popover-infocard-story-content');
    await userEvent.hover(canvas.getAllByText('List item')[0]);
    await waitFor(() =>
      expect(canvas.getByTestId('information-card')).toBeVisible(),
    );
  },
  args: {
    ...CompleteExample.args,
  },
};
