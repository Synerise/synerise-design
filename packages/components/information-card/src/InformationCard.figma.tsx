import React from 'react';

import figma from '@figma/code-connect';
import {
  AggregateM,
  ExpressionM,
  FileM,
  FunnelM,
  HistogramM,
  ImageM,
  InfoM,
  MailM,
  MetricsM,
  ReportM,
  SegmentM,
  SpinnerM,
  UserM,
} from '@synerise/ds-icon';

import InformationCard from './InformationCard';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=1919-26001&m=dev';

figma.connect(InformationCard, FIGMA_URL, {
  props: {
    description: figma.string('Description Text'),
    icon: figma.enum('Content Type', {
      Event: <InfoM />,
      'Analytics / Segmentation': <SegmentM />,
      'Analytics / Funnel': <FunnelM />,
      Metric: <MetricsM />,
      Histogram: <HistogramM />,
      Report: <ReportM />,
      Trend: <MetricsM />,
      Aggregate: <AggregateM />,
      Expression: <ExpressionM />,
      Attribute: <InfoM />,
      Profile: <UserM />,
      User: <UserM />,
      'Event parameter': <InfoM />,
      'Email campaign': <MailM />,
      Image: <ImageM />,
      File: <FileM />,
      Loading: <SpinnerM />,
    }),
    iconColor: figma.enum('Content Type', {
      Event: 'blue',
      'Analytics / Segmentation': 'mars',
      'Analytics / Funnel': 'mars',
      Metric: 'fern',
      Histogram: 'fern',
      Report: 'fern',
      Trend: 'fern',
      Aggregate: 'fern',
      Expression: 'pink',
      Attribute: 'violet',
      Profile: 'violet',
      User: 'violet',
      'Event parameter': 'blue',
      'Email campaign': 'yellow',
      Image: 'grey',
      File: 'grey',
      Loading: 'grey',
    }),
  },
  example: ({ description, icon, iconColor }) => (
    <InformationCard
      title="Title"
      subtitle="Subtitle"
      icon={icon}
      iconColor={iconColor}
      descriptionConfig={description}
    />
  ),
});
