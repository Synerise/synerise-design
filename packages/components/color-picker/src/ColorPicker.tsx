import * as React from 'react';
import { HexColorPicker as ReactColorful } from 'react-colorful';
import Divider from '@synerise/ds-divider';
import Tags, { TagShape, Tag } from '@synerise/ds-tags';
import Icon, { FormulaPlusM } from '@synerise/ds-icon';
import { CopyClipboardM } from '@synerise/ds-icon/src';
import * as copy from 'copy-to-clipboard';
import Tooltip from '@synerise/ds-tooltip';
import Dropdown from '@synerise/ds-dropdown';
import { useOnClickOutside } from '@synerise/ds-utils';
import { ColorPickerProps } from './ColorPicker.types';
import ColorPickerStyles from './ColorPicker.styles';

export function ColorPicker({
  value = '#ffffff',
  onChange,
  colors = [],
  onSaveColors,
  infix = (): JSX.Element => <></>,
  placeholder,
  inputProps,
  maxSavedColors = 9,
  tooltipText,
  isShownSavedColors,
  size = 'M',
  errorText,
  description,
}: ColorPickerProps): JSX.Element {
  const [color, setColor] = React.useState(value);
  const [pressed, setPressed] = React.useState<number>(-1);
  const onChangeColor = (colorValue: string): void => {
    setColor(colorValue);
    onChange && onChange(colorValue);
  };
  const getHeightOnDropdown = (): number => {
    if (errorText && description) {
      return -40;
    }
    if (errorText) {
      return -28;
    }
    if (description) {
      return -28;
    }
    return 0;
  };
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });
  const [savedColors, setSavedColors] = React.useState(colors);
  const hash = '#';
  const saveColor = (): void => {
    setSavedColors(ar => {
      const colorsArray = (color ? [color, ...ar] : ar).slice(0, maxSavedColors);
      onSaveColors && onSaveColors(colorsArray);
      return colorsArray;
    });
  };
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
                <ColorPickerStyles.TagDot pressed={i === pressed} />
              </Tooltip>
            ),
            color: colorEntry,
            onClick(): void {
              onChangeColor(colorEntry);
              setPressed(i);
            },
          }))}
          disabled={false}
        />
      )}
    </ColorPickerStyles.SwatchSectionWrapper>
  );
  const dropdown = (
    <ColorPickerStyles.Container ref={ref} size={size}>
      <ReactColorful color={color} onChange={onChangeColor} />
      <ColorPickerStyles.PrefixTag height={isShownSavedColors}>
        <Tag shape={TagShape.SINGLE_CHARACTER_SQUARE} color={color} disabled={false} />
      </ColorPickerStyles.PrefixTag>
      <ColorPickerStyles.SubContainer savedColors={isShownSavedColors}>
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
      <Dropdown
        align={{ offset: [0, getHeightOnDropdown()] }}
        visible={dropdownVisible}
        overlay={dropdown}
        placement="bottomLeft"
      >
        <ColorPickerStyles.ColorPickerSelect
          prefix={<ColorPickerStyles.ColorTag shape={TagShape.SINGLE_CHARACTER_ROUND} color={color} disabled={false} />}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setColor(ev.target.value)}
          placeholder={placeholder}
          onClick={(): void => setDropdownVisible(!dropdownVisible)}
          value={color}
          description={description}
          errorText={errorText}
          {...inputProps}
        />
      </Dropdown>
    </>
  );
}

export default ColorPicker;
