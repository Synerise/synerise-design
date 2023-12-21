import * as React from 'react';
import Icon, {
  Check2M,
  WarningFillM,
  InfoM
} from '@synerise/ds-icon';
import {
  InlineAlertProps,
  InlineAlertType
} from './InlineAlert.types';
import * as S from './InlineAlert.styles';
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < InlineAlertProps > ;
const meta: Meta < InlineAlertProps > = {
  title: "Inline Alert",
  component: InlineAlert,
};
export default meta;
const ICONS: Record < InlineAlertType, React.ReactNode > = {
  success: <Check2M />,
  alert: <WarningFillM />,
  warning: <WarningFillM />,
  info: <InfoM />
};
export const Primary = {
    render: (args) => {
        return (<S.InlisteAlerteWrapper type={args} className="ds-inline-alert">                   <Icon component={ICONS[args]}/>                    <S.Message>{message}</S.Message>                 </S.ListeAlerteWrapper>)            },             args:{                  message:'',                  type:"warning"              }          }