import React, { useCallback, useRef, useState } from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import type { InformationCardProps } from '@synerise/ds-information-card';
import InformationCard from '@synerise/ds-information-card';
import Menu, { MenuItemProps } from '@synerise/ds-menu';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';

import InformationCardMeta, {
  CompleteExample,
} from './InformationCard.stories';

export default {
  ...InformationCardMeta,
  title: 'Components/InformationCard/Tests',
  tags: ['visualtests'],
} as Meta<InformationCardProps>;

const renderMenuWithCard = (renderHoverTooltip, title) => {
  const data: MenuItemProps[] = [
    {
      text: title,
      hoverTooltipProps: {
        defaultPopupVisible: true,
      },
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
    <Menu
      dataSource={data}
      asDropdownMenu={true}
      style={{ width: '100%' }}
      showTextTooltip={true}
    />
  );
};

export const WithMenu: StoryObj<InformationCardProps> = {
  render: (args) => {
    return renderMenuWithCard(() => <InformationCard {...args} />, 'Menu item');
  },
  args: {
    ...CompleteExample.args,
  },
};

export const WithDropdown: StoryObj<InformationCardProps> = {
  render: (args) => {
    const [dropdownVisible, setDropdownVisible] = useState(true);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => {
      setDropdownVisible(false);
    });
    const popoverProps = useCallback(
      (visible) => ({
        defaultPopupVisible: dropdownVisible && (visible ?? true),
      }),
      [dropdownVisible],
    );
    const buildMenuEntry = (visible): Partial<MenuItemProps> => ({
      text: 'Menu item',
      hoverTooltipProps: popoverProps(visible),
      renderHoverTooltip: () => (
        <InformationCard {...args} descriptionConfig={{ onChange: fn() }} />
      ),
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
            onKeyDown={(e) => focusWithArrowKeys(e, 'ds-menu-item', () => {})}
            ref={ref}
          >
            <Menu
              dataSource={Array.from(Array(3)).map((_e, i) =>
                buildMenuEntry(i === 0),
              )}
              asDropdownMenu={true}
              style={{ width: '100%' }}
              showTextTooltip={true}
            />
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
  args: {
    ...CompleteExample.args,
  },
};
