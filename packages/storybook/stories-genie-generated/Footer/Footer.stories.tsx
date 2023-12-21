import * as React from 'react';
import * as S from './Footer.styles';
export type FooterProps = {
  style ? : React.CSSProperties;
  className ? : string;
};
const Footer: React.FC < FooterProps > = ({
  children,
  className,
  style
}) => (<S.Footer style={style} className={className}>
    {children}
  </S.Footer>);
export default Footer;
// Storybook component
import type {
  Meta,
  StoryObj
} from '@storybook/react';
import React from 'react';
import Footer, {
  FooterProps
} from './Footer';
const meta: Meta < FooterProps > = {
  title: 'Footer',
  component: Footer,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < FooterProps > ;
const StoryTemplate: Story = {
  render: (args) => <Footer {...args}>This is the Footer component</Footer>,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    style: {
      backgroundColor: 'lightgray',
      padding: '10px'
    },
    className: 'footer',
  },
};