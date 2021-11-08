import React from 'react';

import { SortableHandle } from 'react-sortable-hoc';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Icon, { DragHandleM } from '@synerise/ds-icon';

const DragHandle = SortableHandle(() => (
  <Icon color={theme.palette['grey-060']} size={16} component={<DragHandleM />} />
));

export default DragHandle;
