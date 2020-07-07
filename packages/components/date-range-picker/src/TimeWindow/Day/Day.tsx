import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import isEqual from 'lodash/isEqual';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import moment from 'moment';
import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';
import Icon from '@synerise/ds-icon';
import { Props } from './Day.types';

import * as S from './Day.styles';

type InnerProps = Props;

const format = (val: string): ReturnType<moment> => moment(val, 'HH:mm').format('HH:mm');

class DayComponent extends React.Component<InnerProps> {
  shouldComponentUpdate(nextProps: InnerProps): boolean {
    const { value } = this.props;
    return !(nextProps.value !== value && isEqual(value, nextProps.value));
  }

  render(): JSX.Element {
    const { value, onChange, tooltip, label, active, restricted, intl, onToggle, readOnly, ...rest } = this.props;
    const type = restricted ? 'primary' : 'default';
    const validMap = [];
    const tooltipValues =
      value &&
      value.values &&
      value.values
        .map((val) => {
          const start = val.startTime && format(val.startTime);
          const end = val.endTime && format(val.endTime);
          const isPeriod = moment(start, 'HH:mm').isBefore(moment(end, 'HH:mm'));
          validMap.push(isPeriod);
          return start && end ? `${start} - ${end}` : null;
        })
        .filter((el) => el !== null);

    const joinedValues = tooltipValues && tooltipValues.join(' ');
    const overlayStyle = joinedValues ? { width: 86 } : {};
    const readOnlyStyles = readOnly ? { opacity: 0.6, cursor: 'default', width: '100%' } : { width: '100%' };
    const tooltipText = joinedValues || (!readOnly ? tooltip : '');
    const handleButtonClick = (): void => {
      onToggle && onToggle();
    };
    return (
      <S.Container>
        <Tooltip overlayStyle={overlayStyle} title={tooltipText}>
          <Button style={readOnlyStyles} {...rest} onClick={handleButtonClick} type={type}>
            <span>{label}</span>
          </Button>
        </Tooltip>
        {typeof label === 'function' ? (
          label()
        ) : (
          <React.Fragment>
            {restricted && !readOnly && (
              <Tooltip title={intl.formatMessage({ id: 'SNRS.TIME-WINDOW.CLEAR-SELECTION' })}>
                <S.DeleteIcon onClick={(): void => onToggle && onToggle()}>
                  <Icon name="close-m" size={15} />
                </S.DeleteIcon>
              </Tooltip>
            )}
          </React.Fragment>
        )}
      </S.Container>
    );
  }
}

export default DayComponent;
