---
id: banner
title: Banner
---

Banner UI Component

## Installation

```
npm i @synerise/ds-banner
or
yarn add @synerise/ds-banner
```

## Usage

```
import Banner from '@synerise/ds-banner'

<Banner />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-banner--default"></iframe>

## API

| Property         | Description                                                           | Type                                 | Default   |
| ---------------- | --------------------------------------------------------------------- | ------------------------------------ | --------- |
| slides           | Array of slides to display                                            | BannerSlideProps[]                   | -         |
| autoPlay         | auto-start slideshow (if multiple slides present)                     | boolean                              | true      |
| transitionEffect | slide transition effect                                               | 'scrollx' / 'fade' see antd carousel | 'scrollx' |
| autoPlaySpeed    | duration of single slide display (ms)                                 | number                               | 5000      |
| onAfterChange    | handler to call after slides change                                   | (index: number) => void              | -         |
| onBeforeChange   | handler to call before slides change                                  | (from: number, to: index) => void    | -         |
| onClose          | handler to call when 'X' is clicked                                   | () => void                           | -         |
| expandable       | displays persistent bar above slides with a collapse button and title | ExpandableProps                      | -         |
| texts            | custom translations                                                   | BannerTexts                          | -         |

### BannerSlideProps

| Property         | Description        | Type                                                       | Default |
| ---------------- | ------------------ | ---------------------------------------------------------- | ------- |
| mainContent      | main area content  | BannerSlideTextContentProps / BannerSlideMediaContentProps | -       |
| leftSideContent  | left side content  | BannerSlideTextContentProps / BannerSlideMediaContentProps | -       |
| rightSideContent | right side content | BannerSlideTextContentProps / BannerSlideMediaContentProps | -       |

### BannerSlideTextContentProps

| Property    | Description                       | Type                       | Default |
| ----------- | --------------------------------- | -------------------------- | ------- |
| titlePrefix | icon / avatar prefix of the title | ReactNode                  | -       |
| titleStatus | Title status tag                  | StatusProps, see ds-status | -       |
| title       | Slide title                       | ReactNode                  | -       |
| buttons     | Slide buttons                     | ReactNode                  | -       |
| description | Slide description text            | ReactNode                  | -       |

### BannerSlideMediaContentProps

| Property | Description      | Type      | Default |
| -------- | ---------------- | --------- | ------- |
| media    | image to display | ReactNode | -       |

### ExpandableProps

| Property | Description            | Type      | Default |
| -------- | ---------------------- | --------- | ------- |
| title    | Top bar title text     | ReactNode | -       |
| icon     | Top bar icon prefix    | ReactNode | -       |
| expanded | default exapnded state | boolean   | true    |

### BannerTexts

| Property     | Description                                  | Type      | Default    |
| ------------ | -------------------------------------------- | --------- | ---------- |
| expand       | toggle button label when banner is collapsed | ReactNode | 'Expand'   |
| collapse     | toggle button label when banner is expanded  | ReactNode | 'Collapse' |
| closeTooltip | tooltip text over 'X' icon                   | ReactNode | 'Close'    |
