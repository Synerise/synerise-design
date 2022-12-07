import * as React from 'react';
import { HexColorPicker as ReactColorful } from 'react-colorful';
import Select from '@synerise/ds-select';
import Button from '@synerise/ds-button';
import Divider from '@synerise/ds-divider';
import { Input } from '@synerise/ds-input';
import Tags, { TagShape } from '@synerise/ds-tags';
import Icon, { FormulaPlusM } from '@synerise/ds-icon';
import ColorPickerStyles from './ColorPicker.styles';
import { ColorPickerProps } from './ColorPicker.types';

export function ColorPicker({
  value = '#ffffff',
  onChange,
  colors = [],
  onSaveColors,
  infix = (): JSX.Element => <></>,
  placeholder,
  selectProps,
  maxSavedColors = 10,
}: ColorPickerProps): JSX.Element {
  const [color, setColor] = React.useState(value);
  const onChangeColor = (colorValue: string): void => {
    setColor(colorValue);
    onChange && onChange(colorValue);
  };
  const [savedColors, setSavedColors] = React.useState(colors);
  const saveColor = (): void => {
    setSavedColors(ar => {
      const colorsArray = (color ? [color, ...ar] : ar).slice(0, maxSavedColors);
      onSaveColors && onSaveColors(colorsArray);
      return colorsArray;
    });
  };
  const swatchSection = (
    <>
      <Button mode="single-icon" onClick={saveColor}>
        <Icon component={<FormulaPlusM />} />
      </Button>
      {infix({ color, setColor: onChangeColor })}
      {savedColors.length > 0 && (
        <Tags
          tagShape={TagShape.SINGLE_CHARACTER_SQUARE}
          selected={savedColors.map((colorEntry, i) => ({
            id: i,
            key: `color-${i}`,
            name: '',
            color: colorEntry,
            onClick(): void {
              onChangeColor(colorEntry);
            },
          }))}
          disabled={false}
        />
      )}
    </>
  );
  const dropdown = (
    <ColorPickerStyles.Container>
      <ReactColorful color={color} onChange={onChangeColor} />
      <ColorPickerStyles.Subcontainer>
        <Input
          value={color}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setColor(ev.target.value)}
          placeholder={placeholder}
        />
        <Divider />
        {swatchSection}
      </ColorPickerStyles.Subcontainer>
    </ColorPickerStyles.Container>
  );
  return (
    <>
      <Select
        showSearch
        showArrow={false}
        value={color}
        dropdownMatchSelectWidth={false}
        filterOption={false}
        dropdownRender={(): JSX.Element => dropdown}
        {...selectProps}
      />
    </>
  );
}

export default ColorPicker;
