import React from 'react';
import { injectIntl } from 'react-intl';

import { useDataFormat } from '@synerise/ds-core';

import { fnsAddMonths, fnsAddYears } from '../../fns';
import fnsFormat from '../../format';
import localeUtils from '../../localeUtils';
import Navbar from '../Navbar/Navbar';
import * as S from '../Navbar/Navbar.styles';
import { DayPicker } from './DayPicker.styles';
import { type DayPickerProps } from './DayPicker.types';

const captionElement = (): null => null;

const Picker = (props: DayPickerProps) => {
  const {
    month,
    onMonthChange,
    onMonthNameClick,
    onYearNameClick,
    hideLongNext,
    hideLongPrev,
    hideShortNext,
    hideShortPrev,
    renderNavbar,
    intl,
    modifiers,
    ...rest
  } = props;

  const { firstDayOfWeek } = useDataFormat();

  return (
    <>
      {renderNavbar ? (
        renderNavbar(props)
      ) : (
        <Navbar
          title={
            <>
              <S.Link
                data-testid="datapicker-nav-title-monthpicker-link"
                onClick={onMonthNameClick}
              >
                {fnsFormat(month, 'MMM', intl.locale)}
              </S.Link>
              {'  '}
              <S.Link
                data-testid="datapicker-nav-title-yearpicker-link"
                onClick={onYearNameClick}
              >
                {fnsFormat(month, 'yyyy', intl.locale)}
              </S.Link>
            </>
          }
          onLongPrev={
            hideLongPrev
              ? undefined
              : (): void =>
                  onMonthChange && onMonthChange(fnsAddYears(month, -1))
          }
          onShortPrev={
            hideShortPrev
              ? undefined
              : (): void =>
                  onMonthChange && onMonthChange(fnsAddMonths(month, -1))
          }
          onLongNext={
            hideLongNext
              ? undefined
              : (): void =>
                  onMonthChange && onMonthChange(fnsAddYears(month, 1))
          }
          onShortNext={
            hideShortNext
              ? undefined
              : (): void =>
                  onMonthChange && onMonthChange(fnsAddMonths(month, 1))
          }
          key="head"
        />
      )}
      <DayPicker
        month={month}
        firstDayOfWeek={firstDayOfWeek}
        captionElement={captionElement}
        key="body"
        locale={intl.locale}
        localeUtils={localeUtils}
        modifiers={modifiers}
        {...rest}
      />
    </>
  );
};
export default injectIntl(Picker);
