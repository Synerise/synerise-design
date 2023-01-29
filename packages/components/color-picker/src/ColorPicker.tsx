import * as React from 'react';
import { HexColorPicker as ReactColorful } from 'react-colorful';
import Divider from '@synerise/ds-divider';
import Tags, { TagShape, Tag } from '@synerise/ds-tags';
import Icon, { FormulaPlusM, CopyClipboardM } from '@synerise/ds-icon';
import * as copy from 'copy-to-clipboard';
import Tooltip from '@synerise/ds-tooltip';
import Dropdown from '@synerise/ds-dropdown';
import { useOnClickOutside } from '@synerise/ds-utils';
import { ColorPickerProps } from './ColorPicker.types';
import ColorPickerStyles from './ColorPicker.styles';

const hash = '#';
const hexColorRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
const alphanumericRegex = /[^a-zA-Z0-9]+/g;

const ColorPicker = ({
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
}: ColorPickerProps): JSX.Element => {
  const [color, setColor] = React.useState(value);
  const [validHexColor, setValidHexColor] = React.useState(value);
  const [pressed, setPressed] = React.useState<number>(-1);
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const [savedColors, setSavedColors] = React.useState(colors);

  const isValidHexColor = (hex: string): boolean => hexColorRegex.test(hex);
  const filterAlphanumeric = (colorValue: string): string => colorValue.replace(alphanumericRegex, '');
  const convert3DigitHexTo6Digit = React.useCallback(
    (hexColor: string): string => {
      const alphaHexColor = filterAlphanumeric(hexColor);
      if (alphaHexColor.length === 3) {
        let newAlphaHexColor = '';
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < color.length; i++) {
          newAlphaHexColor += alphaHexColor[i] + alphaHexColor[i];
        }
        return `#${newAlphaHexColor}`;
      }
      return hexColor;
    },
    [color.length]
  );

  const onChangeColor = React.useCallback(
    (colorValue: string): void => {
      setColor(colorValue);
      if (isValidHexColor(colorValue)) {
        const c = convert3DigitHexTo6Digit(colorValue);
        setValidHexColor(c);
        onChange && onChange(c);
      }
    },
    [convert3DigitHexTo6Digit, onChange]
  );

  const onBlurHandler = React.useCallback(() => {
    setColor(validHexColor);
  }, [validHexColor]);

  const heightOfDropdown = React.useCallback(() => {
    if (errorText || description) {
      if (errorText && description) {
        return -40;
      }
      return -20;
    }
    return 4;
  }, [errorText, description]);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });

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
      <ReactColorful color={validHexColor} onChange={onChangeColor} />
      <ColorPickerStyles.PrefixTag height={isShownSavedColors} size={size}>
        <Tag shape={TagShape.SINGLE_CHARACTER_SQUARE} color={validHexColor} disabled={false} />
      </ColorPickerStyles.PrefixTag>
      <ColorPickerStyles.SubContainer savedColors={isShownSavedColors}>
        <ColorPickerStyles.ColorPickerInput
          value={filterAlphanumeric(color)}
          prefixel={<ColorPickerStyles.PreffixWrapper>#</ColorPickerStyles.PreffixWrapper>}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
            const hexValue = hash + filterAlphanumeric(ev.target.value);
            onChangeColor(hexValue);
          }}
          onBlur={onBlurHandler}
          placeholder={placeholder}
          icon1={
            <ColorPickerStyles.CopyIcon
              onClick={(): void => {
                copy(color);
              }}
              component={<CopyClipboardM />}
            />
          }
          icon1Tooltip={<span>{tooltipText || 'Copy to clipboard'}</span>}
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
        align={{ offset: [0, heightOfDropdown()] }}
        visible={dropdownVisible}
        overlay={dropdown}
        placement="bottomLeft"
      >
        <ColorPickerStyles.ColorPickerSelect
          prefix={
            <ColorPickerStyles.ColorTag
              shape={TagShape.SINGLE_CHARACTER_ROUND}
              color={validHexColor}
              disabled={false}
              onClick={(): void => setDropdownVisible(!dropdownVisible)}
            />
          }
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
            const hexValue = hash + filterAlphanumeric(ev.target.value);
            onChangeColor(hexValue);
          }}
          onBlur={onBlurHandler}
          placeholder={placeholder}
          value={color}
          description={description}
          errorText={errorText}
          {...inputProps}
        />
      </Dropdown>
    </>
  );
};

export default ColorPicker;
