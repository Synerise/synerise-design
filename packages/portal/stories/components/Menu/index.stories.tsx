import * as React from 'react';
import Icon from '@synerise/ds-icon';
import ShowM from '@synerise/ds-icon/dist/icons/ShowM';
import TrashM from '@synerise/ds-icon/dist/icons/TrashM';
import Menu from '@synerise/ds-menu';
import Avatar from "@synerise/ds-avatar/";
import { boolean, select, text } from '@storybook/addon-knobs';
import Badge from '@synerise/ds-badge';
import Checkbox from '@synerise/ds-checkbox/dist';
import {
  CheckS,
  CloseS,
  CopyClipboardM,
  EditS, FolderM,
  UserS,
  WarningFillS,
} from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Label from '@synerise/ds-input/dist/Label/Label';
import AntdSwitch, { SwitchProps } from 'antd/lib/switch';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';

const decorator = (props) => (
  <div style={{ width: '200px' }}>
    <div style={{ background: "rgba(0,0,0,0)", width: '200px' }}>
      <Menu {...props} />
    </div>
  </div>
);
const ExtendedAntdSwitchComponent = (AntdSwitch as any) as React.ComponentType<SwitchProps & { id: string }>;
const suffixType = {
  renameAndDelete:'rename,delete',
  delete:'delete',
  check:'check',
  warning:'warning',
  icon:'icon',
  switch:'switch',
  label:'label',
  none:'none',
}
const iconPrefixType = {
  singleIcon:'singleIcon',
  twoIcons:'twoIcons',
}
function renderSuffix(suffixElementType: string){
  switch(suffixElementType){
    case suffixType.renameAndDelete:
      return <React.Fragment>
        <Icon color={theme.palette['grey-600']} component={<EditS />}/>
        <Icon color={theme.palette['red-600']} component={<CloseS />}/>
      </React.Fragment>
    case suffixType.delete:
      return <Icon color={theme.palette['red-600']} component={<CloseS />}/>;
    case suffixType.check:
      return <Icon color={theme.palette['green-600']} component={<CheckS />}/>;
    case suffixType.warning:
      return <Icon color={theme.palette['orange-600']} component={<WarningFillS />}/>;
    case suffixType.icon:
      return <Icon color={theme.palette['grey-600']} component={<UserS />}/>;
    case suffixType.label:
      return <Label label={
        <div style={{lineHeight:'18px',color:"#6a7580"}}>
         <span>[key:value]</span>
        </div>}/>
    case suffixType.switch:
      return <React.Fragment>
        <ExtendedAntdSwitchComponent id={"toggle"}/>
      </React.Fragment>
    case suffixType.none:
      return null;
    default:
      return null;
      break;
  }
}
const renderPrefixIcon = (prefixIconType:string) =>{
  switch(prefixIconType) {
    case iconPrefixType.twoIcons:
      return <React.Fragment>
        <Icon component={<FolderM/>}/>
        <Icon style={{marginLeft:'8px'}} component={<ShowM/>}/>
      </React.Fragment>
      break;
    default:
      return <Icon component={<ShowM/>}/>
  }
}
const getDefaultProps = () => ({
  disabled: boolean('Set disabled', false),
});
const getSuffixElement = () =>{
  const selectedSuffix = select('Set suffix type',suffixType,suffixType.none);
  const suffixElement = renderSuffix(selectedSuffix);
  return suffixElement;
}

const defaultProps = getDefaultProps();
const textPlaceholder = "Option";
const descriptionPlaceholder = "Description";
const imgSrc = 'https://www.w3schools.com/howto/img_avatar.png';

let simpleText = [
  [
    { text: 'Option'}
  ],
];

const textWithIcon = [
  [
    { text: textPlaceholder, disabled: defaultProps.disabled },
  ],
];
const attachKnobsToDataSource = (data) => (
  data.map(item => (
    {...item,
      text: text('Set text',textPlaceholder),
      disabled: boolean('Set disabled', false),
      ...item.description && {description:text('Set description',descriptionPlaceholder)},
      ...item.copyValue && {copyValue:item.text},

    }
    ))

);
const ordered = [
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
];
const largeList = [
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
    { text: 'Option',  },
];
const parent = [
    { text: 'Parent 1',
      subMenu: [
        { text: 'Child 1',ordered: true, },
        { text: 'Child 2',ordered: true, },
        { text: 'Child 3', }
      ],

    },
    { text: 'Parent 2',
      subMenu: [
        { text: 'Child 1', },
        { text: 'Child 2', },
        { text: 'Child 3', }
      ],

    }
];

const avatar = [
    { text: 'Option',description:'desc', prefixel: <Badge status="active"><Avatar size="small" backgroundColor="green" backgroundColorHue="400" shape="square">AK</Avatar></Badge>  },
];

const avatarSmall = [
    { text: 'Option', prefixel: <Badge status="active"><Avatar size="small" src={imgSrc} shape="circle" /></Badge>, description: 'description', suffixel:renderSuffix((suffixType.delete))},
];

const avatarMedium = [
    { text: 'Option', prefixel: <Avatar size="medium" src={imgSrc} shape="circle" />, description: 'description'},
];

const deleteState = [
    { text: 'Delete', danger: true, prefixel: <Icon onClick={()=>{alert('Clicked')}} component={<TrashM />} /> },
];

const withCheckBox = [
    {
    },
]
const withCopyable = [
    {
      text:"Item",
      prefixel: <Icon component={<CopyClipboardM />} />,
      copyable:true,
      copyHint: "Copy to clipboard",
      copyValue: "Item",
    },
]
const stories = {
  withLabel: ()=>{
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: [attachKnobsToDataSource(simpleText)],
    suffixel: getSuffixElement(),
    ...defaultProps
  } as object;
  return decorator(props)
  },
  withIconAndLabel: ()=>{
  const defaultProps = getDefaultProps();
    const singleIcon = select('Set prefix type',iconPrefixType,iconPrefixType.singleIcon);
    const props = {
    dataSource: [attachKnobsToDataSource(textWithIcon)],
    prefixel: renderPrefixIcon(singleIcon),
    suffixel: getSuffixElement(),
    ...defaultProps
  } as object;
  return decorator(props)
  },
  withCheckbox: ()=>{
    const defaultProps = getDefaultProps();
    const [isChecked,setChecked] = React.useState(false);
    const props = {
      dataSource: [attachKnobsToDataSource(withCheckBox)],
      suffixel: getSuffixElement(),
      prefixel: <Checkbox checked={isChecked} onChange={()=>setChecked(!isChecked)}/>,
      onClick: ()=> setChecked(!isChecked),
      ...defaultProps
    };
    return decorator(props)
  },
  withOrderedList: ()=>{
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: [attachKnobsToDataSource(ordered)],
    ordered: true,
    ...defaultProps
  } as object;
  return decorator(props)
  },
  withLargeList: ()=>{
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: [attachKnobsToDataSource(largeList)],
    ordered: true,
    ...defaultProps
  } as object;
  return decorator(props)
  },
  withParent: ()=>{
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: [attachKnobsToDataSource(parent)],
    ...defaultProps
  } as object;
  return decorator(props)
  },
  withSquareAvatar: ()=>{
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: [attachKnobsToDataSource(avatar)],
    suffixel: getSuffixElement(),
    ...defaultProps
  } as object;
  return decorator(props)
  },
  withSmallAvatar: ()=>{
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: [attachKnobsToDataSource(avatarSmall)],
    ...defaultProps
  } as object;
  return decorator(props)
  },
  withMediumAvatar: ()=>{
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: [attachKnobsToDataSource(avatarMedium)],
    ...defaultProps
  } as object;
  return decorator(props)
  },
  withDelete: ()=>{
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: [attachKnobsToDataSource(deleteState)],
    ...defaultProps
  } as object;
  return decorator(props)
  },
  withSwitch: ()=>{
  const defaultProps = getDefaultProps();
  const [isChecked,setChecked] = React.useState(false);
  const prefixel =  <ExtendedAntdSwitchComponent id={"toggle"} checked={isChecked} onChange={()=>setChecked(!isChecked)}/>
  const text = isChecked? "Check" : "Not Checked";
    const props = {
    dataSource: [attachKnobsToDataSource(simpleText)],
    prefixel,
      text,
    ...defaultProps
  } as object;
  return decorator(props)
  },
  withCopyable: ()=>{
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: [attachKnobsToDataSource(withCopyable)],
    ...defaultProps
  } as object;
  return (<Tooltip
        type="default"
        trigger={'click'}
        title={"Copied!"}
         >
      <div style={{ background: 'rgba(0,0,0,0)', width: '200px' }}>
        <Menu {...props} />
    </div>
  </Tooltip>)
  },
};

export default {
  name: 'Components|Menu',
  stories,
  Component: Menu,
}
