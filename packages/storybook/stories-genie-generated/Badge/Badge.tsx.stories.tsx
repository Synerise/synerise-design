import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import Badge, {
  BadgeProps
} from './Badge.styles';
const meta: Meta < BadgeProps > = {
  title: "Badge",
  component: Badge
};
export default meta;
const excludedProps = ['flag', 'outlined', 'backgroundColor', 'textColor', 'backgroundColorHue', 'textColorHue', 'pulsing', 'customColor'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < BadgeProps > ;
const StoryTemplate: Story = {
    render: (args) => <Badge {...args} />, //render component   };    export const Primary= {      ...StoryTemplate,      args:{        badgeContent:"My badge",        invisible:{value:'false'},       count:{value:'1'}      }    };