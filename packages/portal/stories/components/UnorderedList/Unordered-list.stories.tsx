import { boolean, select, text } from '@storybook/addon-knobs';
import UnorderedList from '@synerise/ds-unordered-list';
import * as React from 'react';
import OrderedListSkeleton from '@synerise/ds-skeleton/dist/OrderedListSkeleton/OrderedListSkeleton';
import OrderedList from '@synerise/ds-ordered-list';

const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};



const dashedFormatter = () => ` - `;
const emptyFormatter = () => ``;
const squareFormatter = () => ` ▪ `;
const discFormatter = () => ` ● `;
const formatterUnorderedType = {
  dashed: dashedFormatter,
  disc: discFormatter,
  square: squareFormatter,
};
const stories = {
  default: () => {
    const level = {
      first: 'first',
      second: 'second',
      third: 'third',
    };
    const setLevel = select('Set list level', level, level.first);


    const formatter = select('Set order type', formatterUnorderedType, formatterUnorderedType.dashed);
    const hasLabel = boolean('Set label', true);
    const label = text('Label', 'Header label');
    const getLabel = (hasLabel: boolean): string => {
      if (hasLabel) {
        return label;
      } else {
        return '';
      }
    };
    const data = [
      {
        label: 'Unordered List level 1',
      },
      {
        label: 'Unordered List level 1',
      },
      {
        label: 'Unordered List level 1',
      },
      {
        label: 'Unordered List level 1',
        subMenu: setLevel === level.second || setLevel === level.third
          ? [
            {
              label: 'Unordered List level 2',
            },
            {
              label: 'Unordered List level 2',
              subMenu: setLevel === level.third
                ? [
                  {
                    label: 'Unordered List level 3',
                  },
                  {
                    label: 'Unordered List level 3',
                  },
                ]
                : undefined,
            },
          ]
          : undefined,
      },
      {
        label: 'Unordered List level 1',
      },
      {
        label: 'Unordered List level 1',
      },
      {
        label: 'Unordered List level 1',
      },
      {
        label: 'Unordered List level 1',
      },
      {
        label: 'Unordered List level 1',
      },
    ];

    return <UnorderedList text={renderLabel(label && getLabel(hasLabel))} data={data}
                        indexFormatter={formatter}/>;
  },
  nestedList: () => {
    const level = {
      first: 'first',
      second: 'second',
      third: 'third',
    };
    const setLevel = select('Set list level', level, level.third);
    const hasLabel = boolean('Set label', true);
    const label = text('Label', 'Header label');
    const getLabel = (hasLabel: boolean): string => {
      if (hasLabel) {
        return label;
      } else {
        return '';
      }
    };
    const data = [
      {
        label: 'Unordered List level 1',
      },
      {
        label: 'Unordered List level 1',
      },
      {
        label: 'Unordered List level 1',
      },
      {
        label: 'Unordered List level 1',
        subMenuProps:   {
          indexFormatter: squareFormatter,
        },
        subMenu: setLevel === level.second || setLevel === level.third
          ? [
            {
              label: 'Unordered List level 2',
            },
            {
              label: 'Unordered List level 2',
              subMenuProps:  {
                indexFormatter: squareFormatter,
              },
              subMenu: setLevel === level.third
                ? [
                  {
                    label: 'Unordered List level 3',
                  },
                  {
                    label: 'Unordered List level 3',
                  },
                ]
                : undefined,
            },
          ]
          : undefined,
      },
      {
        label: 'Unordered List level 1',
      },
      {
        label: 'Unordered List level 1',
      },
      {
        label: 'Unordered List level 1',
      },
      {
        label: 'Unordered List level 1',
      },
      {
        label: 'Unordered List level 1',
      },
    ];

    return <UnorderedList text={renderLabel(label && getLabel(hasLabel))} listStyle='none' data={data}
                        indexFormatter={dashedFormatter}/>;
  },
  unorderedListSkeleton: () => {
    const hasLabel = boolean('Set label', true);
    const label = text('Label', 'Header label');
    const getLabel = (hasLabel: boolean): string => {
      if (hasLabel) {
        return label;
      } else {
        return '';
      }
    };
    const data = [
      {
        label: <OrderedListSkeleton size='M' />,
      },
    ];
    return (
      <OrderedList text={renderLabel(label && getLabel(hasLabel))} data={data} indexFormatter={emptyFormatter} />
    )
  },
}

export default {
  name: 'Components/Ordered&UnorderedList/Unordered-list',
  config: {},
  stories,
};