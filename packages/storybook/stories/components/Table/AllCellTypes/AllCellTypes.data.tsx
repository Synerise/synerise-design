import React, { ReactNode } from 'react';
import { action } from 'storybook/actions';

import Avatar, { ObjectAvatar } from '@synerise/ds-avatar';
import Button from '@synerise/ds-button';
import Checkbox from '@synerise/ds-checkbox';
import { theme } from '@synerise/ds-core';
import Icon, {
  InfoFillS,
  LockM,
  MailM,
  UserM,
  VarTypeBooleanM,
  VarTypeListM,
  VarTypeStringM,
} from '@synerise/ds-icon';
import Loader from '@synerise/ds-loader';
import ProgressBar from '@synerise/ds-progress-bar';
import Select from '@synerise/ds-select';
import Switch from '@synerise/ds-switch';
import { DSColumnType, TableCell } from '@synerise/ds-table';
import Tag, { TagShape } from '@synerise/ds-tag';
import Tooltip from '@synerise/ds-tooltip';

import { AVATAR_IMAGE } from '../../../constants';
import { Counter } from '../../Loader/Loader.data';
import { AdditionalColumnData } from '../Table.types';
import { chromaticCellRender } from '../Table.utils';

export type RelationsType = (typeof RELATIONS)[number];

export const RELATIONS = [
  {
    fieldName: 'Milk',
    key: 0,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Oil',
    key: 1,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Apple',
    key: 2,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Banana',
    key: 3,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Bread',
    key: 4,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Orange',
    key: 5,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Eggs',
    key: 6,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Beer',
    key: 7,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Cheese',
    key: 8,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Pasta',
    key: 9,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Rice',
    key: 10,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
];

export const DATA_SOURCE = [
  {
    key: 1,
    name: 'Candace Olson',
    active: false,
    enabled: false,
    inactive: true,
    checked: true,
    relations: RELATIONS,
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
  },
  {
    key: 2,
    name: 'Miguel Mante',
    active: true,
    enabled: true,
    checked: true,
    relations: RELATIONS,
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
  },
  {
    key: 3,
    name: 'Gretchen Ward I',
    active: false,
    enabled: false,
    editable: 'Vivian Hettinger',
    checked: false,
    relations: RELATIONS,
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
  },
  {
    key: 4,
    name: 'Stella Kozey',
    active: true,
    enabled: true,
    inactive: true,
    editable: 'Angela Douglas',
    checked: true,
    relations: RELATIONS,
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
  },
  {
    key: 5,
    name: "Shelia O'Hara",
    active: false,
    enabled: false,
    checked: false,
    relations: RELATIONS,
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
  },
  {
    key: 6,
    name: 'Elaine Cole',
    active: true,
    enabled: false,
    checked: false,
    relations: RELATIONS,
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
  },
  {
    key: 7,
    name: 'Clark Wolff',
    active: false,
    enabled: true,
    editable: 'Kyle Pfeffer',
    checked: false,
    relations: RELATIONS,
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
  },
  {
    key: 8,
    name: "Johnnie O'Keefe",
    active: true,
    enabled: true,
    editable: 'Priscilla Nitzsche',
    checked: false,
    relations: RELATIONS,
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
  },
  {
    key: 9,
    name: 'Arturo Hoeger',
    active: false,
    enabled: false,
    inactive: true,
    checked: true,
    relations: RELATIONS,
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
  },
  {
    key: 10,
    name: 'Karla Brown',
    active: true,
    enabled: false,
    editable: 'Frederick Feil',
    checked: false,
    relations: RELATIONS,
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
  },
];

export const DATA_SOURCE_FULL = [
  {
    key: 1,
    name: 'Allan Schiller DVM',
    active: true,
    country: 'it',
    age: '20',
    address: '143 S Jefferson Street',
    status: 'blocked',
    inactive: true,
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 2',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 2,
    name: 'Dr. Amber Murazik',
    active: false,
    country: 'es',
    age: '15',
    address: '21429 Dannie Coves',
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 3,
    name: 'Marsha McClure',
    active: false,
    country: 'es',
    age: '50',
    address: '83886 Heron Close',
    status: 'active',
    inactive: true,
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 1',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 4,
    name: 'Camille Hintz',
    active: true,
    country: 'us',
    age: '22',
    address: '624 Ash Grove',
    status: 'inactive',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 5,
    name: 'Crystal Osinski',
    active: false,
    country: 'ru',
    age: '44',
    address: '76931 Antonietta Walk',
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 1',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    editable: 'Dr. Natasha Steuber',
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 6,
    name: 'Alicia Koepp',
    active: true,
    country: 'de',
    age: '44',
    address: '91318 Bridge Street',
    status: 'inactive',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 2',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 7,
    name: 'Alexis Gerhold',
    active: true,
    country: 'es',
    age: '36',
    inactive: true,
    address: '821 Friesen Tunnel',
    status: 'blocked',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    editable: 'Leslie Lemke V',
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 8,
    name: 'Mrs. Miriam McKenzie PhD',
    active: true,
    country: 'es',
    age: '33',
    address: '2087 Vandervort Square',
    status: 'inactive',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 9,
    name: 'Olga Zieme',
    active: true,
    country: 'es',
    age: '49',
    address: '87848 Schneider Field',
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    editable: 'Dr. Shaun Sauer',
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 10,
    name: 'Lorraine Rolfson',
    active: true,
    country: 'es',
    age: '42',
    address: '72590 Reichel Shores',
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    editable: 'Brendan Kautzer',
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 11,
    name: 'Gretchen Leannon',
    active: true,
    country: 'de',
    age: '17',
    address: '66833 Spencer Junction',
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 12,
    name: 'Clayton Wolf',
    active: false,
    country: 'ru',
    age: '19',
    address: '342 Marlene Hills',
    status: 'inactive',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 2',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 13,
    name: 'Dr. Sidney Baumbach',
    active: true,
    country: 'ru',
    age: '49',
    address: '581 Gordon Street',
    status: 'inactive',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 1',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 14,
    name: 'Mr. Manuel Pagac',
    active: false,
    country: 'pl',
    age: '21',
    address: '7337 Wintheiser Mills',
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 1',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 15,
    name: 'Miss Pat Schaefer MD',
    active: false,
    country: 'ru',
    age: '38',
    address: '92816 Howard Road',
    status: 'blocked',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 2',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 16,
    name: 'Dr. Jeremiah Skiles',
    active: false,
    country: 'it',
    age: '12',
    address: '44963 Lolita Gardens',
    status: 'inactive',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 17,
    name: 'Ora Kassulke',
    active: true,
    country: 'us',
    age: '55',
    address: '10045 Jacobson Avenue',
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 18,
    name: 'Sadie Cronin',
    active: true,
    country: 'es',
    age: '45',
    address: '61726 Larson Ferry',
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 1',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 19,
    name: 'Leah Quigley',
    active: false,
    country: 'es',
    age: '22',
    address: '543 Karlee Square',
    status: 'blocked',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 1',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 20,
    name: 'Earnest Cole V',
    active: true,
    country: 'de',
    age: '29',
    address: '482 Mayer Mill',
    status: 'inactive',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 21,
    name: 'Clyde Nicolas III',
    active: false,
    country: 'ru',
    age: '41',
    address: '49577 Macejkovic Cove',
    status: 'blocked',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 22,
    name: 'Alexander Bayer-Watsica',
    active: false,
    country: 'ru',
    age: '23',
    address: '77827 N Locust Street',
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 1',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 23,
    name: 'Hector Reichert I',
    active: true,
    country: 'pl',
    age: '41',
    address: '3244 Bogisich Shoals',
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 24,
    name: 'Angelo Schuster',
    active: true,
    country: 'pl',
    age: '53',
    address: '41508 Davis Street',
    status: 'inactive',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 2',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 25,
    name: 'Laurence Hackett',
    active: true,
    country: 'it',
    age: '10',
    address: '440 Luciano Lane',
    status: 'blocked',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 2',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 26,
    name: 'Glenn Bayer',
    active: false,
    country: 'it',
    age: '14',
    address: '5081 Willow Drive',
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    editable: 'Darrell Nader',
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 27,
    name: 'Teresa Schuppe',
    active: true,
    country: 'us',
    age: '42',
    address: '60715 Krystina Roads',
    status: 'blocked',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 1',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    editable: 'Jody Mann',
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 28,
    name: 'Jeannette Mosciski',
    active: true,
    country: 'pl',
    age: '42',
    address: '79775 The Crescent',
    status: 'blocked',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 29,
    name: 'Arthur West',
    active: false,
    country: 'de',
    age: '38',
    address: '478 Woodlands',
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 2',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    editable: 'Morris Paucek',
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 30,
    name: 'Dave Fisher',
    active: true,
    country: 'it',
    age: '60',
    address: '3357 Roberts Port',
    status: 'inactive',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    editable: 'Randal Kuhn',
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 31,
    name: 'Tracy Robel',
    active: false,
    country: 'ru',
    age: '22',
    address: '48769 Hoppe Circle',
    status: 'inactive',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 1',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    editable: 'Clark Mohr',
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 32,
    name: 'Noel Altenwerth',
    active: false,
    country: 'pl',
    age: '24',
    address: '3909 Harvey Light',
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 2',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 33,
    name: 'Jeremiah Volkman',
    active: false,
    country: 'it',
    age: '11',
    address: '2904 Mount Pleasant',
    status: 'inactive',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 34,
    name: 'Pedro Macejkovic',
    active: false,
    country: 'de',
    age: '29',
    address: '760 Breitenberg Dam',
    status: 'inactive',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 2',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 35,
    name: "Mrs. Patty O'Hara",
    active: false,
    country: 'us',
    age: '33',
    address: '1370 Alejandra Alley',
    status: 'inactive',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 2',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 36,
    name: 'Clarence Reynolds',
    active: false,
    country: 'es',
    age: '17',
    address: '986 Juwan Plaza',
    status: 'blocked',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 2',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 37,
    name: 'Leroy Cole',
    active: true,
    country: 'it',
    age: '58',
    address: '544 Botsford Overpass',
    status: 'inactive',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    editable: 'Natalie Donnelly',
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 38,
    name: 'Dr. Marty Brown',
    active: false,
    country: 'pl',
    age: '28',
    address: '73904 Franey Lakes',
    status: 'blocked',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 39,
    name: "Alonzo O'Keefe",
    active: false,
    country: 'es',
    age: '43',
    address: '55592 Wilderman Lakes',
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 40,
    name: 'Don Swift',
    active: false,
    country: 'ru',
    age: '22',
    address: '877 Daugherty Knoll',
    status: 'blocked',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    editable: "Colleen O'Conner",
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 41,
    name: 'Dolores Mosciski',
    active: true,
    country: 'es',
    age: '52',
    address: '13305 Marietta Mill',
    status: 'blocked',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 2',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 42,
    name: 'Brandon Schiller',
    active: false,
    country: 'de',
    age: '45',
    address: '4850 Bedford Road',
    status: 'blocked',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    editable: 'Elaine Morissette',
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 43,
    name: 'Miss Paulette Gleason',
    active: true,
    country: 'it',
    age: '41',
    address: '1116 Lake Avenue',
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 2',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 44,
    name: 'Sherri Block',
    active: true,
    country: 'de',
    age: '22',
    address: '431 Sanford Haven',
    status: 'inactive',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 45,
    name: 'Mr. Greg Glover',
    active: true,
    country: 'de',
    age: '14',
    address: '9166 Maple Close',
    status: 'blocked',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 2',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    editable: 'Ms. Terri Wiegand',
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 46,
    name: 'Ivan Turner',
    active: false,
    country: 'de',
    age: '58',
    address: '962 Park View',
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    editable: 'Tyrone Conroy',
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 47,
    name: 'Hope Ward V',
    active: false,
    country: 'pl',
    age: '59',
    address: '113 Doyle Union',
    status: 'blocked',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 1',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 48,
    name: 'Drew Erdman',
    active: false,
    country: 'de',
    age: '14',
    address: "74679 O'Conner Neck",
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 2',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    editable: 'Nettie Lehner',
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 49,
    name: 'Alison Dietrich',
    active: false,
    country: 'pl',
    age: '49',
    address: '4738 Torey Pike',
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 1',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    editable: 'Matthew Fritsch',
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 50,
    name: 'Jennifer Armstrong',
    active: false,
    country: 'us',
    age: '55',
    address: '9592 Stacey Squares',
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 1',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 51,
    name: 'Miranda Moore',
    active: true,
    country: 'it',
    age: '53',
    address: '5089 Martin Luther King Drive',
    status: 'inactive',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 2',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    editable: 'Rogelio Schiller',
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 52,
    name: 'Edmond Dickens V',
    active: true,
    country: 'ru',
    age: '40',
    address: '4786 W Maple Street',
    status: 'active',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    editable: 'Lloyd Carroll',
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 53,
    name: 'Bennie Wisozk',
    active: false,
    country: 'es',
    age: '34',
    address: '88100 Wintheiser Lights',
    status: 'blocked',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 2',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    editable: 'Freddie Kiehn V',
    checked: true,
    relations: RELATIONS,
  },
  {
    key: 54,
    name: 'Edgar Collins',
    active: false,
    country: 'pl',
    age: '16',
    address: '5965 Heller Courts',
    status: 'inactive',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 3',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: true,
    editable: 'Eddie Lehner',
    checked: false,
    relations: RELATIONS,
  },
  {
    key: 55,
    name: 'Judith Stoltenberg',
    active: true,
    country: 'us',
    age: '11',
    address: '336 Reagan Orchard',
    status: 'blocked',
    avatar: {
      initials: 'AN',
      icon: <MailM />,
      title: 'Top 10 product add to cart',
      titleLarg: 'Summer Sale 45% OFF',
      status: 'active',
      labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
      label: ['Edited 11 Jun 2019 18:47'],
      labelLoader: ['Dynamic'],
    },
    select: {
      value: 'option 1',
      options: ['option 1', 'option 2', 'option 3'],
    },
    tag: {
      label: 'status',
      shape: TagShape.STATUS_NEUTRAL,
    },
    enabled: false,
    checked: false,
    relations: RELATIONS,
  },
];

export type RowType = (typeof DATA_SOURCE_FULL)[number];
export type RowTypeFull = (typeof DATA_SOURCE_FULL)[number];

type ColumnType = AdditionalColumnData & DSColumnType<RowTypeFull>;

export const COLUMNS_WITH_AVATARS_LINK: ColumnType[] = [
  {
    title: 'Avatar M with label',
    dataIndex: 'avatar',
    key: 'avatar-m',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: (avatar) => {
      return (
        <a href="#">
          <TableCell.AvatarLabelCell
            avatar={
              <ObjectAvatar
                badgeStatus="active"
                size="medium"
                iconComponent={<Icon component={avatar.icon} color="red" />}
              />
            }
            title={avatar.titleLarg}
            labels={avatar.label}
          />
        </a>
      );
    },
  },
];

export const COLUMNS_WITH_TRIGGERS: ColumnType[] = [
  {
    title: 'Select',
    dataIndex: 'select',
    key: 'select',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: (select) => (
      <Select value={select.value}>
        {select.options.map((option: string) => (
          <Select.Option value={option}>{option}</Select.Option>
        ))}
      </Select>
    ),
  },
  {
    title: 'Button',
    dataIndex: 'age',
    key: 'age',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: (age) => (
      <Button type="secondary" onClick={() => alert(age)}>
        Show age
      </Button>
    ),
  },
  {
    title: 'Multiple buttons',
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: () => (
      <TableCell.ActionCell gapSize={8} contentAlign={'left'}>
        <Button onClick={action('click')} type="custom-color" color="green">
          Accept
        </Button>
        <Button onClick={action('click')} type="secondary">
          Decline
        </Button>
      </TableCell.ActionCell>
    ),
  },
  {
    title: 'Editable row',
    dataIndex: 'editable',
    key: 'editable',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: (editable) => (
      <TableCell.EditableCell
        value={editable}
        placeholder={'No data'}
        onChange={action('onChange')}
      />
    ),
  },
  {
    title: 'Copyable',
    dataIndex: 'name',
    key: 'copyable',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: (name) => (
      <TableCell.CopyableCell
        value={name}
        confirmMessage="Copied to clipboard!"
        tooltipTimeout={2000}
      />
    ),
  },
  {
    title: 'Checkbox',
    key: 'checked',
    dataIndex: 'checked',
    icon: { component: <VarTypeBooleanM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: (checked) =>
      chromaticCellRender(<Checkbox withoutPadding checked={checked} />),
  },
  {
    render: () => (
      <TableCell.ActionCell>
        <Button onClick={action('click')} type="secondary" mode="split">
          Edit rule
        </Button>
      </TableCell.ActionCell>
    ),
  },
];

export const COLUMNS_WITH_PROGRESS_BAR: ColumnType[] = [
  {
    title: 'Progress Bar',
    render: () => {
      return (
        <ProgressBar
          showLabel={true}
          containerStyles={{ flexDirection: 'row-reverse', width: '80px' }}
          labelFormatter={(amount, percent) => (
            <div style={{ padding: '8px 0 0 8px' }}>{percent}%</div>
          )}
          percent={60}
          strokeColor={theme.palette['green-500']}
        ></ProgressBar>
      );
    },
  },
];

export const COLUMNS_WITH_LABELS: ColumnType[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    textWrap: 'word-break',
    ellipsis: true,
    key: 'name',
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 1,
    },
    width: '200px',
    sortRender: 'string',
    render: (name, record) => (
      <TableCell.IconLabelCell label={name} disabled={record.inactive} />
    ),
  },
  {
    title: 'Relations',
    dataIndex: 'relations',
    textWrap: 'word-break',
    ellipsis: true,
    key: 'relations',
    width: '120px',
    render: () => (
      <TableCell.LabelsWithShowMore
        items={RELATIONS}
        numberOfVisibleItems={2}
        labelKey={'fieldName'}
        texts={{
          modalTitle: 'Products',
          tooltip: 'Show more',
          searchPlaceholder: 'Search',
          searchClear: 'Clear',
          records: 'records',
        }}
        renderItem={(label, item) => {
          return <TableCell.IconLabelCell label={label} icon={item.icon} />;
        }}
      />
    ),
  },
];

export const COLUMNS_WITH_ICONS: ColumnType[] = [
  {
    title: 'Name with flag',
    key: 'country',
    dataIndex: 'country',
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    width: '240px',
    sorter: {
      compare: (a, b) => a.country.localeCompare(b.country),
      multiple: 2,
    },
    render: (country, record) => {
      return (
        <TableCell.FlagLabelCell countryCode={country} label={record.name} />
      );
    },
  },

  {
    key: 'icon-with-label',
    title: 'Icon with label',
    dataIndex: 'name',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <UserM /> },
    iconTooltip: { component: <InfoFillS /> },
    sorter: (a, b) => a.name.localeCompare(b.name),
    width: '240px',
    render: (name, record) => (
      <TableCell.IconLabelCell
        icon={{ component: <UserM />, color: '#6a7580' }}
        label={name}
        disabled={record.inactive}
      />
    ),
  },
];

export const COLUMNS_WITH_STATUSES: ColumnType[] = [
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeBooleanM /> },
    tooltip: { title: 'Tooltip', description: 'Description' },
    render: (status) => (
      <TableCell.StatusLabelCell status={status} label={status} />
    ),
  },
  {
    title: 'Tag',
    dataIndex: 'tag',
    key: 'tag',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: (tag) => <Tag shape={tag.shape} name={tag.label} />,
  },
  {
    title: 'Tag with icon',
    dataIndex: 'tag',
    key: 'tag',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: (tag) => (
      <TableCell.TagIconCell>
        <Tag shape={tag.shape} name={tag.label} />
        <Icon component={<LockM />} color="#949ea6" />
      </TableCell.TagIconCell>
    ),
  },
  {
    title: 'Enabled',
    dataIndex: 'enabled',
    key: 'enabled',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeBooleanM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: (enabled) => (
      <Tooltip
        title={enabled ? 'Switch off' : 'Switch on'}
        placement={'topLeft'}
      >
        <Switch onChange={action('Status change')} checked={enabled} label="" />
      </Tooltip>
    ),
  },
];

export const COLUMNS_WITH_AVATARS: ColumnType[] = [
  {
    title: 'Avatar S',
    dataIndex: 'avatar',
    key: 'avatar-s',
    width: 100,
    textWrap: 'none',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: (avatar) => {
      return (
        <TableCell.AvatarLabelCell
          avatar={
            <Avatar
              backgroundColor="red"
              backgroundColorHue="050"
              src={AVATAR_IMAGE}
              size="small"
            ></Avatar>
          }
          title="Test"
        />
      );
    },
  },
  {
    title: 'Avatar M with label',
    dataIndex: 'avatar',
    key: 'avatar-m',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: (avatar) => {
      return (
        <TableCell.AvatarLabelCell
          avatarAction={action('Avatar Action')}
          avatar={
            <ObjectAvatar
              badgeStatus="active"
              size="medium"
              iconComponent={<Icon component={avatar.icon} color="red" />}
            />
          }
          title={avatar.title}
        />
      );
    },
  },
  {
    title: 'Avatar with label and description',
    dataIndex: 'avatar',
    key: 'avatar-desc',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: (avatar) => {
      return (
        <TableCell.AvatarLabelCell
          avatar={
            <ObjectAvatar
              badgeStatus="active"
              size="medium"
              iconComponent={<Icon component={avatar.icon} color="red" />}
            />
          }
          title={avatar.titleLarg}
          labels={avatar.label}
        />
      );
    },
  },
  {
    title: 'Avatar with loading state',
    dataIndex: 'avatar',
    key: 'avatar-loading',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: (avatar) => {
      const getPercent = (): number | ReactNode | null => {
        return (
          <div style={{ display: 'flex' }}>
            <Counter />
          </div>
        );
      };
      return (
        <TableCell.AvatarLabelCell
          avatar={
            <ObjectAvatar
              badgeStatus="active"
              iconComponent={<Icon component={avatar.icon} color="red" />}
            />
          }
          title={avatar.titleLarg}
          loader={
            <div
              style={{
                display: 'flex',
                width: '100px',
                alignItems: 'center',
                margin: '-1px 0 -3px 0',
              }}
            >
              <div>{avatar.labelLoader}</div>
              <div>
                <Loader
                  percentFormatter={getPercent}
                  size="S"
                  color="blue"
                  label="Loading..."
                  labelPosition="right"
                />
              </div>
            </div>
          }
        />
      );
    },
  },
  {
    title: 'Avatar with label and meta',
    dataIndex: 'avatar',
    key: 'avatar-meta',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: (avatar) => {
      return (
        <TableCell.AvatarLabelCell
          avatar={
            <ObjectAvatar
              badgeStatus="active"
              size="medium"
              iconComponent={<Icon component={avatar.icon} color="red" />}
            />
          }
          title={avatar.titleLarg}
          labels={avatar.labels}
        />
      );
    },
  },
];

export const COLUMNS_ALL = [
  ...COLUMNS_WITH_LABELS,
  ...COLUMNS_WITH_ICONS,
  ...COLUMNS_WITH_AVATARS,
  ...COLUMNS_WITH_STATUSES,
  ...COLUMNS_WITH_TRIGGERS,
  ...COLUMNS_WITH_PROGRESS_BAR,
];
