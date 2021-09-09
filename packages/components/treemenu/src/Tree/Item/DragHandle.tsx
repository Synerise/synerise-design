import React from 'react';

import { SortableHandle } from 'react-sortable-hoc';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Icon from '@synerise/ds-icon';
import { DragHandleM } from '@synerise/ds-icon/dist/icons';

const DragHandle = SortableHandle(() => (
  <Icon color={theme.palette['grey-060']} size={16} component={<DragHandleM />} />
));

export default DragHandle;
