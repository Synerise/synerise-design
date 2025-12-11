import React, {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { HexColorPicker as ReactColorful } from 'react-colorful';

import Divider from '@synerise/ds-divider';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { FormulaPlusM } from '@synerise/ds-icon';
import Tags, { Tag, TagShape } from '@synerise/ds-tags';
import Tooltip from '@synerise/ds-tooltip';
import {
  getPopupContainer as defaultGetPopupContainer,
  useOnClickOutside,
} from '@synerise/ds-utils';

import * as S from './ColorPicker.styles';
import { type ColorPickerProps } from './ColorPicker.types';
import {
  convert3DigitHexTo6Digit,
  filterAlphanumeric,
  isValidHexColor,
  isValidTextColor,
  standardizeColor,
} from './utils';

const DEFAULT_MAX_WIDTH_PICKER = 228;
const DEFAULT_COLOR = '#ffffff';

const ColorPicker = ({
  maxWidth,
  value,
  onChange,
  colors = [],
  onSaveColors,
  infix = () => <></>,
  getPopupContainer = defaultGetPopupContainer,
  placeholder,
  inputProps,
  maxSavedColors = 9,
  isShownSavedColors,
  size = 'M',
  errorText,
  description,
  disabled,
  error,
  readOnly,
  tooltip,
}: ColorPickerProps) => {
  const [colorTextInput, setColorTextInput] = useState(value);
  const [colorHexInput, setColorHexInput] = useState(value);

  const [lastValidHexColor, setLastValidHexColor] = useState(value);

  const [pressed, setPressed] = useState(-1);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [savedColors, setSavedColors] = useState(colors);

  const setLocalValues = useCallback((colorValue: string) => {
    setColorTextInput(colorValue);
    if (isValidTextColor(colorValue)) {
      const standardizedColor = standardizeColor(colorValue);
      setColorHexInput(standardizedColor);
      setLastValidHexColor(standardizedColor);
    } else if (isValidHexColor(colorValue)) {
      const fullHexColor = convert3DigitHexTo6Digit(colorValue);
      setColorHexInput(fullHexColor);
      setLastValidHexColor(fullHexColor);
    }
    setPressed(-1);
  }, []);

  const onChangeTextColor = useCallback(
    (colorValue: string) => {
      setColorTextInput(colorValue);
      setLocalValues(colorValue);
      if (isValidTextColor(colorValue)) {
        const standardizedColor = standardizeColor(colorValue);
        onChange && onChange(standardizedColor);
      } else if (isValidHexColor(colorValue)) {
        const fullHexColor = convert3DigitHexTo6Digit(colorValue);
        onChange && onChange(fullHexColor);
      }
      setPressed(-1);
    },
    [onChange, setLocalValues],
  );

  const onChangeHexColor = useCallback(
    (colorValue: string) => {
      setColorHexInput(colorValue);
      if (isValidHexColor(colorValue)) {
        const fullHexColor = convert3DigitHexTo6Digit(colorValue);
        setColorTextInput(fullHexColor);
        setLastValidHexColor(fullHexColor);
        onChange && onChange(fullHexColor);
      }
      setPressed(-1);
    },
    [onChange],
  );

  const onBlurHandler = useCallback(() => {
    setColorTextInput(lastValidHexColor);
    setColorHexInput(lastValidHexColor);
  }, [lastValidHexColor]);

  const onClickHandler = useCallback(() => {
    setDropdownVisible(!dropdownVisible);
  }, [dropdownVisible]);

  useEffect(() => {
    if (value && (isValidHexColor(value) || isValidTextColor(value))) {
      setLocalValues(value);
    } else {
      setLocalValues(DEFAULT_COLOR);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const heightOfDropdown = useCallback(() => {
    if (errorText || description) {
      if (errorText && description) {
        return -40;
      }
      return -20;
    }
    return 4;
  }, [errorText, description]);

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });

  const saveColor = () => {
    setSavedColors((ar) => {
      const colorsArray = (
        lastValidHexColor ? [lastValidHexColor, ...ar] : ar
      ).slice(0, maxSavedColors);
      onSaveColors && onSaveColors(colorsArray);
      return colorsArray;
    });
  };

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChangeTextColor(event.target.value);
    },
    [onChangeTextColor],
  );

  const swatchSection = (
    <S.SwatchSectionWrapper>
      <Tooltip title="Save color swatch">
        <S.AddColorButton mode="single-icon" type="ghost" onClick={saveColor}>
          <Icon size={16} component={<FormulaPlusM />} />
        </S.AddColorButton>
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
                <S.TagDot pressed={i === pressed} />
              </Tooltip>
            ),
            color: colorEntry,
            onClick() {
              onChangeHexColor(colorEntry);
              setPressed(i);
            },
          }))}
        />
      )}
    </S.SwatchSectionWrapper>
  );

  const dropdown = (
    <S.Container ref={ref} size={size}>
      <ReactColorful color={lastValidHexColor} onChange={onChangeHexColor} />
      <S.PrefixTag height={isShownSavedColors} size={size}>
        <Tag
          shape={TagShape.SINGLE_CHARACTER_SQUARE}
          color={lastValidHexColor}
        />
      </S.PrefixTag>
      <S.SubContainer savedColors={isShownSavedColors}>
        <S.ColorPickerInput
          value={colorHexInput && filterAlphanumeric(colorHexInput)}
          prefixel={<S.PreffixWrapper>#</S.PreffixWrapper>}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => {
            onChangeHexColor(`#${ev.target.value}`);
          }}
          onBlur={onBlurHandler}
          placeholder={placeholder}
          icon1={
            <S.StyledCopyIcon
              copyValue={lastValidHexColor ?? ''}
              texts={{
                copyTooltip: tooltip?.copy,
                copiedTooltip: tooltip?.copied,
              }}
            />
          }
        />
        {isShownSavedColors && (
          <div>
            <Divider />
            {swatchSection}
          </div>
        )}
      </S.SubContainer>
    </S.Container>
  );

  const trigger = useMemo(() => {
    const isClickable = !disabled && !readOnly;
    return (
      <S.ColorPickerSelect
        data-testid="color-picker"
        disabled={disabled}
        readOnly={readOnly}
        prefix={
          <S.ColorTag
            shape={TagShape.SINGLE_CHARACTER_ROUND}
            color={lastValidHexColor}
            disabled={false}
            onClick={isClickable ? onClickHandler : undefined}
          />
        }
        onClick={isClickable ? onClickHandler : undefined}
        onChange={isClickable ? onChangeHandler : undefined}
        onBlur={onBlurHandler}
        placeholder={placeholder}
        value={colorTextInput}
        description={description}
        errorText={errorText}
        error={error}
        {...inputProps}
      />
    );
  }, [
    disabled,
    error,
    readOnly,
    onClickHandler,
    onChangeHandler,
    onBlurHandler,
    lastValidHexColor,
    placeholder,
    colorTextInput,
    description,
    errorText,
    inputProps,
  ]);
  if (readOnly || disabled) {
    return trigger;
  }
  return (
    <>
      {maxWidth && maxWidth >= DEFAULT_MAX_WIDTH_PICKER && (
        <S.ColorPickerModalStyle maxWidth={maxWidth} />
      )}
      <Dropdown
        className="color-picker-overlay"
        align={{ offset: [0, heightOfDropdown()] }}
        open={dropdownVisible}
        overlay={dropdown}
        placement="bottomLeft"
        asChild
        getPopupContainer={getPopupContainer}
        popoverProps={{ testId: 'color-picker' }}
      >
        {trigger}
      </Dropdown>
    </>
  );
};

export default ColorPicker;
