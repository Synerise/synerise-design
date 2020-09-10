import * as React from 'react';
import isEqual from 'lodash/isEqual';
import dayjs from 'dayjs';
import customParseFormatPlugin from 'dayjs/plugin/customParseFormat';

import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';
import { CloseM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import { Props } from './Day.types';
import * as S from './Day.styles';

dayjs.extend(customParseFormatPlugin);

type InnerProps = { hovered: boolean } & Props;

const TIME_FORMAT = 'HH:mm:ss';

const format = (val: string) => {
  return val.length ? dayjs(val, TIME_FORMAT).format(TIME_FORMAT) : dayjs(val).format(TIME_FORMAT);
};

class DayComponent extends React.Component<InnerProps> {
  shouldComponentUpdate(nextProps: InnerProps): boolean {
    const { value } = this.props;
    return !(nextProps.value !== value && isEqual(value, nextProps.value));
  }

  render(): JSX.Element {
    const {
      active,
      hovered,
      intl,
      label,
      onChange,
      onToggle = (_: boolean) => {},
      readOnly,
      restricted,
      tooltip,
      value,
      ...rest
    } = this.props;

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
    return (
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
              <Tooltip title={intl.formatMessage({ id: 'SNRS.TIME-WINDOW.CLEAR-SELECTION' })}>
                <S.DeleteIcon onClick={(): void => onToggle(false)}>
                  <Icon component={<CloseM />} />
                </S.DeleteIcon>
              </Tooltip>
            )}
          </>
        )}
      </S.Container>
    );
  }
}

export default DayComponent;
