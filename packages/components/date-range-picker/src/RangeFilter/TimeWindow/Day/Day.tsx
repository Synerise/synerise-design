import * as React from 'react';
import * as dayjs from 'dayjs';
import * as customParseFormatPlugin from 'dayjs/plugin/customParseFormat';
import Button from '@synerise/ds-button';
import { CheckS, CloseS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Tooltip from '@synerise/ds-tooltip';
import { Props } from './Day.types';
import * as S from './Day.styles';

dayjs.extend(customParseFormatPlugin);

const TIME_FORMAT = 'HH:mm:ss';

const format = (val: string) => {
  return val.length ? dayjs(val, TIME_FORMAT).format(TIME_FORMAT) : dayjs(val).format(TIME_FORMAT);
};

const Day: React.FC<Props> = ({
  active,
  intl,
  label,
  onChange,
  onToggle,
  readOnly,
  restricted,
  tooltip,
  value,
  ...rest
}: Props) => {
  const [hovered, setHovered] = React.useState<boolean>(false);
  const [iconHover, setIconHover] = React.useState<boolean>(false);
  const type = restricted ? 'primary' : 'default';
  const readOnlyStyles = readOnly ? { opacity: 0.6, cursor: 'default', width: '100%' } : { width: '100%' };
  const icon = React.useMemo(() => {
    if (active) {
      return hovered ? (
        <Tooltip title="Clear" visible>
          <Icon component={<CloseS />} onClick={(): void => onToggle(false)} color={theme.palette['red-600']} />
        </Tooltip>
      ) : (
        <Icon component={<CheckS />} color={theme.palette['green-600']} />
      );
    }
    return null;
  }, [active, hovered, iconHover]);
  return (
    <S.Container>
      <Button
        onMouseOut={(): void => setHovered(false)}
        onMouseLeave={(): void => setHovered(false)}
        onMouseOver={(): void => setHovered(true)}
        onMouseEnter={(): void => setHovered(true)}
        {...rest}
        style={readOnlyStyles}
        onClick={onToggle as any}
        type={type}
        mode="label-icon"
      >
        <S.Content>{label}</S.Content>
      </Button>
      <S.IconWrapper
        active={hovered}
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
  /*  return (
    <S.Container className={hovered ? 'hovered' : ''}>
      <Tooltip
        visible={hovered && (!restricted || value) && tooltipText}
        overlayStyle={overlayStyle}
        title={tooltipText}
      >
        <Button style={readOnlyStyles} {...rest} onClick={onToggle as any} type={type}>
          <span>{label}</span>
        </Button>
      </Tooltip>
      {typeof label === 'function' ? (
        label(hovered)
      ) : (
        <>
          {restricted && !readOnly && (
            <Tooltip title={intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.CLEAR-SELECTION' })}>
              <S.DeleteIcon onClick={(): void => onToggle(false)}>
                <Icon component={<CloseM />} />
              </S.DeleteIcon>
            </Tooltip>
          )}
        </>
      )}
    </S.Container>
  ); */
};

export default Day;
