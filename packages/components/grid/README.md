---
id: grid
title: Grid
---

Grid UI Component

## Installation

```
npm i @synerise/ds-grid
or
yarn add @synerise/ds-grid
```

## Usage

```
import Grid from '@synerise/ds-grid'

<Grid>
    <Grid.Item xxl={12} xl={8} lg={6} md={4} sm={4} xs={3}>
        <Card>...</Card>
    </Grid>
    <Grid.Item xxl={12} xl={8} lg={6} md={4} sm={4} xs={3}>
        <Card>...</Card>
    </Grid>
    <Grid.Item xxl={12} xl={8} lg={6} md={4} sm={4} xs={3}>
        <Card>...</Card>
    </Grid>
</Grid>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-grid--default"></iframe>

## API

### Grid

| Property | Description                | Type   | Default |
| -------- | -------------------------- | ------ | ------- |
| gutter   | Spacing between grids (px) | number | 24      |

### Grid.Item

| Property       | Description                                                                               | Type    | Default |
| -------------- | ----------------------------------------------------------------------------------------- | ------- | ------- |
| xxl            | `screen > 1600`, number of cells to occupy, 0 corresponds to display: none, max value: 24 | number  | -       |
| xl             | `screen > 1280`, number of cells to occupy, 0 corresponds to display: none, max value: 16 | number  | -       |
| lg             | `screen > 960`, number of cells to occupy, 0 corresponds to display: none, max value: 12  | number  | -       |
| md             | `screen > 768`, number of cells to occupy, 0 corresponds to display: none, max value: 8   | number  | -       |
| sm             | `screen > 320`, number of cells to occupy, 0 corresponds to display: none, max value: 8   | number  | -       |
| xs             | `screen <= 320`, number of cells to occupy, 0 corresponds to display: none, max value: 3  | number  | -       |
| contentWrapper | Group content with max size (defined in col size props) and center them horizontally      | boolean | -       |
