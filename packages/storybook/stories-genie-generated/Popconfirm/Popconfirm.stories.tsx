{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import React from 'react';
  import Popconfirm, {
    PopconfirmType
  } from './Popconfirm';
  const meta: Meta < PopconfirmType > = {
    title: 'Components/Popconfirm',
    component: Popconfirm,
  };
  export default meta;
  const excludedProps = ['antdProps'];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < PopconfirmType > ;
  const StoryTemplate: Story = {
    render: (args) => <Popconfirm {...args} />
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      icon: 'icon',
      title: 'Are you sure?',
      description: 'This action cannot be undone.',
      images: ['https://image1.jpg', 'https://image2.jpg', 'https://image3.jpg'],
      imagesAutoplay: true,
      imagesAutoplaySpeed: 5000,
      withLink: <a href="#">Learn more</a>,
      closeIcon: 'close',
      titlePadding: true,
      onCancel: () => console.log('Cancel'),
      cancelButtonProps: {
        type: 'secondary'
      },
      onConfirm: () => console.log('Confirm'),
      okButtonProps: {
        type: 'primary'
      },
      okType: 'primary',
      hideButtons: false,
      cancelText: 'Cancel',
      okText: 'Confirm',
      buttonsAlign: 'right',
      visible: true,
      onVisibleChange: (visible: boolean) => console.log('Visible:', visible)
    }
  }