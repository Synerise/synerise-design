import { select, text } from '@storybook/addon-knobs';
import Icon from '@synerise/ds-icon';
import CheckS from '@synerise/ds-icon/dist/icons/CheckS';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Close3S from '@synerise/ds-icon/dist/icons/Close3S';
import Check3S from '@synerise/ds-icon/dist/icons/Check3S';
import OrderedList from '@synerise/ds-ordered-list';
import * as React from 'react';

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
      CheckS: <Icon size={20} style={{marginRight: '2px'}} color={theme.palette['grey-600']} component={<CheckS />} />,
      Close3S: <Icon size={20} style={{marginRight: '2px'}} color={theme.palette['red-600']} component={<Close3S />} />,
      Check3S: <Icon size={20} style={{marginRight: '2px'}} color={theme.palette['green-600']} component={<Check3S />} />,
      Emoji:<Icon size={20}  component=' 👉 ' />
    };
    const textIcons = ['CheckS', 'Close3S', 'Check3S','Emoji'];
    const iconType = select('Set symbol', textIcons, 'CheckS');
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

    return <OrderedList text={renderLabel(text('Label', 'Header label'))} data={data} indexFormatter={emptyFormatter} />;
  },
  WithIndividualIcons: () => {
    const emptyFormatter = () => ``;
    const data = [
      {
        label: 'Icon List level 1',
        prefixel: <Icon size={20} style={{marginRight: '2px'}} color={theme.palette['red-600']} component={<Close3S />} />,
      },
      {
        label: 'Icon List level 1',
        prefixel: <Icon size={20} style={{marginRight: '2px'}} color={theme.palette['red-600']} component={<Close3S />} />,
      },
      {
        label: 'Icon List level 1',
        prefixel: <Icon size={20} style={{marginRight: '2px'}} color={theme.palette['green-600']} component={<Check3S />} />,
      },
      {
        label: 'Icon List level 1',
        prefixel: <Icon size={20} style={{marginRight: '2px'}} color={theme.palette['green-600']} component={<Check3S />} />,
      },
    ];

    return <OrderedList text={renderLabel(text('Label', 'Header label'))} data={data} indexFormatter={emptyFormatter} />;
  },
};

export default {
  name: 'Components/Ordered&UnorderedList/ Icon-list',
  config: {},
  stories,
};
