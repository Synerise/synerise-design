import React from 'react';

import Avatar from '@synerise/ds-avatar';
import { theme } from '@synerise/ds-core';
import Icon, {
  ArrowDownCircleM,
  ArrowDownM,
  ArrowDownS,
  ArrowDragM,
  ArrowLdCircleM,
  ArrowLdM,
  ArrowLdS,
  ArrowLeftCircleM,
  ArrowLeftM,
  ArrowLeftS,
  ArrowLuCircleM,
  ArrowLuM,
  ArrowLuS,
  ArrowRdCircleM,
  ArrowRdM,
  ArrowRdS,
  ArrowRightCircleM,
  ArrowRightM,
  ArrowRightS,
  ArrowRuCircleM,
  ArrowRuM,
  ArrowRuS,
  ArrowUpCircleM,
  ArrowUpM,
  ArrowUpS,
} from '@synerise/ds-icon';

import {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
} from '../../constants';

export const PICKER_DATA = [
  {
    category: 'frequently used',
    items: [],
  },
  {
    category: 'arrows',
    items: [
      {
        item: (
          <Icon
            component={<ArrowDownCircleM />}
            color={theme.palette['grey-600']}
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowLdCircleM />}
            color={theme.palette['grey-600']}
          />
        ),
      },
      {
        item: (
          <Icon component={<ArrowLdM />} color={theme.palette['grey-600']} />
        ),
      },
      {
        item: (
          <Icon component={<ArrowDownS />} color={theme.palette['grey-600']} />
        ),
      },
      {
        item: (
          <Icon component={<ArrowDragM />} color={theme.palette['grey-600']} />
        ),
      },
      {
        item: (
          <Icon component={<ArrowDownM />} color={theme.palette['grey-600']} />
        ),
      },
      {
        item: (
          <Icon component={<ArrowLdS />} color={theme.palette['grey-600']} />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowLeftCircleM />}
            color={theme.palette['grey-600']}
          />
        ),
      },
      {
        item: (
          <Icon component={<ArrowLuM />} color={theme.palette['grey-600']} />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowLuCircleM />}
            color={theme.palette['grey-600']}
          />
        ),
      },
      {
        item: (
          <Icon component={<ArrowLeftS />} color={theme.palette['grey-600']} />
        ),
      },
      {
        item: (
          <Icon component={<ArrowLeftM />} color={theme.palette['grey-600']} />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowRdCircleM />}
            color={theme.palette['grey-600']}
          />
        ),
      },
      {
        item: (
          <Icon component={<ArrowRdM />} color={theme.palette['grey-600']} />
        ),
      },
      {
        item: (
          <Icon component={<ArrowRdS />} color={theme.palette['grey-600']} />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowRuCircleM />}
            color={theme.palette['grey-600']}
          />
        ),
      },
      {
        item: (
          <Icon component={<ArrowLuS />} color={theme.palette['grey-600']} />
        ),
      },
      {
        item: (
          <Icon component={<ArrowRuM />} color={theme.palette['grey-600']} />
        ),
      },
      {
        item: (
          <Icon component={<ArrowRightM />} color={theme.palette['grey-600']} />
        ),
      },
      {
        item: (
          <Icon component={<ArrowRightS />} color={theme.palette['grey-600']} />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowRightCircleM />}
            color={theme.palette['grey-600']}
          />
        ),
      },
      {
        item: (
          <Icon component={<ArrowRuS />} color={theme.palette['grey-600']} />
        ),
      },
      {
        item: (
          <Icon component={<ArrowUpS />} color={theme.palette['grey-600']} />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowUpCircleM />}
            color={theme.palette['grey-600']}
          />
        ),
      },
      {
        item: (
          <Icon component={<ArrowUpM />} color={theme.palette['grey-600']} />
        ),
      },
    ],
  },
  {
    category: 'emoji',
    items: [
      { item: '😀' },
      { item: '😃' },
      { item: '😄' },
      { item: '😁' },
      { item: '😆' },
      { item: '😅' },
      { item: '🤣' },
      { item: '😂' },
      { item: '🙂' },
      { item: '🙃' },
      { item: '😉' },
      { item: '😊' },
      { item: '😇' },
      { item: '🥰' },
      { item: '😍' },
      { item: '🤩' },
      { item: '😘' },
      { item: '😗' },
      { item: '😚' },
      { item: '😙' },
      { item: '😋' },
      { item: '😛' },
      { item: '😜' },
      { item: '🤪' },
      { item: '😝' },
      { item: '🤑' },
      { item: '🤗' },
      { item: '🤭' },
      { item: '🤫' },
      { item: '🤔' },
      { item: '🤐' },
      { item: '🤨' },
      { item: '😐' },
      { item: '😑' },
      { item: '😶' },
      { item: '😏' },
      { item: '😒' },
      { item: '🙄' },
      { item: '😬' },
      { item: '🤥' },
      { item: '😌' },
      { item: '😔' },
      { item: '😪' },
      { item: '🤤' },
      { item: '😴' },
      { item: '😷' },
      { item: '🤒' },
      { item: '🤕' },
      { item: '🤢' },
      { item: '🤮' },
      { item: '🤧' },
      { item: '🥵' },
      { item: '🥶' },
      { item: '🥴' },
      { item: '😵' },
      { item: '🤯' },
      { item: '🤠' },
      { item: '🥳' },
      { item: '😎' },
      { item: '🤓' },
      { item: '🧐' },
      { item: '😕' },
      { item: '😟' },
      { item: '🙁' },
      { item: '😮' },
      { item: '😯' },
      { item: '😲' },
      { item: '😳' },
      { item: '🥺' },
      { item: '😦' },
      { item: '😧' },
      { item: '😨' },
      { item: '😰' },
      { item: '😥' },
      { item: '😢' },
      { item: '😭' },
      { item: '😱' },
      { item: '😖' },
      { item: '😣' },
      { item: '😞' },
      { item: '😓' },
      { item: '😩' },
      { item: '😫' },
      { item: '😤' },
      { item: '😡' },
      { item: '😠' },
      { item: '🤬' },
    ],
  },
  {
    category: 'avatar',
    items: [
      {
        item: <Avatar src={avatar1} size="small" shape="square" />,
      },
      {
        item: <Avatar src={avatar2} size="small" shape="square" />,
      },
      {
        item: <Avatar src={avatar3} size="small" shape="square" />,
      },
      {
        item: <Avatar src={avatar4} size="small" shape="square" />,
      },
      {
        item: <Avatar src={avatar5} size="small" shape="square" />,
      },
      {
        item: <Avatar src={avatar6} size="small" shape="square" />,
      },
      {
        item: <Avatar src={avatar7} size="small" shape="square" />,
      },
      {
        item: <Avatar src={avatar8} size="small" shape="square" />,
      },
      {
        item: <Avatar src={avatar9} size="small" shape="square" />,
      },
      {
        item: <Avatar src={avatar10} size="small" shape="square" />,
      },
      {
        item: <Avatar src={avatar11} size="small" shape="square" />,
      },
      {
        item: <Avatar src={avatar12} size="small" shape="square" />,
      },
    ],
  },
];
