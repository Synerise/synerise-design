import * as React from 'react';
import classnames from 'classnames';
import * as S from './Description.styles';
import {
  DescriptionProps
} from './Description.types';
const meta: Meta < DescriptionProps > = {
  title: "Description Component",
  component: Description
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < DescriptionProps > ;
const StoryTemplate: Story = {
    render: (args) => <Description {...args} /> //render component  					    };  
    export const Primary = {
      ...StoryTemplate,
      args: {
        type: 'table',
        children: 'This is a description',
        ratio: '30-70'
      }
    };