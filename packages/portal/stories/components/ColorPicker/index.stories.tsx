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
    const [color, setColor] = React.useState('#ffffff');
    const size = select('Size of ColorPicker', ColorPickerSizes, 'M');
    const userColor = text('Color', '#ffffff');
    const tooltip = text('Tooltip text', 'Copy to clipboard');
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
        tooltipText={tooltip}
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
    const tooltip = text('Tooltip text', 'Copy to clipboard');
    return <ColorPicker tooltipText={tooltip} onChange={action('onChange')} />;
  },
  savedColors: () => {
    const tooltip = text('Tooltip text', 'Copy to clipboard');
    const [colors, setSavedColors] = React.useState(['#00ffff', '#fff', '#123123']);
    return <ColorPicker tooltipText={tooltip} colors={colors} onSaveColors={setSavedColors} isShownSavedColors />;
  },
};

export default {
  name: 'Components/Pickers/ColorPicker',
  stories,
  Component: ColorPicker,
};
