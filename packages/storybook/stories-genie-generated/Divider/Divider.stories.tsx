import React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdDivider from 'antd/lib/divider';
import * as S from './Divider.styles';
import {
  DividerProps
} from './Divider.types';
import type {
  Meta,
  StoryObj
} from '@storybook/react';
const meta: Meta < DividerProps > = {
    title: "Storybook Component for Divider", //title of component, 
    component: Divider //component  }; export default meta;
    const excludedProps = [];
    const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
    type Story = StoryObj < DividerProps > ;
    const StoryTemplate: Story = {
      render: (args) => <div><Divider marginTop={args.marginTop} marginBottom={args.marginBottom} style={args.style} labelAbove={args.labelAbove} labelBelow={args.labelBelow} /></div>
    }; //render component   export const Primary = { ...StoryTemplate, args: { marginTop:"20px",    //add component's props marginBottom:"10px", style:{}, labelAbove:"Label Above", labelBelow:"Label Below" }};