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
import { Props } from './Day.types';
import * as S from './Day.styles';

dayjs.extend(customParseFormatPlugin);

const Day: React.FC<Props> = ({
  active,
  intl,
  label,
  onChange,
  onToggle,
  readOnly,
  restricted,
  tooltip,
  ...rest
}: Props) => {
  const [hovered, setHovered] = React.useState<boolean>(false);
  const [iconHover, setIconHover] = React.useState<boolean>(false);
  const type = active ? 'primary' : 'default';
  const icon = React.useMemo(() => {
    if (restricted && !active) {
      return hovered && iconHover ? (
        <>
          <S.DayTooltip>Clear</S.DayTooltip>
          <Icon component={<Close3S />} onClick={(): void => onToggle(false)} color={theme.palette['red-600']} />
        </>
      ) : (
        <Icon component={<CheckS />} color={theme.palette['green-600']} />
      );
    }
    return null;
  }, [restricted, active, hovered, onToggle, iconHover]);
  return (
    <S.Container>
      <Button
        {...rest}
        block
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={onToggle as any}
        type={type}
        mode="label-icon"
      >
        <S.Content>{label}</S.Content>
      </Button>
      {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
      <S.IconWrapper
        active={hovered && iconHover}
        onMouseOver={(): void => {
          setHovered(true);
          setIconHover(true);
        }}
        onMouseOut={(): void => {
          setIconHover(false);
        }}
      >
        {icon}
      </S.IconWrapper>
    </S.Container>
  );
};

export default Day;
