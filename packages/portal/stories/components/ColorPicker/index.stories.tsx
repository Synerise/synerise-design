import * as React from 'react';
import { boolean, number, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ColorPicker from '@synerise/ds-color-picker';

const ColorPickerSizes = {
  Small: 'S',
  Medium: 'M',
  Large: 'L',
};

const stories = {
  default: () => {
    const [color, setColor] = React.useState('#00ffff');
    const size = select('Size of ColorPicker', ColorPickerSizes, 'M');
    const userColor = text('Color', '#00ffff');
    const tooltip = {
      copy: text('Tooltip copy text', 'Copy to clipboard'),
      copied: text('Tooltip copied text', 'Copied!'),
    };
    const setError = boolean('Set error', false);
    const setSavedColors = boolean('Set saved colors', false);
    const maxWidth = number('Set picker modal max width', 228);
    React.useEffect(() => {
      setColor(userColor);
    }, [userColor]);
    return (
      <ColorPicker
        maxWidth={maxWidth}
        value={color}
        size={size as 'S' | 'M' | 'L' | undefined}
        tooltip={tooltip}
        isShownSavedColors={setSavedColors}
        description={text('Description', 'Description')}
        errorText={setError ? text('Error text', 'Error') : undefined}
        onChange={value => {
          setColor(value);
          action('onChange')(value);
        }}
        inputProps={{
          label: text('Label', 'Label'),
        }}
      />
    );
  },
  minimalistic: () => {
    const tooltip = {
      copy: text('Tooltip copy text', 'Copy to clipboard'),
      copied: text('Tooltip copied text', 'Copied!'),
    };
    return <ColorPicker tooltip={tooltip} onChange={action('onChange')} />;
  },
  savedColors: () => {
    const tooltip = {
      copy: text('Tooltip copy text', 'Copy to clipboard'),
      copied: text('Tooltip copied text', 'Copied!'),
    };
    const [colors, setSavedColors] = React.useState(['#00ffff', '#fff', '#123123']);
    return <ColorPicker tooltip={tooltip} colors={colors} onSaveColors={setSavedColors} isShownSavedColors onChange={action('onChange')} />;
  },
};

export default {
  name: 'Components/Pickers/ColorPicker',
  stories,
  Component: ColorPicker,
};
