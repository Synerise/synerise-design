import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import Badge from '@synerise/ds-badge';
import Avatar from '@synerise/ds-avatar';
import * as S from './AvatarGroup.styles';
import GroupModal from './Modal/GroupModal';
import {
  AvatarGroupProps
} from './AvatarGroup.types';
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < AvatarGroupProps > ;
export const meta: Meta < AvatarGroupProps > = {
    title: "Storybook Component for Avatar Group", //title of component,  			    component: AvatarGroup //component     };     export default meta;     	const StoryTemplate: Story = {      render: (args) => <AvatarGroup {...args}/>    };   export const Primary = {     ...StoryTemplate,    args : {        dataSource:[],       size : "medium",        hasStatus : false,         numberOfVisibleUsers : 3,          moreInfoTooltip:"more info",             groupModal:{},