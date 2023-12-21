{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  //import component
  import Result, {
    ResultProps
  } from './Result';
  const meta: Meta < ResultProps > = {
    title: 'Storybook Component/Result',
    component: Result,
  };
  export default meta;
  const excludedProps = [];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < ResultProps > ;
  const StoryTemplate: Story = {
    render: (args) => <Result {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      className: '',
      type: 'info',
      title: 'Information',
      description: 'This is an information message.',
      panel: null,
      buttons: null,
      customIcon: null,
      noSearchResults: false,
    },
  };
  export const Warning = {
    ...StoryTemplate,
    args: {
      ...Primary.args,
      type: 'warning',
      title: 'Warning',
      description: 'This is a warning message.',
    },
  };
  export const Error = {
    ...StoryTemplate,
    args: {
      ...Primary.args,
      type: 'error',
      title: 'Error',
      description: 'This is an error message.',
    },
  };
  export const Success = {
    ...StoryTemplate,
    args: {
      ...Primary.args,
      type: 'success',
      title: 'Success',
      description: 'This is a success message.',
    },
  };
  export const Progress = {
    ...StoryTemplate,
    args: {
      ...Primary.args,
      type: 'progress',
      title: 'In Progress',
      description: 'This is a progress message.',
    },
  };
  export const NoResults = {
    ...StoryTemplate,
    args: {
      ...Primary.args,
      type: 'no-results',
      title: 'No Results',
      description: 'No results found.',
    },
  };
}