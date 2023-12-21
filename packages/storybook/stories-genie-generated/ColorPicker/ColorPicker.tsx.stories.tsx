import type {
  Meta,
  StoryObj
} from '@storybook/react';
import ColorPicker from './ColorPicker';
const meta: Meta < ColorPicker > = {
  title: 'Components/Color Picker',
  component: ColorPicker,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < ColorPicker > ;
const StoryTemplate: Story = {
  render: (args) => <ColorPicker {...args} />,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    value: '#ffffff',
    maxWidth: 228 placeholder: 'Enter color name or hex code',
    onChange: (colorValue) => console.log(colorValue),
    colors: [],
    onSaveColors: (colorsArray) => console.log(colorsArray),
    infix: (props) => <></>,
    inputProps: {},
    maxSavedColors: 9 tooltip: {
      copy: 'Copy color to clipboard',
      copied: 'Copied!'
    },
    isShownSavedColors: "true",
    size: "M",
    errorText: "Error message here",
    description: "Description of the field"
  }
}