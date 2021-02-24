import { boolean, select, text } from '@storybook/addon-knobs';
import UnorderedList from '@synerise/ds-unordered-list';
import * as React from 'react';

const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};



const emptyFormatter = () => ``;
const dashedFormatter = () => ` - `;
const formatterUnorderedType = {
  empty: emptyFormatter,
  dashed: dashedFormatter,
};
const stories = {
  default: () => {
    const level = {
      first: 'first',
      second: 'second',
      third: 'third',
    };
    const setLevel = select('Set list level', level, level.first);
    const preffix = {
      square: 'square',
      disc: 'disc',
      dashed: 'dashed',
    };
    const listStyle = select('Set order', preffix, preffix.dashed);
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

    return <UnorderedList text={renderLabel(label && getLabel(hasLabel))} listStyle={listStyle === preffix.dashed ? 'none' : listStyle} data={data}
                        indexFormatter={listStyle === preffix.dashed ? formatterUnorderedType.dashed : formatterUnorderedType.empty}/>;
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
          indexFormatter: () => null,
          listStyle: 'square',
        },
        subMenu: setLevel === level.second || setLevel === level.third
          ? [
            {
              label: 'Unordered List level 2',
            },
            {
              label: 'Unordered List level 2',
              subMenuProps:  {
                indexFormatter: () => null,
                listStyle: 'square',
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
}

export default {
  name: 'Components/Ordered&UnorderedList/Unordered-list',
  config: {},
  stories,
};