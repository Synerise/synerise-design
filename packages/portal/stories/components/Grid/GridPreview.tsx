import { boolean } from '@storybook/addon-knobs';
import Grid from '@synerise/ds-grid';
import * as S from './Grid.styles';
import * as React from 'react';

const GridPreview = () => (
  <S.FixedGrid visible={boolean('Show grid', true)}>
    <Grid>
      <Grid.Item xxl={1} xl={1} lg={1} md={1} sm={1} xs={1}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={1} lg={1} md={1} sm={1} xs={1}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={1} lg={1} md={1} sm={1} xs={1}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={1} lg={1} md={1} sm={1} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={1} lg={1} md={1} sm={1} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={1} lg={1} md={1} sm={1} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={1} lg={1} md={1} sm={1} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={1} lg={1} md={1} sm={1} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={1} lg={1} md={1} sm={0} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={1} lg={1} md={1} sm={0} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={1} lg={1} md={1} sm={0} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={1} lg={1} md={1} sm={0} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={1} lg={0} md={0} sm={0} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={1} lg={0} md={0} sm={0} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={1} lg={0} md={0} sm={0} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={1} lg={0} md={0} sm={0} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={0} lg={0} md={0} sm={0} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={0} lg={0} md={0} sm={0} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={0} lg={0} md={0} sm={0} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={0} lg={0} md={0} sm={0} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={0} lg={0} md={0} sm={0} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={0} lg={0} md={0} sm={0} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={0} lg={0} md={0} sm={0} xs={0}><S.Item /></Grid.Item>
      <Grid.Item xxl={1} xl={0} lg={0} md={0} sm={0} xs={0}><S.Item /></Grid.Item>
    </Grid>
  </S.FixedGrid>
);

export default GridPreview;
