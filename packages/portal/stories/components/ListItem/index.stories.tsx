import React from 'react';
import ListItem from '@synerise/ds-list-item';
import DSFlag from '@synerise/ds-flag';

const stories = {
  withLabel: () => <ListItem children="Sample label" size={'default'} />,
  withFlag: () => <ListItem icon={<DSFlag country="pl" />} children="Sample label with flag" size={'default'} />,
  withoutHover: () => <ListItem children="Sample with no hover" noHover={true} selectable={false} size={'default'} />,
};

export default {
  name: 'Components/ListItem',
  config: {},
  stories,
  Component: ListItem,
};
