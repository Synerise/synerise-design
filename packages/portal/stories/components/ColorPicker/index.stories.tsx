import * as React from 'react';
import { boolean, number, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ColorPicker from '@synerise/ds-color-picker';

const stories = {
  default: () => {
    const [color, setColor] = React.useState("#ffffff");
    const userColor = text('Color', '#ffffff')
    React.useEffect(() => {
      setColor(userColor)
    }, [userColor]);
    return <ColorPicker
      value={color}
      onChange={(value) => {
          setColor(value)
          action('onChange')(value)
      }}
      selectProps={{
        defaultOpen: boolean('Popup open by default', true),
      }}
      {...boolean('Customize max saved colors', true) ? {
        maxSavedColors: number('Max saved colors', 10),
      }: {}}
    />
  },
  minimalistic: () => {
    return <ColorPicker onChange={action('onChange')}/>
  },
  savedColors: () => {
    const [colors, setSavedColors] = React.useState(["#00ffff", '#fff', '#123123']);
    return <ColorPicker colors={colors} onSaveColors={setSavedColors}/>
  },
};

export default {
  name: 'Components/Pickers/ColorPicker',
  stories,
  Component: ColorPicker,
};
