import React from 'react';
import { Title, Text, Paragraph } from '@synerise/ds-typography';

export const DATA = [
  {
    name: `<Title level={1} ellipsis={{title}}></Title>`,
    example: (
      <div style={{ maxWidth: '200px' }}>
        <Title level={1} ellipsis={{ tooltip: 'h1. Synerise DS with ellipsis' }}>
          h1. Synerise DS with ellipsis
        </Title>
      </div>
    ),
    fontSize: '24px',
    lineHeight: '28px',
    letterSpacing: '-0.05px',
  },
  {
    name: `<Title level={1}></Title>`,
    example: (
      <Title level={1} ellipsis={{ title: 'h1. Synerise DS' }}>
        h1. Synerise DS
      </Title>
    ),
    fontSize: '24px',
    lineHeight: '28px',
    letterSpacing: '-0.05px',
  },
  {
    name: `<Title level={2}></Title>`,
    example: <Title level={2}>h2. Synerise DS</Title>,
    fontSize: '21px',
    lineHeight: '26px',
    letterSpacing: '-0.05px',
  },
  {
    name: `<Title level={3}></Title>`,
    example: <Title level={3}>h3. Synerise DS</Title>,
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '-0.05px',
  },
  {
    name: `<Title level={4}></Title>`,
    example: <Title level={4}>h4. Synerise DS</Title>,
    fontSize: '16px',
    lineHeight: '20px',
    letterSpacing: '-0.05px',
  },
  {
    name: `<Title level={5}></Title>`,
    example: <Title level={5}>h5. Synerise DS</Title>,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0px',
  },
  {
    name: `<Title level={6}></Title>`,
    example: <Title level={6}>h6. Synerise DS</Title>,
    fontSize: '13px',
    lineHeight: '18px',
    letterSpacing: '0px',
  },
  {
    name: `<Title level={7}></Title>`,
    example: <Title level={7}>h6. Synerise DS</Title>,
    fontSize: '10px',
    lineHeight: '16px',
    letterSpacing: '0.05px',
  },
  {
    name: `<Text size="medium" ellipsis={{title}}></Text>`,
    example: (
      <div style={{ maxWidth: '150px' }}>
        <Text
          size="medium"
          ellipsis={{ tooltip: 'Text with conditional ellipsis. The tooltip will show only if text has ellipsis' }}
        >
          Text with conditional ellipsis
        </Text>
      </div>
    ),
    fontSize: '24px',
    lineHeight: '28px',
    letterSpacing: '-0.05px',
  },
  {
    name: `<Text size="medium"></Text>`,
    example: <Text size="medium">span. Synerise DS</Text>,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0px',
  },
  {
    name: `<Text size="small"></Text>`,
    example: <Text size="small">span. Synerise DS</Text>,
    fontSize: '13px',
    lineHeight: '18px',
    letterSpacing: '0px',
  },
  {
    name: `<Text size="xsmall"></Text>`,
    example: <Text size="xsmall">span. Synerise DS</Text>,
    fontSize: '11px',
    lineHeight: '16px',
    letterSpacing: '0.05px',
  },
  {
    name: `<Paragraph size="medium"></Paragraph>`,
    example: <Paragraph size="medium">p. Synerise DS</Paragraph>,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0px',
  },
  {
    name: `<Paragraph size="small"></Paragraph>`,
    example: <Paragraph size="small">p. Synerise DS</Paragraph>,
    fontSize: '13px',
    lineHeight: '12px',
    letterSpacing: '0px',
  },
  {
    name: `<Paragraph size="xsmall"></Paragraph>`,
    example: <Paragraph size="xsmall">p. Synerise DS</Paragraph>,
    fontSize: '11px',
    lineHeight: '16px',
    letterSpacing: '0.05px',
  },
];

export const COLUMNS = [
  {
    title: 'Component',
    dataIndex: 'name',
  },
  {
    title: 'Example',
    dataIndex: 'example',
  },
  {
    title: 'Font size',
    dataIndex: 'fontSize',
  },
  {
    title: 'Line height',
    dataIndex: 'lineHeight',
  },
  {
    title: 'Letter spacing',
    dataIndex: 'letterSpacing',
  },
];
