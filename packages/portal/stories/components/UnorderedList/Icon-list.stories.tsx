import { boolean, select, text } from '@storybook/addon-knobs';
import Icon, { CheckS, Close3S, Check3S} from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import OrderedList from '@synerise/ds-ordered-list';
import React from 'react';
import OrderedListSkeleton from '@synerise/ds-skeleton/dist/OrderedListSkeleton/OrderedListSkeleton';

const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};

const stories = {
  default: () => {
    const level = {
      first: 'first',
      second: 'second',
      third: 'third',
    };
    const emptyFormatter = () => ``;
    const setLevel = select('Set list level', level, level.first);
    const Icons = {
      CheckS: <Icon size={20} style={{marginRight: '4px', marginLeft: '-3px'}} color={theme.palette['grey-600']} component={<CheckS />} />,
      Close3S: <Icon size={20} style={{marginRight: '4px', marginLeft: '-3px'}} color={theme.palette['red-600']} component={<Close3S />} />,
      Check3S: <Icon size={20} style={{marginRight: '4px', marginLeft: '-3px'}} color={theme.palette['green-600']} component={<Check3S />} />,
      Emoji: <Icon size={20} style={{marginLeft: '1px'}}  component='👉' />
    };
    const textIcons = ['CheckS', 'Close3S', 'Check3S','Emoji'];
    const iconType = select('Set symbol', textIcons, 'CheckS');
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
        label: 'Icon List level 1',
        prefixel: Icons[iconType],
      },
      {
        label: 'Icon List level 1',
        prefixel: Icons[iconType],
      },
      {
        label: 'Icon List level 1',
        prefixel: Icons[iconType],
      },
      {
        label: 'Icon List level 1',
        prefixel: Icons[iconType],
        subMenu:
          setLevel === level.second || setLevel === level.third
            ? [
                {
                  label: 'Icon List level 2',
                  prefixel: Icons[iconType],
                },
                {
                  label: 'Icon List level 2',
                  prefixel: Icons[iconType],
                  subMenu:
                    setLevel === level.third
                      ? [
                          {
                            label: 'Icon List level 3',
                            prefixel: Icons[iconType],
                          },
                          {
                            label: 'Icon List level 3',
                            prefixel: Icons[iconType],
                          },
                        ]
                      : undefined,
                },
              ]
            : undefined,
      },
      {
        label: 'Icon List level 1',
        prefixel: Icons[iconType],
      },
      {
        label: 'Icon List level 1',
        prefixel: Icons[iconType],
      },
      {
        label: 'Icon List level 1',
        prefixel: Icons[iconType],
      },
      {
        label: 'Icon List level 1',
        prefixel: Icons[iconType],
      },
      {
        label: 'Icon List level 1',
        prefixel: Icons[iconType],
      },
    ];

    return <OrderedList text={renderLabel(label && getLabel(hasLabel))} data={data} indexFormatter={emptyFormatter} />;
  },
  withIndividualIcons: () => {
    const emptyFormatter = () => ``;
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
        label: 'Icon List level 1',
        prefixel: <Icon size={20} style={{marginRight: '2px', marginLeft: '-4px'}} color={theme.palette['red-600']} component={<Close3S />} />,
      },
      {
        label: 'Icon List level 1',
        prefixel: <Icon size={20} style={{marginRight: '2px', marginLeft: '-4px'}} color={theme.palette['red-600']} component={<Close3S />} />,
      },
      {
        label: 'Icon List level 1',
        prefixel: <Icon size={20} style={{marginRight: '2px', marginLeft: '-4px'}} color={theme.palette['green-600']} component={<Check3S />} />,
      },
      {
        label: 'Icon List level 1',
        prefixel: <Icon size={20} style={{marginRight: '2px', marginLeft: '-4px'}} color={theme.palette['green-600']} component={<Check3S />} />,
      },
    ];

    return <OrderedList text={renderLabel(label && getLabel(hasLabel))} data={data} indexFormatter={emptyFormatter} />;
  },
  iconListSkeleton: () => {
    const emptyFormatter = () => ``;
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
};

export default {
  name: 'Components/Ordered&UnorderedList/ Icon-list',
  config: {},
  stories,
};
