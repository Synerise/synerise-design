import * as React from 'react';
import { injectIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import attributes from './attributes';

import { Props } from './FilterSwitch.types';

const FilterSwitch = (props: Props): JSX.Element => {
  const {
    isOn,
    onOpenModalButtonClick,
    onRemoveFilterButtonClick,
    intl,
    translations,
  } = props;

  return (
      <Button.Creator
        onClick={onOpenModalButtonClick}
        {...attributes.buttonOpenModalFilter}
        label={
          isOn
            ? translations?.changeConditions || intl.formatMessage({ id: 'SNRS.FILTER-SWITCH.CHANGE_CONDITIONS' })
            : translations?.enableFilter || intl.formatMessage({ id: 'SNRS.FILTER-SWITCH.ENABLE_FILTER' })
        }
        block
      />
  );
};

export default injectIntl(FilterSwitch);
