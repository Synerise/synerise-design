import React from 'react';
import { fn } from '@storybook/test';
import { faker } from '@faker-js/faker';

import { ObjectAvatar } from '@synerise/ds-avatar';
import { Color } from '@synerise/ds-avatar/dist/Avatar.types';
import InformationCard, { InformationCardProps } from '@synerise/ds-information-card';
import type { RadioProps } from '@synerise/ds-radio';

import Icon, { ShowM, AggregateM, SegmentM, ExpressionM, CopyClipboardM, OptionHorizontalM } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';

import * as S from './Confirmation.styles';


const BATCH_ITEMS_DATA = [
    {
        text: `Aggregate name`,
        id: '1',
        icon: <AggregateM />,
        iconColor: 'red',
        prefixel: <ObjectAvatar size='small' iconComponent={<SegmentM />} color='red' />,
        onClick: fn(),
    },
    {
        text: `Aggregate name`,
        id: '1',
        icon: <AggregateM />,
        iconColor: 'red',
        prefixel: <ObjectAvatar size='small' iconComponent={<AggregateM />} color='red' />,
        onClick: fn(),
    },
    {
        text: `Aggregate name`,
        id: '1',
        icon: <AggregateM />,
        iconColor: 'red',
        prefixel: <ObjectAvatar size='small' iconComponent={<AggregateM />} color='red' />,
        onClick: fn(),
    },
    {
        text: `Aggregate name`,
        id: '1',
        icon: <AggregateM />,
        iconColor: 'red',
        prefixel: <ObjectAvatar size='small' iconComponent={<AggregateM />} color='red' />,
        onClick: fn(),
    },
    {
        text: `Aggregate name`,
        id: '1',
        icon: <AggregateM />,
        iconColor: 'red',
        prefixel: <ObjectAvatar size='small' iconComponent={<AggregateM />} color='red' />,
        onClick: fn(),
    },
    {
        text: `Aggregate name`,
        id: '1',
        icon: <AggregateM />,
        iconColor: 'red',
        prefixel: <ObjectAvatar size='small' iconComponent={<AggregateM />} color='red' />,
        onClick: fn(),
    },
    {
        text: `Aggregate name`,
        id: '1',
        icon: <AggregateM />,
        iconColor: 'red',
        prefixel: <ObjectAvatar size='small' iconComponent={<AggregateM />} color='red' />,
        onClick: fn(),
    },
    {
        text: `Aggregate name`,
        id: '1',
        icon: <AggregateM />,
        iconColor: 'red',
        prefixel: <ObjectAvatar size='small' iconComponent={<AggregateM />} color='red' />,
        onClick: fn(),
    },
]

const generateInfocard = (item: typeof BATCH_ITEMS_DATA[number]) => {
    const propertyListItems = [
        {
            label: 'Created',
            value: faker.date.recent({ days: 3 }).toLocaleDateString(),
        },
        {
            label: 'Updated',
            value: faker.date.recent({ days: 3 }).toLocaleDateString(),
        },
        {
            label: 'Author',
            value: faker.person.fullName(),
        },
        {
            label: 'Used in',
            value: `#${faker.number.int(50)} analysis`,
        },
    ];
    const props: InformationCardProps = {
        title: item.text,
        subtitle: faker.lorem.paragraph(),
        icon: item.icon,
        iconColor: item.iconColor,
        propertyListItems
    }
    return () => <InformationCard {...props} />

}

const prepareItems = (items: typeof BATCH_ITEMS_DATA) => {
    return items.map(item => {
        return {
            ...item,
            prefixel: <ObjectAvatar size='small' iconComponent={item.icon} color={item.iconColor as Color} />,
            renderHoverTooltip: generateInfocard(item)
        }
    })
}
export const BATCH_ITEMS = prepareItems(BATCH_ITEMS_DATA);
export const DECISION_OPTIONS: RadioProps[] = [{
    value: 'move',
    children: 'Move to "default" folder',
    onChange: fn(),
    checked: true,
},
{
    value: 'delete',
    children: 'Delete items',
    onChange: fn()
}]


export const RELATED_OBJECTS_DATA = [

    {
        key: '21',
        icon: <SegmentM />,
        name: `Segmentation #${faker.number.int({ min: 100, max: 900 })}`,
    },
    {
        key: '22',
        icon: <AggregateM />,
        name: `Aggregate #${faker.number.int({ min: 100, max: 900 })}`,
    },
    {
        key: '2',
        name: `Segmentation #${faker.number.int({ min: 100, max: 900 })}`,
        icon: <SegmentM />,
        children: [
            {
                key: '3',
                icon: <ExpressionM />,
                name: `Expression #${faker.number.int({ min: 100, max: 900 })}`,
            },
            {
                key: '4',
                icon: <AggregateM />,
                name: `Aggregate #${faker.number.int({ min: 100, max: 900 })}`,
                children: [
                    {
                        key: '20',
                        icon: <SegmentM />,
                        name: `Segmentation #${faker.number.int({ min: 100, max: 900 })}`,
                    },
                    {
                        key: '23',
                        icon: <SegmentM />,
                        name: `Segmentation #${faker.number.int({ min: 100, max: 900 })}`,
                    },
                ],
            },
        ],
    },
    {
        key: '17',
        icon: <ExpressionM />,
        name: `Expression #${faker.number.int({ min: 100, max: 900 })}`,
    },
    {
        key: '7',
        icon: <SegmentM />,
        name: `Segmentation #${faker.number.int({ min: 100, max: 900 })}`,
        children: [
            {
                key: '8',
                icon: <SegmentM />,
                name: `Segmentation #${faker.number.int({ min: 100, max: 900 })}`,
            },
            {
                key: '9',
                icon: <SegmentM />,
                name: `Segmentation #${faker.number.int({ min: 100, max: 900 })}`,
            },
        ],
    },
];

const flatten = (items: any[]) => {
    return items.flatMap(item => item.children ? [item, ...flatten(item.children)] : item)
}
export const RELATED_OBJECTS_COUNT = flatten(RELATED_OBJECTS_DATA).length

export const COLUMNS = [
    {
        dataIndex: 'name',
        key: 'name',
        render: (name: string | null, { icon, key }) => (
            <S.RowWrapper>
                <S.RowWrapperText className='chromatic-ignore'>
                    <S.DependencyIcon component={icon} color={theme.palette['grey-600']} />
                    <span>{name}</span>
                </S.RowWrapperText>
                <div>
                    <Dropdown
                        overlay={
                            <Menu asDropdownMenu>
                                <Menu.Item
                                    prefixel={<Icon component={<ShowM />} size={24} />}
                                    onClick={fn()}
                                >
                                    Show details
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                    prefixel={<Icon component={<CopyClipboardM />} size={24} />}
                                    copyHint="Copy ID"
                                    copyable
                                    copyValue={key}
                                    copyTooltip="Copied!"
                                >
                                    ID: {key}
                                </Menu.Item>
                            </Menu>
                        }
                        trigger={['click']}
                    >
                        <Button type="ghost" mode="single-icon">
                            <Icon size={24} component={<OptionHorizontalM />} />
                        </Button>
                    </Dropdown>
                </div>
            </S.RowWrapper>
        ),
    },
]