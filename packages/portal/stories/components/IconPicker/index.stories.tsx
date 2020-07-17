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

const frequentlyUsed = [];

const data =
  [
    {
      category: 'frequently used',
      items: frequentlyUsed
    },
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
      items: [
        { item: <Avatar shape="circle" src={'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Kurt&hairColor=Platinum&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Blue03&eyeType=Default&eyebrowType=DefaultNatural&mouthType=ScreamOpen&skinColor=Pale'}/>},
        { item: <Avatar shape="circle" src={'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairSides&accessoriesType=Wayfarers&hairColor=PastelPink&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=ShirtVNeck&clotheColor=Gray01&eyeType=Squint&eyebrowType=UpDownNatural&mouthType=Default&skinColor=Brown'}/>},
        { item: <Avatar shape="circle" src={'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairFroBand&accessoriesType=Prescription01&hairColor=SilverGray&facialHairType=Blank&facialHairColor=Black&clotheType=Overall&clotheColor=Pink&eyeType=Dizzy&eyebrowType=Angry&mouthType=Disbelief&skinColor=Yellow'}/>},
        { item: <Avatar shape="circle" src={'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairFrida&accessoriesType=Wayfarers&hairColor=Auburn&facialHairType=Blank&facialHairColor=Platinum&clotheType=BlazerShirt&clotheColor=Blue03&eyeType=Close&eyebrowType=FlatNatural&mouthType=Twinkle&skinColor=DarkBrown'}/>},
        { item: <Avatar shape="circle" src={'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairFrizzle&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=BeardMagestic&facialHairColor=Brown&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=RaisedExcitedNatural&mouthType=Tongue&skinColor=Light'}/>},
        { item: <Avatar shape="circle" src={'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Auburn&facialHairType=MoustacheMagnum&facialHairColor=Auburn&clotheType=ShirtCrewNeck&clotheColor=Pink&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Disbelief&skinColor=Tanned'}/>},
        { item: <Avatar shape="circle" src={'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Hearts&eyebrowType=FlatNatural&mouthType=Tongue&skinColor=Black'}/>},
        { item: <Avatar shape="circle" src={'https://avataaars.io/?avatarStyle=Transparent&topType=Eyepatch&accessoriesType=Prescription02&hairColor=Blonde&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=ShirtScoopNeck&clotheColor=Black&eyeType=Hearts&eyebrowType=Angry&mouthType=Vomit&skinColor=DarkBrown'}/>},
        { item: <Avatar shape="circle" src={'https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat4&accessoriesType=Prescription01&hatColor=Blue03&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Heather&eyeType=WinkWacky&eyebrowType=RaisedExcitedNatural&mouthType=Sad&skinColor=Pale'}/>},
        { item: <Avatar shape="circle" src={'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Prescription02&hatColor=PastelOrange&facialHairType=BeardLight&facialHairColor=Auburn&clotheType=Hoodie&clotheColor=Blue03&eyeType=Close&eyebrowType=DefaultNatural&mouthType=Tongue&skinColor=DarkBrown'}/>},
        { item: <Avatar shape="circle" src={'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight2&accessoriesType=Kurt&hairColor=Blonde&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Gray01&eyeType=WinkWacky&eyebrowType=UnibrowNatural&mouthType=Grimace&skinColor=Light'}/>},
        { item: <Avatar shape="circle" src={'https://avataaars.io/?avatarStyle=Transparent&topType=Hijab&accessoriesType=Blank&hatColor=Blue03&clotheType=CollarSweater&clotheColor=Red&eyeType=Hearts&eyebrowType=SadConcerned&mouthType=Twinkle&skinColor=Pale'}/>},
      ],
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
    const maxFrequentlyUsedIcons = 6;

    const onSelect = (value) => {
      setSelectedIcon(value);
      frequentlyUsed.unshift({ item: value });
      frequentlyUsed.length > maxFrequentlyUsedIcons && frequentlyUsed.pop();
    };

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
          onSelect={(value: React.ReactNode): void => onSelect(value)}
          trigger={["click"]}
          noResultMsg={'No results'}
        />
      </div>
    )
  }
};

export default {
  name: 'Pickers|IconPicker',
  config: {},
  withoutCenter: true,
  decorator,
  stories,
  Component: IconPicker,
}
