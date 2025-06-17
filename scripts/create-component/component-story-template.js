const componentStoryTemplate = (componentName, packageName) => {
  return `import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import ${componentName}, { ${componentName}Props } from '${packageName}';

export default {
  component: ${componentName},
  title: 'Components/${componentName}',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: { },
  argsTypes: { },
} as Meta<${componentName}Props>;

export const Default: StoryObj<${componentName}Props> = {};\n`;
};

module.exports = {
  componentStoryTemplate,
};
