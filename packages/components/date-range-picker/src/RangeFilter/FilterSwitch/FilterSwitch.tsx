import React from 'react';
import { injectIntl } from 'react-intl';

import attributes from './attributes';

import { Container, Icon, OpenModalButton, RemoveFilterButton, Status } from './FilterSwitch.styles';

const FilterSwitch = props => {
  const { isOn, statusInnerHtml, popConfirmProps, onOpenModalButtonClick, onRemoveFilterButtonClick, intl } = props;
  const translations = props.translations || {};
  let removeFilterButton = null;
  if (isOn) {
    removeFilterButton = (
      <RemoveFilterButton onClick={onRemoveFilterButtonClick}>
        {translations.clearFilter || intl.formatMessage({ id: 'SNRS.FILTER-SWITCH.CLEAR_FILTER' })}
      </RemoveFilterButton>
    );
    if (popConfirmProps) {
      removeFilterButton = <div {...popConfirmProps}>{removeFilterButton}</div>;
    }
  }
  return (
    <Container on={isOn}>
      <Icon name="filter-m" on={isOn} />
      {isOn && statusInnerHtml && <Status dangerouslySetInnerHTML={statusInnerHtml} />}
      {removeFilterButton}
      <OpenModalButton onClick={onOpenModalButtonClick} {...attributes.buttonOpenModalFilter}>
        {isOn
          ? translations.changeConditions || intl.formatMessage({ id: 'SNRS.FILTER-SWITCH.CHANGE_CONDITIONS' })
          : translations.enableFilter || intl.formatMessage({ id: 'SNRS.FILTER-SWITCH.ENABLE_FILTER' })}
      </OpenModalButton>
    </Container>
  );
};

export default injectIntl(FilterSwitch);
