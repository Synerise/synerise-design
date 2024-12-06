import React from 'react';
import { FormattedMessage } from 'react-intl';
import Result from '@synerise/ds-result';
import Drawer from '@synerise/ds-drawer';
import Button from '@synerise/ds-button';
import Icon, { ArrowLeftM, CloseM } from '@synerise/ds-icon';

export const TABS = [
  {
    label: 'Design',
  },
  {
    label: 'Data',
  },
  {
    label: 'Validation',
  },
  {
    label: 'Layout',
  },
];
export const texts = {
  noResults: <FormattedMessage id="DS.ITEM-FILTER.NO-RESULTS" />,
};
export const headerTypes = {
  singleTitle: 'singleTitle',
  singleTitleWithBackIcon: 'singleTitleWithBackIcon',
};

export const closeActionTypes = {
  twoButtons: 'twoButtons',
  singleCloseIcon: 'singleCloseIcon',
};

export const renderDrawerContent = query => {
  const content =
    query && query.length > 0 ? (
      <Result type="no-results" noSearchResults description={texts.noResults} />
    ) : (
      <div>Put some content here</div>
    );
  return content;
};

export const renderBackIcon = (headerType, onBackClickHandler) => {
  if (headerType === headerTypes.singleTitleWithBackIcon) {
    return (
      <Drawer.DrawerHeaderBack>
        <Button type="ghost" mode="single-icon" onClick={onBackClickHandler} data-testid="ds-item-filter-close-button">
          <Icon component={<ArrowLeftM />} />
        </Button>
      </Drawer.DrawerHeaderBack>
    );
  } else return null;
};

export const renderActionButtons = (closeActionType, actionClickHandler) => {
  if (closeActionType === closeActionTypes.singleCloseIcon) {
    return (
      <React.Fragment>
        <Button type="ghost" mode="single-icon" onClick={actionClickHandler} data-testid="ds-item-filter-close-button">
          <Icon component={<CloseM />} />
        </Button>
      </React.Fragment>
    );
  } else
    return (
      <React.Fragment>
        <Button type={'ghost'} onClick={actionClickHandler}>
          Cancel
        </Button>
        <Button style={{ marginLeft: '8px' }} type={'primary'} onClick={actionClickHandler}>
          Save
        </Button>
      </React.Fragment>
    );
};