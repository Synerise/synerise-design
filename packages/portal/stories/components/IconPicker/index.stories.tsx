import * as React from 'react';

import IconPicker from '@synerise/ds-icon-picker';
import Button from "@synerise/ds-button/dist/Button";
import Icon from "@synerise/ds-icon/dist/Icon";
import {
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
  ArrowUpM
} from "@synerise/ds-icon/dist/icons";
import Avatar from "@synerise/ds-avatar/dist/Avatar";
import theme from "@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme";

let array = [];

const Avatars = () => {
  for (let i = 0; i <= 15; i++) {
    const src = `https://api.adorable.io/avatars/32/${Math.ceil(Math.random() * 100)}`;

    array.push({
      item: <Avatar shape="square" src={src}/>
    });
  }
  return array;
};
Avatars();

const data =
  [
    {
      category: 'arrows',
      items: [
        {item: <Icon component={<ArrowDownCircleM/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowLdCircleM/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowLdM/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowDownS/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowDragM/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowDownM/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowLdS/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowLeftCircleM/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowLuM/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowLuCircleM/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowLeftS/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowLeftM/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowRdCircleM/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowRdM/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowRdS/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowRuCircleM/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowLuS/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowRuM/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowRightM/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowRightS/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowRightCircleM/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowRuS/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowUpS/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowUpCircleM/>} color={theme.palette['grey-600']}/>},{item: <Icon component={<ArrowUpM/>} color={theme.palette['grey-600']}/>},
      ],
    },
    {
      category: 'emoji',
      items: [
        {item: '😀'}, {item: '😃'}, {item: '😄'}, {item: '😁'}, {item: '😆'}, {item: '😅'}, {item: '🤣'}, {item: '😂'}, {item: '🙂'}, {item: '🙃'}, {item: '😉'}, {item: '😊'}, {item: '😇'}, {item: '🥰'}, {item: '😍'}, {item: '🤩'}, {item: '😘'}, {item: '😗'}, {item: '😚'}, {item: '😙'}, {item: '😋'}, {item: '😛'}, {item: '😜'}, {item: '🤪'}, {item: '😝'}, {item: '🤑'}, {item: '🤗'}, {item: '🤭'}, {item: '🤫'}, {item: '🤔'}, {item: '🤐'}, {item: '🤨'}, {item: '😐'}, {item: '😑'}, {item: '😶'}, {item: '😏'}, {item: '😒'}, {item: '🙄'}, {item: '😬'}, {item: '🤥'}, {item: '😌'}, {item: '😔'}, {item: '😪'}, {item: '🤤'}, {item: '😴'}, {item: '😷'}, {item: '🤒'}, {item: '🤕'}, {item: '🤢'}, {item: '🤮'}, {item: '🤧'}, {item: '🥵'}, {item: '🥶'}, {item: '🥴'}, {item: '😵'}, {item: '🤯'}, {item: '🤠'}, {item: '🥳'}, {item: '😎'}, {item: '🤓'}, {item: '🧐'}, {item: '😕'}, {item: '😟'}, {item: '🙁'}, {item: '😮'}, {item: '😯'}, {item: '😲'}, {item: '😳'}, {item: '🥺'}, {item: '😦'}, {item: '😧'}, {item: '😨'}, {item: '😰'}, {item: '😥'}, {item: '😢'}, {item: '😭'}, {item: '😱'}, {item: '😖'}, {item: '😣'}, {item: '😞'}, {item: '😓'}, {item: '😩'}, {item: '😫'}, {item: '😤'}, {item: '😡'}, {item: '😠'}, {item: '🤬'},
      ],
    },
    {
      category: 'avatar',
      items: array,
    },
  ];

const decorator = (storyFn) => (
  <div style={{display: 'flex', paddingTop: '100px', justifyContent: 'center'}}>
    {storyFn()}
  </div>
);

const WrapperStyle = {
  width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
};

const SelectedStyle = {
  width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start'
};

const stories = {
  default: () => {
    const [selectedIcon, setSelectedIcon] = React.useState<React.ReactNode>(null);

    return (
      <div style={WrapperStyle}>
        <div style={SelectedStyle}>
          <span>Selected Icon:&nbsp;</span>
          { selectedIcon }
        </div>
        <IconPicker
          button={<Button type="primary" mode='icon-label'><Icon component={<Add3M/>}/>Add icon</Button>}
          data={data}
          placeholder={"search"}
          onSelect={(value: React.ReactNode): void => setSelectedIcon(value)}
          trigger={["click"]}
        />
      </div>
    )
  }
};

export default {
  name: 'Components|IconPicker',
  config: {},
  withoutCenter: true,
  decorator,
  stories,
  Component: IconPicker,
}
