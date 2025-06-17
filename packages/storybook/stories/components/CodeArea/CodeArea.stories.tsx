import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import CodeArea, { CodeAreaProps, CodeAreaSyntax } from '@synerise/ds-code-area';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  fixedHeightWrapper,
  REACT_NODE_AS_STRING,
  STRING_CONTROL,
  STYLE_ARG_CONTROL,
} from '../../utils';
import Alert from '@synerise/ds-alert';
import Switch from '@synerise/ds-switch';
import Button from '@synerise/ds-button';
import Icon, { Add3M } from '@synerise/ds-icon';
import { AVAILABLE_SYNTAXES, SAMPLE_DATA } from './CodeArea.data';

type Story = StoryObj<CodeAreaProps>;

export default {
  title: 'Components/CodeArea',
  component: CodeArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [fixedHeightWrapper],
  render: args => {
    const [content, setContent] = useState(args.value);
    const [syntax, setSyntax] = useState(args.currentSyntax);
    const handleChange: CodeAreaProps['onChange'] = (updatedContent, event) => {
      args.onChange?.(updatedContent, event);
      setContent(updatedContent);
    };
    const handleSyntaxChange = (newSyntax: CodeAreaSyntax) => {
      args.onSyntaxChange?.(newSyntax);
      setSyntax(newSyntax);
    };
    return (
      <CodeArea
        {...args}
        value={content}
        onChange={handleChange}
        currentSyntax={syntax}
        onSyntaxChange={handleSyntaxChange}
      />
    );
  },
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    style: STYLE_ARG_CONTROL,
    allowFullscreen: BOOLEAN_CONTROL,
    errorText: REACT_NODE_AS_STRING,
    label: REACT_NODE_AS_STRING,
    value: STRING_CONTROL,
    defaultValue: STRING_CONTROL,
    height: STRING_CONTROL,
    width: STRING_CONTROL,
    fullscreenLabel: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    tooltip: REACT_NODE_AS_STRING,
    readOnly: BOOLEAN_CONTROL,
  },
  args: {
    value: '',
    allowFullscreen: true,
    defaultValue: '// Enter code',
    label: 'Label',
    description: 'Description',
    tooltip: 'Tooltip content',
    texts: {
      fullscreen: 'Fullscreen mode',
    },
    syntaxOptions: AVAILABLE_SYNTAXES,
    currentSyntax: AVAILABLE_SYNTAXES[0].language,
    onChange: fn(),
    onFullscreenChange: fn(),
    onMount: fn(),
    onSyntaxChange: fn(),
    onValidate: fn(),
  },
} as Meta<CodeAreaProps>;

export const Default: Story = {};
export const Populated: Story = {
  args: {
    currentSyntax: 'json',
    value: SAMPLE_DATA
  }
};

export const WithSingleSyntaxOption: Story = {
  args: {
    syntaxOptions: [AVAILABLE_SYNTAXES[0]],
  },
};

export const WithCustomFooterContent: Story = {
  args: {
    renderFooterContent: _props => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Switch label="Code Preview" defaultChecked />
        <Button type="ghost-primary" mode="icon-label" icon={<Icon component={<Add3M />} />}>
          Insert
        </Button>
      </div>
    ),
  },
};

export const WithCounter: Story = {
  args: {
    counter: {
      limit: 300,
      placement: 'top',
    },
  },
};

export const WithSyntaxValidation: Story = {
  args: {
    renderAdditionalDescription: ({ isValid }) =>
      isValid ? (
        <Alert.InlineAlert type="success" message="Valid Syntax" />
      ) : (
        <Alert.InlineAlert type="alert" message="Invalid Syntax" />
      ),
  },
};

export const CustomFullscreenLabel: Story = {
  args: {
    fullscreenLabel: 'Fullscreen Label',
  },
};

export const Readonly: Story = {
  args: {
    ...WithCustomFooterContent.args,
    ...WithCounter.args,
    ...WithSyntaxValidation.args,
    readOnly: true,
  },
};

export const WithErrorText: Story = {
  args: {
    ...WithCustomFooterContent.args,
    ...WithCounter.args,
    ...WithSyntaxValidation.args,
    errorText: 'An error has occurred'
  },
};
