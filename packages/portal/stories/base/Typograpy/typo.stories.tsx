import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Typograpy from '@synerise/ds-typography';
import { DSProvider } from '@synerise/ds-core';
import * as S from './examples';

storiesOf('Intro|Core', module).add('Typograpy', () => (
  <DSProvider code="en_GB">
    <div style={{ padding: 10 }}>
      <Typograpy.Title>Headers</Typograpy.Title>
      <Typograpy.Title level={1}>h1. Synerise DS</Typograpy.Title>
      <S.HeaderH1>h1. Synerise DS - Styled Component</S.HeaderH1>
      <Typograpy.Title level={2}>h2. Synerise DS</Typograpy.Title>
      <Typograpy.Title level={3}>h3. Synerise DS</Typograpy.Title>
      <Typograpy.Title level={4}>h4. Synerise DS</Typograpy.Title>
      <Typograpy.Text className="container">
        Text TextTextTextTextTextText TextLorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
        aspernatur dolores eveniet impedit libero nesciunt suscipit tenetur. Accusantium alias consectetur ducimus
        excepturi, ipsam maiores necessitatibus numquam optio porro provident voluptas.
      </Typograpy.Text>
      <br />
      <Typograpy.Paragraph className="container">
        ParagraphParagraphParagraphParagraphParagraphParagraphParagraphParagraph orem ipsum dolor sit amet, consectetur
        adipisicing elit. Asperiores aspernatur dolores eveniet impedit libero nesciunt suscipit tenetur. Accusantium
        alias consectetur ducimus excepturi, ipsam maiores necessitatibus numquam optio porro provident voluptas.
      </Typograpy.Paragraph>
      <S.Color>I am red!</S.Color>
    </div>
  </DSProvider>
));
