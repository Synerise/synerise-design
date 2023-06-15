import * as React from 'react';

import IconPicker from '@synerise/ds-icon-picker';
import Button from '@synerise/ds-button';
import Icon, {
  Add3M,
  ArrowDownCircleM,
  ArrowLdCircleM,
  ArrowLdM,
  ArrowDownS,
  ArrowDragM,
  ArrowDownM,
  ArrowLdS,
  ArrowLeftCircleM,
  ArrowLuM,
  ArrowLuCircleM,
  ArrowLeftS,
  ArrowLeftM,
  ArrowRdCircleM,
  ArrowRdM,
  ArrowRdS,
  ArrowRuCircleM,
  ArrowLuS,
  ArrowRuM,
  ArrowRightM,
  ArrowRightS,
  ArrowRightCircleM,
  ArrowRuS,
  ArrowUpS,
  ArrowUpCircleM,
  ArrowUpM,
} from '@synerise/ds-icon';
import Avatar from '@synerise/ds-avatar/dist/Avatar';
import { theme } from '@synerise/ds-core';

import avatar1 from '../../assets/avatars/av-anonym-001.png';
import avatar2 from '../../assets/avatars/av-anonym-002.png';
import avatar3 from '../../assets/avatars/av-anonym-003.png';
import avatar4 from '../../assets/avatars/av-anonym-004.png';
import avatar5 from '../../assets/avatars/av-anonym-005.png';
import avatar6 from '../../assets/avatars/av-anonym-006.png';
import avatar7 from '../../assets/avatars/av-anonym-007.png';
import avatar8 from '../../assets/avatars/av-anonym-008.png';
import avatar9 from '../../assets/avatars/av-anonym-009.png';
import avatar10 from '../../assets/avatars/av-anonym-010.png';
import avatar11 from '../../assets/avatars/av-anonym-011.png';
import avatar12 from '../../assets/avatars/av-anonym-012.png';

const frequentlyUsed = [];

const data = [
  {
    category: 'frequently used',
    items: frequentlyUsed,
  },
  {
    category: 'arrows',
    items: [
      { item: <Icon component={<ArrowDownCircleM />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowLdCircleM />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowLdM />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowDownS />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowDragM />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowDownM />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowLdS />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowLeftCircleM />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowLuM />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowLuCircleM />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowLeftS />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowLeftM />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowRdCircleM />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowRdM />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowRdS />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowRuCircleM />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowLuS />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowRuM />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowRightM />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowRightS />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowRightCircleM />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowRuS />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowUpS />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowUpCircleM />} color={theme.palette['grey-600']} /> },
      { item: <Icon component={<ArrowUpM />} color={theme.palette['grey-600']} /> },
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
        item: (
          <Avatar src={avatar1} size="small" shape="square" />
        ),
      },
      {
        item: (
          <Avatar src={avatar2} size="small" shape="square" />
        ),
      },
      {
        item: (
          <Avatar src={avatar3} size="small" shape="square" />
        ),
      },
      {
        item: (
          <Avatar src={avatar4} size="small" shape="square" />
        ),
      },
      {
        item: (
          <Avatar src={avatar5} size="small" shape="square" />
        ),
      },
      {
        item: (
          <Avatar src={avatar6} size="small" shape="square" />
        ),
      },
      {
        item: (
          <Avatar src={avatar7} size="small" shape="square" />
        ),
      },
      {
        item: (
          <Avatar src={avatar8} size="small" shape="square" />
        ),
      },
      {
        item: (
          <Avatar src={avatar9} size="small" shape="square" />
        ),
      },
      {
        item: (
          <Avatar src={avatar10} size="small" shape="square" />
        ),
      },
      {
        item: (
          <Avatar src={avatar11} size="small" shape="square" />
        ),
      },
      {
        item: (
          <Avatar src={avatar12} size="small" shape="square" />
        ),
      },
    ],
  },
];



const decorator = storyFn => (
  <div style={{ display: 'flex', paddingTop: '100px', justifyContent: 'center' }}>{storyFn()}</div>
);

const WrapperStyle = {
  width: '30%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const SelectedStyle = {
  width: '60%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
};

const stories = {
  default: () => {
    const [selectedIcon, setSelectedIcon] = React.useState<React.ReactNode>(null);
    const maxFrequentlyUsedIcons = 6;

    const onSelect = value => {
      setSelectedIcon(value);
      frequentlyUsed.unshift({ item: value });
      frequentlyUsed.length > maxFrequentlyUsedIcons && frequentlyUsed.pop();
    };

    return (
      <div style={WrapperStyle}>
        <div style={SelectedStyle}>
          <span>Selected Icon:&nbsp;</span>
          {selectedIcon}
        </div>
        <IconPicker
          button={
            <Button type="primary" mode="icon-label">
              <Icon component={<Add3M />} />
              Add icon
            </Button>
          }
          data={data}
          placeholder={'search'}
          onSelect={(value: React.ReactNode): void => onSelect(value)}
          trigger={['click']}
          noResultMsg={'No results'}
        />
      </div>
    );
  },
};

export default {
  name: 'Components/Pickers/IconPicker',
  config: {},
  withoutCenter: true,
  decorator,
  stories,
  Component: IconPicker,
};
