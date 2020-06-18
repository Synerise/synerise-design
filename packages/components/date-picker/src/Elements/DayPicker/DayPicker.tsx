import * as React from 'react';
import MomentLocaleUtils from 'react-day-picker/moment';
import * as fnsAddMonths from 'date-fns/add_months';
import * as fnsAddYears from 'date-fns/add_years';
import { injectIntl } from 'react-intl';
import fnsFormat from '../../format';

import Navbar from '../Navbar/Navbar';
import { DayPicker } from './DayPicker.styles';
import { Link } from '../Navbar/Navbar.styles';

const captionElement = (): null => null;

const Picker = (props): React.ReactNode => {
  const { month, onMonthChange, onMonthNameClick, onYearNameClick, hidePrev, hideNext, intl, ...rest } = props;
  return [
    <Navbar
      title={
        <React.Fragment>
          <Link onClick={onMonthNameClick}>{fnsFormat(month, 'MMM', intl.locale)}</Link>{' '}
          <Link onClick={onYearNameClick}>{fnsFormat(month, 'YYYY', intl.locale)}</Link>
        </React.Fragment>
      }
      onLongPrev={(): void => onMonthChange(fnsAddYears(month, -1))}
      onShortPrev={(): void => onMonthChange(fnsAddMonths(month, -1))}
      onLongNext={(): void => onMonthChange(fnsAddYears(month, 1))}
      onShortNext={(): void => onMonthChange(fnsAddMonths(month, 1))}
      hidePrev={hidePrev}
      hideNext={hideNext}
      key="head"
    />,
    <DayPicker
      month={month}
      firstDayOfWeek={1}
      {...rest}
      captionElement={captionElement}
      key="body"
      localeUtils={MomentLocaleUtils}
      locale={intl.locale}
    />,
  ];
};

export default injectIntl(Picker);
