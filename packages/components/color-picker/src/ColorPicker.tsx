import * as React from 'react';
import { HexColorPicker as ReactColorful } from 'react-colorful';
import Divider from '@synerise/ds-divider';
import Tags, { TagShape, Tag } from '@synerise/ds-tags';
import Icon, { FormulaPlusM } from '@synerise/ds-icon';
import { CopyClipboardM } from '@synerise/ds-icon/src';
import * as copy from 'copy-to-clipboard';
import Tooltip from '@synerise/ds-tooltip';
import { ColorPickerProps } from './ColorPicker.types';
import ColorPickerStyles from './ColorPicker.styles';

export function ColorPicker({
  value = '#ffffff',
  onChange,
  colors = [],
  onSaveColors,
  infix = (): JSX.Element => <></>,
  placeholder,
  selectProps,
  maxSavedColors = 8,
  tooltipText,
  isShownSavedColors,
  size = 'M',
}: ColorPickerProps): JSX.Element {
  const [color, setColor] = React.useState(value);
  const [pressed, setPressed] = React.useState<boolean[]>([]);
  const onChangeColor = (colorValue: string): void => {
    setColor(colorValue);
    onChange && onChange(colorValue);
  };
  const [savedColors, setSavedColors] = React.useState(colors);
  const hash = '#';
  const saveColor = (): void => {
    setSavedColors(ar => {
      const colorsArray = (color ? [color, ...ar] : ar).slice(0, maxSavedColors);
      onSaveColors && onSaveColors(colorsArray);
      return colorsArray;
    });
  };
  const handleSearch = (colorName: string): void => setColor(colorName);
  const swatchSection = (
    <ColorPickerStyles.SwatchSectionWrapper>
      <Tooltip title="Save color swatch">
        <ColorPickerStyles.AddColorButton mode="single-icon" type="ghost" onClick={saveColor}>
          <Icon size={16} component={<FormulaPlusM />} />
        </ColorPickerStyles.AddColorButton>
      </Tooltip>
      {infix({ color, setColor: onChangeColor })}
      {savedColors.length > 0 && (
        <Tags
          tagShape={TagShape.SINGLE_CHARACTER_SQUARE}
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          selected={savedColors.map((colorEntry, i) => ({
            id: i,
            key: `color-${i}`,
            name: (
              <Tooltip title={colorEntry}>
                <ColorPickerStyles.TagDot pressed={pressed[i]} />
              </Tooltip>
            ),
            color: colorEntry,
            onClick(): void {
              onChangeColor(colorEntry);
              setPressed(() => {
                const newPressed = [...pressed];
                newPressed[i] = !pressed[i];
                return newPressed;
              });
            },
          }))}
          disabled={false}
        />
      )}
    </ColorPickerStyles.SwatchSectionWrapper>
  );
  const dropdown = (
    <ColorPickerStyles.Container size={size}>
      <ReactColorful color={color} onChange={onChangeColor} />
      <ColorPickerStyles.PrefixTag height={isShownSavedColors}>
        <Tag shape={TagShape.SINGLE_CHARACTER_SQUARE} color={color} disabled={false} />
      </ColorPickerStyles.PrefixTag>
      <ColorPickerStyles.SubContainer>
        <ColorPickerStyles.ColorPickerInput
          value={color.substr(1)}
          prefixel={<ColorPickerStyles.PreffixWrapper>#</ColorPickerStyles.PreffixWrapper>}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setColor(hash + ev.target.value)}
          placeholder={placeholder}
          icon1={
            <ColorPickerStyles.CopyIcon
              onClick={(): void => {
                copy(color);
              }}
              component={<CopyClipboardM />}
            />
          }
          icon1Tooltip={<span>{tooltipText}</span>}
        />
        {isShownSavedColors && (
          <div>
            <Divider />
            {swatchSection}
          </div>
        )}
      </ColorPickerStyles.SubContainer>
    </ColorPickerStyles.Container>
  );
  return (
    <>
      <ColorPickerStyles.SelectColorPicker
        showArrow={false}
        onSearch={handleSearch}
        showSearch
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        value={
          <ColorPickerStyles.ValueWrapper>
            <ColorPickerStyles.ColorTag shape={TagShape.SINGLE_CHARACTER_ROUND} color={color} disabled={false} />
            <div>{color}</div>
          </ColorPickerStyles.ValueWrapper>
        }
        dropdownMatchSelectWidth={false}
        filterOption={false}
        dropdownRender={(): JSX.Element => dropdown}
        {...selectProps}
      />
    </>
  );
}

export default ColorPicker;
