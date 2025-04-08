import React from 'react';
import Button from '@synerise/ds-button';
import Icon, { ClickM, ExternalLinkS, MetricsM, NotificationsM, ReportM, SegmentM, ShowM, TrashM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { MenuItemProps } from '@synerise/ds-menu';

export const renderExternalLinkButton = () => (
  <Tooltip title="Open in new tab">
    <Button color="grey" type="ghost" mode="single-icon">
      <ExternalLinkS color="grey" />
    </Button>
  </Tooltip>
);
export const renderPreviewButton = () => (
  <Tooltip title="Preview">
    <Button color="grey" type="ghost" mode="single-icon">
      <Icon component={<ShowM color="grey" />} size={24} />
    </Button>
  </Tooltip>
);

export const SUMMARY_ITEMS = [
  {
    icon: <Icon component={<ClickM />} color="grey" />,
    label: 621,
    tooltip: 'Used in conditions over last 30d'
  },
  {
    icon: <Icon component={<NotificationsM />} color="grey" />,
    label: 43,
    tooltip: 'Events occured over last 30d'
  },
]
export const PROPERTIES_LIST = [
  {
    label: 'Value',
    value: '1234'
  },
  {
    type: 'divider'
  },
  {
    label: 'Retention',
    value: '60 days'
  },
  {
    label: 'Created',
    value: '2 days ago'
  },
  {
    label: 'Updated',
    value: '3 hours ago'
  },
  {
    label: 'Author',
    value: 'Mike Smith'
  }
];
export const PROPERTIES_LIST_LONG = [
  {
    label: 'Value',
    value: '1234'
  },
  {
    type: 'divider'
  },
  {
    label: 'Adres e-mail wysylki',
    value: 'no-reply@synerise.com'
  },
  {
    label: 'Wyświetlana nazwa',
    value: 'no-reply@synerise.com'
  },
  {
    label: 'Odpowiedz do (email)',
    value: 'no-reply@synerise.com'
  },
  {
    label: 'Odpowiedz do (wyświetlana nazwa)',
    value: 'no-reply@synerise.com'
  },
  {
    label: 'Edytowano',
    value: '4 miesiące temu'
  }
]

export const ACTIONS_MENU_ITEMS: MenuItemProps[] = [
  {
    text: 'Create Segmentation',
    prefixel: <Icon component={<SegmentM />} />
  },
  {
    text: 'Create Metric',
    prefixel: <Icon component={<MetricsM />} />
  },
  {
    text: 'Create Report',
    prefixel: <Icon component={<ReportM />} />

  },
  {
    type: 'divider',
  },
  {
    type: 'danger',
    text: 'Delete',
    prefixel: <Icon component={<TrashM />} />
  },
];
