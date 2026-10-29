import React from 'react';

import Avatar from '@synerise/ds-avatar';
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
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowLdCircleM />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowLdM />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowDownS />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowDragM />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowDownM />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowLdS />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowLeftCircleM />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowLuM />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowLuCircleM />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowLeftS />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowLeftM />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowRdCircleM />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowRdM />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowRdS />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowRuCircleM />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowLuS />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowRuM />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowRightM />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowRightS />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowRightCircleM />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowRuS />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowUpS />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowUpCircleM />}
            color="var(--ds-color-icon-base-default)"
          />
        ),
      },
      {
        item: (
          <Icon
            component={<ArrowUpM />}
            color="var(--ds-color-icon-base-default)"
          />
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
