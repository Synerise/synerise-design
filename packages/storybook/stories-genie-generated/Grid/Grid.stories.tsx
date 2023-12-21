import type {
  Meta,
  StoryObj
} from '@storybook/react';
import Grid, {
  GridProps,
  GridContext
} from './Grid';
const meta: Meta < GridProps > = {
  title: 'Grid',
  component: Grid
};
export default meta;
const excludedProps = ['gutter', 'style'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < GridProps > ;
const StoryTemplate: Story = {
  render: (args) => {
    const {
      children,
      gutter,
      style
    } = args;
    return (<Grid gutter={gutter} style={style}>
        {children}
      </Grid>);
  }
};
export const Primary = {
    ...StoryTemplate,
    args: {
      gutter: 16,
      style: {},
      children: (<GridContext.Provider value={{ dimensions: { width: 1200, height: 800 } }}>
        <Grid.Item>Item 1</Grid.Item> < Grid.Item > Item 2 < /Grid.Item> < Grid.Item > Item 3 < /Grid.Item > < /GridContext.Provider>)
      }
    };