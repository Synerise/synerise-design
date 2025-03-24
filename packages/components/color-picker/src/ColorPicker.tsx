import React from 'react';
import { HexColorPicker as ReactColorful } from 'react-colorful';
import Divider from '@synerise/ds-divider';
import Tags, { TagShape, Tag } from '@synerise/ds-tags';
import Icon, { FormulaPlusM, CopyClipboardM } from '@synerise/ds-icon';
import copy from 'copy-to-clipboard';
import Tooltip from '@synerise/ds-tooltip';
import Dropdown from '@synerise/ds-dropdown';
import { useOnClickOutside, getPopupContainer as defaultGetPopupContainer } from '@synerise/ds-utils';
import {
  isValidHexColor,
  isValidTextColor,
  convert3DigitHexTo6Digit,
  filterAlphanumeric,
  standardizeColor,
} from './utils';
import { ColorPickerProps } from './ColorPicker.types';
import ColorPickerStyles from './ColorPicker.styles';

const DEFAULT_MAX_WIDTH_PICKER = 228;
const DEFAULT_COLOR = '#ffffff';

const ColorPicker = ({
  maxWidth,
  value,
  onChange,
  colors = [],
  onSaveColors,
  infix = (): JSX.Element => <></>,
  getPopupContainer = defaultGetPopupContainer,
  placeholder,
  inputProps,
  maxSavedColors = 9,
  tooltip,
  isShownSavedColors,
  size = 'M',
  errorText,
  description,
}: ColorPickerProps) => {
  const [colorTextInput, setColorTextInput] = React.useState(value);
  const [colorHexInput, setColorHexInput] = React.useState(value);

  const [lastValidHexColor, setLastValidHexColor] = React.useState(value);

  const [pressed, setPressed] = React.useState<number>(-1);
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const [savedColors, setSavedColors] = React.useState(colors);
  const [tooltipText, setTooltipText] = React.useState(tooltip?.copy);

  const onChangeTextColor = React.useCallback(
    (colorValue: string): void => {
      setColorTextInput(colorValue);
      if (isValidTextColor(colorValue)) {
        const standardizedColor = standardizeColor(colorValue);
        setColorHexInput(standardizedColor);
        setLastValidHexColor(standardizedColor);
        onChange && onChange(standardizedColor);
      } else if (isValidHexColor(colorValue)) {
        const fullHexColor = convert3DigitHexTo6Digit(colorValue);
        setColorHexInput(fullHexColor);
        setLastValidHexColor(fullHexColor);
        onChange && onChange(fullHexColor);
      }
      setPressed(-1);
    },
    [onChange]
  );

  const onChangeHexColor = React.useCallback(
    (colorValue: string): void => {
      setColorHexInput(colorValue);
      if (isValidHexColor(colorValue)) {
        const fullHexColor = convert3DigitHexTo6Digit(colorValue);
        setColorTextInput(fullHexColor);
        setLastValidHexColor(fullHexColor);
        onChange && onChange(fullHexColor);
      }
      setPressed(-1);
    },
    [onChange]
  );

  const onBlurHandler = React.useCallback(() => {
    setColorTextInput(lastValidHexColor);
    setColorHexInput(lastValidHexColor);
  }, [lastValidHexColor]);

  const onClickHandler = React.useCallback(() => {
    setDropdownVisible(!dropdownVisible);
  }, [dropdownVisible]);

  const copyHandler = React.useCallback(() => {
    lastValidHexColor && copy(lastValidHexColor);
    setTooltipText(tooltip?.copied);
    setTimeout(() => {
      setTooltipText(tooltip?.copy);
    }, 3000);
  }, [lastValidHexColor, tooltip]);

  React.useEffect(() => {
    if (value && (isValidHexColor(value) || isValidTextColor(value))) {
      onChangeTextColor(value);
    } else {
      onChangeTextColor(DEFAULT_COLOR);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      const colorsArray = (lastValidHexColor ? [lastValidHexColor, ...ar] : ar).slice(0, maxSavedColors);
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
      {infix({ color: colorTextInput, setColor: onChangeTextColor })}
      {savedColors.length > 0 && (
        <Tags
          tagShape={TagShape.SINGLE_CHARACTER_SQUARE}
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
              onChangeHexColor(colorEntry);
              setPressed(i);
            },
          }))}
        />
      )}
    </ColorPickerStyles.SwatchSectionWrapper>
  );

  const dropdown = (
    <ColorPickerStyles.Container ref={ref} size={size}>
      <ReactColorful color={lastValidHexColor} onChange={onChangeHexColor} />
      <ColorPickerStyles.PrefixTag height={isShownSavedColors} size={size}>
        <Tag shape={TagShape.SINGLE_CHARACTER_SQUARE} color={lastValidHexColor} />
      </ColorPickerStyles.PrefixTag>
      <ColorPickerStyles.SubContainer savedColors={isShownSavedColors}>
        <ColorPickerStyles.ColorPickerInput
          value={colorHexInput && filterAlphanumeric(colorHexInput)}
          prefixel={<ColorPickerStyles.PreffixWrapper>#</ColorPickerStyles.PreffixWrapper>}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
            onChangeHexColor(`#${ev.target.value}`);
          }}
          onBlur={onBlurHandler}
          placeholder={placeholder}
          icon1={
            tooltipText ? (
              <ColorPickerStyles.CopyIcon onClick={copyHandler} component={<CopyClipboardM />} />
            ) : undefined
          }
          icon1Tooltip={tooltipText ? <span>{tooltipText}</span> : undefined}
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
      {maxWidth && maxWidth >= DEFAULT_MAX_WIDTH_PICKER && (
        <ColorPickerStyles.ColorPickerModalStyle maxWidth={maxWidth} />
      )}
      <Dropdown
        overlayClassName="color-picker-overlay"
        align={{ offset: [0, heightOfDropdown()] }}
        visible={dropdownVisible}
        overlay={dropdown}
        placement="bottomLeft"
        getPopupContainer={getPopupContainer}
      >
        <ColorPickerStyles.ColorPickerSelect
          data-testid="color-picker"
          prefix={
            <ColorPickerStyles.ColorTag
              shape={TagShape.SINGLE_CHARACTER_ROUND}
              color={lastValidHexColor}
              disabled={false}
              onClick={onClickHandler}
            />
          }
          onClick={onClickHandler}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
            onChangeTextColor(ev.target.value);
          }}
          onBlur={onBlurHandler}
          placeholder={placeholder}
          value={colorTextInput}
          description={description}
          errorText={errorText}
          {...inputProps}
        />
      </Dropdown>
    </>
  );
};

export default ColorPicker;
