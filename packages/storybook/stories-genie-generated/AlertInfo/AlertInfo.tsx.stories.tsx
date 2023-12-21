import * as React from 'react';
import Icon, {
  CheckL,
  WarningL,
  WarningXl,
  CheckXl
} from '@synerise/ds-icon';
import {
  AlertInfoProps,
  AlertSize
} from './AlertInfo.types';
import * as S from './AlertInfo.styles';
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < AlertInfoProps > ;
const meta: Meta < Story > = {
  title: "Alert Info",
  component: AlertInfo //component name here! 
};
export default meta;
const mapSizeToPx = {
  [AlertSize.SMALL]: 48,
  [AlertSize.MEDIUM]: 96
}; //additional props here!   
export const Primary = { //primary story with args given   
    render: (args) => <S.AlertWrapper mode={args.mode} className="ds-alert-info" labelPosition={args.labelPosition}>      
      <S.StatusIconContainer iconColor={mapTypeToStatus[args].iconColor}>            //render component with args provided        \          \           \         \              /               /                /                  /                   |            |             |           |                              V                V                V                  V                    <Icon component={<mapTypeToStatus[type].IconComponent />} size={mapSizeToPx[size]} />       </S.StatusIconContainer></S