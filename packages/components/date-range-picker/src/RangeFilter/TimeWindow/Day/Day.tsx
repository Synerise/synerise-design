import * as React from 'react';
import * as dayjs from 'dayjs';
import * as customParseFormatPlugin from 'dayjs/plugin/customParseFormat';

import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';
import { CheckS, CloseM, CloseS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import { Props } from './Day.types';
import * as S from './Day.styles';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

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
  onToggle = (_: boolean) => {},
  readOnly,
  restricted,
  tooltip,
  value,
  ...rest
}: Props) => {
  const [hovered, setHovered] = React.useState<boolean>(false);
  const type = restricted ? 'primary' : 'default';
  const validMap: boolean[] = [];
  const tooltipValues =
    value &&
    value.values &&
    value.values
      .map((val: { startTime: string; endTime: string }) => {
        const start = val.startTime && format(val.startTime);
        const end = val.endTime && format(val.endTime);
        const isPeriod = dayjs(start, TIME_FORMAT).isBefore(dayjs(end, TIME_FORMAT));
        validMap.push(isPeriod);
        return start && end ? `${start} - ${end}` : null;
      })
      .filter((el: string | null) => el !== null);
  const joinedValues = tooltipValues && tooltipValues.join(' ');
  const overlayStyle = joinedValues ? { width: 86 } : {};
  const readOnlyStyles = readOnly ? { opacity: 0.6, cursor: 'default', width: '100%' } : { width: '100%' };
  const tooltipText = joinedValues || (!readOnly ? tooltip : '');
  const icon = React.useMemo(() => {
    if (active) {
      return hovered ? (
        <Icon component={<CloseS />} color={theme.palette['red-600']} />
      ) : (
        <Icon component={<CheckS />} color={theme.palette['green-600']} />
      );
    }
    return null;
  }, [active, hovered]);
  return (
    <S.Container>
      <Tooltip overlayStyle={overlayStyle} title={(!restricted || value) && tooltipText}>
        <Button
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => setHovered(false)}
          style={readOnlyStyles}
          {...rest}
          onClick={onToggle as any}
          type={type}
          mode={active ? "label-icon" : 'default'}
        >
          <span>{label}</span>
          {icon}
        </Button>
      </Tooltip>
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
  );*/
};

export default Day;
