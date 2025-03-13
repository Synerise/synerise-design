import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Mapping, { MappingProps } from '@synerise/ds-mapping';
import Icon, { ArrowRightM, BlockM, ShowM } from '@synerise/ds-icon';
import { Input } from '@synerise/ds-input';
import Button from '@synerise/ds-button';
import Select from '@synerise/ds-select';

import { CATALOG_ITEM_KEY, DATA_SOURCE, EventParameterType, EVENT_PARAMETERS, ItemType } from './Mapping.data';
import { BOOLEAN_CONTROL, fixedWrapper588, STRING_CONTROL } from '../../utils';
import { theme } from '@synerise/ds-core';

type StoryType = MappingProps & { withSelection: boolean };

export default {
  component: Mapping,
  title: 'Components/Mapping',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [fixedWrapper588],
  render: ({ withSelection, ...args }) => {
    const [data, setData] = useState(DATA_SOURCE);
    const [selectedItemIds, setSelectedItemIds] = useState<Array<ItemType['id']>>([]);
    const updateMappedName = (newValue: string, rowIndex: number) => {
      setData(
        data.map((item, index) => {
          return index === rowIndex
            ? {
                ...item,
                mappingName: newValue,
              }
            : item;
        })
      );
    };
    const updateMapping = (newValue: boolean, rowIndex: number) => {
      setData(
        data.map((item, index) => {
          return index === rowIndex
            ? {
                ...item,
                mapped: newValue,
              }
            : item;
        })
      );
    };
    const mappedTotal = data.filter(item => item.mapped).length;
    const leftComponent = ({ item, index }: { item: ItemType; index: number }) => {
      return <Input resetMargin value={item.parameterName} readOnly />;
    };
    const rightComponent = ({ item, index }: { item: ItemType; index: number }) => {
      return item.mapped ? (
        <Input
          resetMargin
          value={item.mappingName}
          onChange={event => {
            updateMappedName(event.currentTarget.value, index);
          }}
        />
      ) : (
        <>Parameter won't be sent</>
      );
    };
    const centerComponent = ({ item, index }: { item: ItemType; index: number }) => {
      return (
        <Button type="secondary" mode="single-icon" onClick={() => updateMapping(!item.mapped, index)}>
          <Icon component={item.mapped ? <ArrowRightM /> : <BlockM />} />
        </Button>
      );
    };
    const setBatchMapped = (value: boolean) => {
      setData(
        data.map(item => {
          return selectedItemIds.includes(item.id)
            ? {
                ...item,
                mapped: value,
              }
            : item;
        })
      );
    };
    const onSelectionChange = (selected: ItemType['id'][]) => setSelectedItemIds(selected);

    const batchSelection = {
      renderCounter: (selected: number, total: number) => {
        return selected !== 0 ? `Selected ${selected}` : `${mappedTotal} / ${total} parameters will be enriched`;
      },
      onSelectionChange,
      actionButtons: (
        <>
          <Button onClick={() => setBatchMapped(true)} mode="icon-label" type="secondary">
            <Icon component={<ArrowRightM />} /> Set as enrichment
          </Button>
          <Button onClick={() => setBatchMapped(false)} mode="icon-label" type="secondary">
            <Icon component={<BlockM />} /> Don't enrich
          </Button>
        </>
      ),
    };

    return (
      <Mapping
        {...args}
        dataSource={data}
        rightComponent={rightComponent}
        centerComponent={centerComponent}
        leftComponent={leftComponent}
        batchSelection={withSelection ? batchSelection : undefined}
      />
    );
  },
  args: {},
  argsTypes: {},
} as Meta<MappingProps>;

export const Default: StoryObj<StoryType> = {
  args: {
    leftTitle: 'Parameter name',
    rightTitle: 'Mapping name',
  },
};

export const WithBatchActions: StoryObj<StoryType> = {
  args: {
    leftTitle: 'Parameter name',
    rightTitle: 'Mapping name',
    withSelection: true,
  },
};

export const WithSelect: StoryObj<StoryType> = {
  render: args => {
    const [eventParameter, setEventParameter] = useState<EventParameterType | undefined>();
    const dataSource = [CATALOG_ITEM_KEY];

    const leftComponent = ({ item }: { item: typeof CATALOG_ITEM_KEY }) => {
      return <Input resetMargin value={item.name} readOnly icon1={<Icon component={<ShowM />} onClick={action('Preview data')} />} icon1Tooltip={<>Preview data</>} />;
    };
    const rightComponent = () => {
      return (
        // @ts-ignore
        <Select
          placeholder='Choose parameter'
          value={eventParameter?.id}
          onChange={value => {
            setEventParameter(EVENT_PARAMETERS.find(param => param.id === value));
          }}
        >
          {EVENT_PARAMETERS.map(param => (
            <Select.Option key={param.id} value={param.id}>
              {param.parameterName}
            </Select.Option>
          ))}
        </Select>
      );
    };
    const centerComponent = () => <Icon component={<ArrowRightM />} color={theme.palette['grey-600']} />;

    return (
      <Mapping
        {...args}
        dataSource={dataSource}
        rightComponent={rightComponent}
        centerComponent={centerComponent}
        leftComponent={leftComponent}
      />
    );
  },
  args: {
    leftTitle: 'Catalog item',
    leftTitleTooltip: { title: 'Left tooltip content'},
    rightTitle: 'Event parameter',
    rightTitleTooltip: { title: 'Right tooltip content' },
  },
};
