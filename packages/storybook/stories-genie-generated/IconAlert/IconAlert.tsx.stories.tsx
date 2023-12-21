import Icon, {
  Check2M,
  WarningFillM,
  InfoM
} from '@synerise/ds-icon';
import * as React from 'react';
import {
  IconAlertProps,
  IconAlertType
} from './IconAlert.types';
import * as S from './IconAlert.styles';
const ICONS: Record < IconAlertType, React.ReactNode > = {
  success: <Check2M />,
  alert: <WarningFillM />,
  warning: <WarningFillM />,
  info: <InfoM />,
};
import type {
  Meta
} from "@storybook/react";
const meta: Meta < IconAlertProps > = { //type of component props passed to storybook meta object  
  title: "Icon Alert", //title of component to be shown in storybook sidebar  
  component: IconAlert //component passed to the storybook meta object  
};
export default meta;
const excludedprops = ["withLink", " withEmphasis", "hoverButton"]; //excluded props in this particular component which are not required for rendering the stories in storybook    
const excludeRegexp = new RegExp(`(${excludedprops.join('|')})`, 'g'); //regex expression for excluding the unwanted props while rendering the stories    
type Story = StoryObj < IconAlertProps > ; //type declared for passing it to our stories template    
const StoryTemplate: Story = {
    render: (args) => //rendering the components with args passed here      return (        <S.IconfocusWrapper            ...args            className="ds-inline-alert"          >        	{icon && (customIcon || <Icon icon={icon}/>)}         	{message && (            	<S.Message>                                message              </S.Message>)        	}       </S..IconfocusWrapper>)    }};export const Primary:{...StoryTemplate , args:{type:"warning", customicon:, message:"This is a warning alert.", disabled:, ...rest}};