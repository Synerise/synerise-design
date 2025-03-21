import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import CardTabs, { CardTab, prefixType, CardTabsStyles } from '@synerise/ds-card-tabs';
import type { CardTabProps, CardTabsProps, CardTabsItem } from '@synerise/ds-card-tabs';
import { theme } from '@synerise/ds-core';
import Icon, {
  AppleFillM,
  Close3M,
  ErrorFillM,
  FacebookFillM,
  HelpFillM,
  OptionHorizontalM,
  ShowM,
} from '@synerise/ds-icon';

import {
  BOOLEAN_CONTROL,
  greyBackgroundDecorator,
  CLASSNAME_ARG_CONTROL,
  controlFromOptionsArray,
  fixedWrapper588,
  NUMBER_CONTROL,
  reactNodeAsSelect,
  STRING_CONTROL,
} from '../../utils';
import { CARD_TABS_ITEMS, createItemData } from './CardTabs.data';

const {
  CardTab: { CardDot },
} = CardTabsStyles;

export default {
  title: 'Components/CardTabs',
  component: CardTabs,
  render: ({ children, ...args }) => {
    const [order, setOrder] = useState<CardTabsItem[]>(children);
    const [activeTab, setActiveTab] = useState(children[0].id);

    const { onChangeOrder, onAddTab, maxTabsCount, addTabLabel, ...cardTabItemArgs } = args;
    const handleChangeOrder = (newOrder: CardTabsItem[]) => {
      setOrder(newOrder);
      onChangeOrder?.(newOrder);
    };
    const handleAddTab = () => {
      setOrder([...order, createItemData(order.length)]);
    };
    const handleSelectTab = (id: number) => {
      setActiveTab(id);
      cardTabItemArgs.onSelectTab?.(id);
    };
    const handleRemove = (id: number) => {
      setOrder(order.filter(item => item.id !== id));
      cardTabItemArgs.onRemoveTab?.(id, name);
    };

    const handleDuplicate = (id: number) => {
      const newItem = createItemData(order.length);
      const duplicatedItem = order.find(item => item.id === id);

      setOrder([...order, { ...duplicatedItem, id: newItem.id, tag: newItem.tag }]);
      cardTabItemArgs.onDuplicateTab?.(id, name);
    };
    const handleChangeName = (id: number, name: string) => {
      const newOrder = order.map(item => {
        return item.id === id
          ? {
              ...item,
              name: name,
            }
          : item;
      });
      setOrder(newOrder);
      cardTabItemArgs.onChangeName?.(id, name);
    };
    return (
      <CardTabs
        onAddTab={onAddTab ? handleAddTab : undefined}
        onChangeOrder={onChangeOrder ? handleChangeOrder : undefined}
        maxTabsCount={maxTabsCount}
        addTabLabel={addTabLabel}
      >
        {order.map(cardProps => (
          <CardTab
            {...cardProps}
            {...cardTabItemArgs}
            onSelectTab={handleSelectTab}
            active={activeTab === cardProps.id}
            onChangeName={handleChangeName}
            onRemoveTab={handleRemove}
            onDuplicateTab={handleDuplicate}
          />
        ))}
      </CardTabs>
    );
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [fixedWrapper588, greyBackgroundDecorator],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    addTabLabel: {
      table: {
        category: 'Card Tabs Props',
      },
      ...STRING_CONTROL,
    },
    maxTabsCount: {
      table: {
        category: 'Card Tabs Props',
      },
      ...NUMBER_CONTROL,
    },
    invalid: {
      table: {
        category: 'Card Tab Props',
      },
      ...BOOLEAN_CONTROL,
    },
    greyBackground: {
      table: {
        category: 'Card Tab Props',
      },
      ...BOOLEAN_CONTROL,
    },
    onAddTab: {
      action: 'onAddTab',
      table: {
        category: 'Card Tabs Props',
      },
    },
    onChangeOrder: {
      action: 'onChangeOrder',
      table: {
        category: 'Card Tabs Props',
      },
    },
    tag: {
      table: {
        category: 'Card Tab Props',
      },
      ...controlFromOptionsArray('inline-radio', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']),
    },
    prefix: {
      table: {
        category: 'Card Tab Props',
      },
      ...controlFromOptionsArray('inline-radio', ['DOT', 'ICON', 'TAG', 'HANDLE']),
      mapping: prefixType,
    },
    suffix: {
      ...reactNodeAsSelect(['icon', 'cruds', 'menu'], {
        icon: <OptionHorizontalM />,
        cruds: undefined,
        menu: undefined,
      }),
      table: {
        category: 'Card Tab Props',
      },
    },
    actionsAsDropdown: {
      ...BOOLEAN_CONTROL,
      table: {
        category: 'Card Tab Props',
      },
    },
    onChangeName: {
      action: 'onChangeName',
      table: {
        category: 'Card Tab Props',
      },
    },
    onRemoveTab: {
      action: 'onRemoveTab',
      table: {
        category: 'Card Tab Props',
      },
    },
    onDuplicateTab: {
      action: 'onDuplicateTab',
      table: {
        category: 'Card Tab Props',
      },
    },
    onPreviewTab: {
      action: 'onPreviewTab',
      table: {
        category: 'Card Tab Props',
      },
    },
    prefixIcon: {
      ...reactNodeAsSelect(['AppleFillM', 'Close3M', 'ErrorFillM', 'FacebookFillM', 'HelpFillM'], {
        AppleFillM: <Icon component={<AppleFillM />} color={theme.palette['fern-600']} />,
        Close3M: <Icon component={<Close3M />} color={theme.palette['grey-400']} />,
        ErrorFillM: <Icon component={<ErrorFillM />} color={theme.palette['red-600']} />,
        HelpFillM: <Icon component={<HelpFillM />} color={theme.palette['orange-600']} />,
        FacebookFillM: <Icon component={<FacebookFillM />} color={theme.palette['blue-600']} />,
      }),
      table: {
        category: 'Card Tab Props',
      },
    },
    name: {
      table: {
        category: 'Card Tab Props',
      },
    },
    colorDot: {
      table: {
        category: 'Card Tab Props',
      },
      control: false,
    },
    children: {
      table: {
        category: 'Card Tabs Props',
      },
      control: false,
    },
    onSelectTab: {
      action: 'onSelectTab',

      table: {
        category: 'Card Tab Props',
      },
      control: false,
    },
  },
  args: {
    children: CARD_TABS_ITEMS,
    prefix: prefixType[prefixType.TAG],
    colorDot: <CardDot />,
    prefixIcon: <ShowM />,
    actionsAsDropdown: true,
  },
} as Meta<CardTabsProps>;

type Story = StoryObj<CardTabsProps & CardTabProps>;

export const Default: Story = {};
export const InvalidTabs: Story = {
  args: {
    invalid: true,
  },
};
export const GreyBackground: Story = {
  args: {
    greyBackground: true,
  },
};
export const AddDisabled: Story = {
  args: {
    maxTabsCount: CARD_TABS_ITEMS.length,
  },
};

export const DotPrefix: Story = {
  args: {
    prefix: prefixType[prefixType.DOT],
  },
};
export const IconPrefix: Story = {
  args: {
    prefix: prefixType[prefixType.ICON],
  },
};
export const HandlePrefix: Story = {
  args: {
    prefix: prefixType[prefixType.HANDLE],
  },
};

export const WithCrudsOnHover: Story = {
  parameters: {
    pseudo: {
        hover: true
    }
  },
  args: {
    actionsAsDropdown: false,
  },
};
