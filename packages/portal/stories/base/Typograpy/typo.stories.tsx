import * as React from 'react';
import Typography, { Title } from '@synerise/ds-typography';
import * as S from './examples';

const stories = {
  Typography: () => (
    <div style={{ padding: 10 }}>
      <Title>Headers: </Title>
      <Title level={1}>h1. Synerise DS</Title>
      <Title level={2}>h2. Synerise DS</Title>
      <Title level={3}>h3. Synerise DS</Title>
      <Title level={4}>h4. Synerise DS</Title>
      <Title level={5}>h5. Synerise DS</Title>
      <Title level={6}>h6. Synerise DS</Title>
      <br />
      <Title>Span Text: </Title>
      <Typography.Text className="container">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </Typography.Text>
      <br />
      <Title>Paragraph Text: </Title>
      <Typography.Paragraph className="container">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </Typography.Paragraph>
    </div>
  ),
};

export default {
  name: 'Intro/Core',
  stories,
  Component: Typography,
};
