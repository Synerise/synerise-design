``
`
import * as React from 'react';
import Label from '@synerise/ds-input/dist/Label/Label';
import * as S from './Ordered-list.styles';
import Item from './Elements/Item/Item';
import { ListProps } from './Ordered-list.types';

// Component
const OrderedList: React.FC<ListProps> = ({ data, indexFormatter, listStyle, text }) => {
  return (
    <div>
      {text && (
        <S.ContentAbove>
          <Label label={text} />
        </S.ContentAbove>
      )}
      <S.OrderedList listStyle={listStyle}>
        {data.map(({ index, ...item }, i) => (
          <Item listStyle={listStyle} index={i} key={String(item?.id)} indexFormatter={indexFormatter} {...item} />
        ))}
      </S.OrderedList>
    </div>
  );
};

export default OrderedList;

// Storybook
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import OrderedList, { ListProps } from './OrderedList';

const meta: Meta<ListProps> = {
  title: 'OrderedList',
  component: OrderedList,
};

export default meta;

const excludedProps = [];

const excludeRegexp = new RegExp(`($ {
  excludedProps.join('|')
})`, 'g');

type Story = StoryObj<ListProps>;
const StoryTemplate: Story = {
  render: (args) => <OrderedList {...args} />,
};

export const Primary = {
  ...StoryTemplate,
  args: {
    data: [
      { id: 1, text: 'Item 1' },
      { id: 2, text: 'Item 2' },
      { id: 3, text: 'Item 3' },
    ],
    listStyle: 'ordered',
    text: 'Ordered List',
  },
};
`
``