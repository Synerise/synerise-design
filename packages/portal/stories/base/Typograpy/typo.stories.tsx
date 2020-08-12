import * as React from 'react';
import Typography from '@synerise/ds-typography';
import * as S from './examples';

const stories = {
  Typography: () => (
    <div style={{ padding: 10 }}>
      <Typography.Title>Headers</Typography.Title>
      <Typography.Title level={1}>h1. Synerise DS</Typography.Title>
      <S.HeaderH1>h1. Synerise DS - Styled Component</S.HeaderH1>
      <Typography.Title level={2}>h2. Synerise DS</Typography.Title>
      <Typography.Title level={3}>h3. Synerise DS</Typography.Title>
      <Typography.Title level={4}>h4. Synerise DS</Typography.Title>
      <Typography.Text className="container">
        Text TextTextTextTextTextText TextLorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
        aspernatur dolores eveniet impedit libero nesciunt suscipit tenetur. Accusantium alias consectetur ducimus
        excepturi, ipsam maiores necessitatibus numquam optio porro provident voluptas.
      </Typography.Text>
      <br />
      <Typography.Paragraph className="container">
        ParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraph orem ipsum dolor sit amet, consectetur
        adipisicing elit. Asperiores aspernatur dolores eveniet impedit libero nesciunt suscipit tenetur. Accusantium
        alias consectetur ducimus excepturi, ipsam maiores necessitatibus numquam optio porro provident voluptas.
      </Typography.Paragraph>
      <S.Color>I am red!</S.Color>
    </div>
  ),
};

export default {
  name: 'Intro/Core',
  stories,
  Component: Typography,
};
