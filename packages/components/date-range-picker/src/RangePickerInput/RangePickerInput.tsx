import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { CalendarM, Close3S } from '@synerise/ds-icon/dist/icons';
import { Props } from './RangePickerInput.types';
import * as S from './RangePickerInput.styles';

const RangePickerInput: React.FC<Props> = ({
  size,
  disabled,
  value,
  format,
  onChange,
  showTime,
  style,
  placeholder,
  onClear,
  onClick,
  clearTooltip,
  highlight,
  ...rest
}: Props) => {
  const [hovered, setHovered] = React.useState<boolean>(false);

  const handleApply = React.useCallback(() => {}, []);

  const handleIconClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>): void => {}, [onClear, handleApply]);

  const handleInputClick = React.useCallback(() => {onClick && onClick()}, [onClick]);
  const getText = () => 'value';
  return (
    <S.Container
      onMouseEnter={(): void => setHovered(true)}
      onMouseLeave={(): void => setHovered(false)}
      onClick={handleInputClick}
    >
      <S.Input
        active={!!highlight}
        resetMargin
        readOnly
        type="text"
        size={size as SizeType}
        disabled={disabled}
        placeholder={placeholder}
        value={getText()}
        icon1={
          hovered && !!value ? (
            <Tooltip title={clearTooltip}>
              <S.ClearIconWrapper>
                <Icon component={<Close3S />} onClick={handleIconClick} />
              </S.ClearIconWrapper>
            </Tooltip>
          ) : (
            <S.DefaultIconWrapper>
              <Icon component={<CalendarM />} />
            </S.DefaultIconWrapper>
          )
        }
        style={style}
        {...rest}
      />
    </S.Container>
  );
};

export default RangePickerInput;
