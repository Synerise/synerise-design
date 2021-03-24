import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import dayjs from 'dayjs';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import customParseFormatPlugin from 'dayjs/plugin/customParseFormat';
import Button from '@synerise/ds-button';
import { CheckS, Close3S } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Tooltip from '@synerise/ds-tooltip';
import { DayProps } from './Day.types';
import * as S from './Day.styles';

dayjs.extend(customParseFormatPlugin);

const Day: React.FC<DayProps> = ({
  active,
  label,
  onToggle,
  readOnly,
  restricted,
  dayKey,
  texts,
  ...rest
}: DayProps) => {
  const [hovered, setHovered] = React.useState<boolean>(false);
  const type = React.useMemo(() => (active ? 'primary' : 'secondary'), [active]);
  const handleIconClick = React.useCallback((): void => {
    !readOnly && onToggle(dayKey, false);
  }, [readOnly, onToggle, dayKey]);

  const handleMouseOut = React.useCallback(() => {
    setHovered(false);
  }, []);

  const handleButtonClick = React.useCallback((): void => {
    onToggle && onToggle(dayKey, true);
  }, [onToggle, dayKey]);

  const icon = React.useMemo(() => {
    return hovered && !readOnly ? (
      <Icon component={<Close3S />} onClick={handleIconClick} color={theme.palette['red-600']} />
    ) : (
      <Icon component={<CheckS />} color={theme.palette['green-600']} />
    );
  }, [hovered, handleIconClick, readOnly]);

  const getPopupContainer = React.useCallback(
    (node: HTMLElement): HTMLElement => (node.parentElement ? node.parentElement : document.body),
    []
  );

  const handleTooltipVisibleChange = React.useCallback((visible: boolean): void => setHovered(visible), []);
  return (
    <S.Container>
      <Button
        {...rest}
        onMouseLeave={handleMouseOut}
        onMouseOut={handleMouseOut}
        onBlur={handleMouseOut}
        block
        onClick={handleButtonClick}
        type={type}
        mode="label-icon"
      >
        <S.Content>{label}</S.Content>
      </Button>
      {restricted && !active && (
        <Tooltip
          trigger={['hover']}
          title={texts?.clear || 'Clear'}
          onVisibleChange={handleTooltipVisibleChange}
          getPopupContainer={getPopupContainer}
        >
          <S.IconWrapper readonly={readOnly} active={hovered}>
            {icon}
          </S.IconWrapper>
        </Tooltip>
      )}
    </S.Container>
  );
};
export default React.memo(Day);
