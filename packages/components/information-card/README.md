---
id: information-card
title: InformationCard
---

InformationCard UI Component

Information card shows details of an object or entity.
It should be used as an additional information (details) provider when user is selecting something using menu or dropdown.

## Installation

```
npm i @synerise/ds-information-card
or
yarn add @synerise/ds-information-card
```

## Usage

```js
import { InformationCardTooltip } from '@synerise/ds-information-card';

<InformationCardTooltip
  informationCardProps={{
    title: 'Title',
    subtitle: 'Subtitle',
    icon: <SegmentM color="mars" />,
    iconColor: 'mars',
    avatarTooltipText: 'Tooltip Text',
  }}
  triggerProps={{
    popupPlacement: 'top',
  }}
>
  <button>Element to attach infocard to</button>
</InformationCardTooltip>;
```

Generally, components require being capable of rendering this and usually an additional effort is required to get them to support rendering.
See text's menu item element `packages/components/menu/src/Elements/Item/Text/Text.tsx`.

Note that `title` and `subtitle` are required props. For just a single line of text consider using @synerise/ds-tooltip.

### Usage with dropdown and other components relying on `rc-trigger` `getPopupContainer`

Some components render elements via portal, in such a case if tthey are listening for global events like click (for e.g. closing the dropdown) - developer using this component is responsible for proper handling of such a clicks. One of ways is making use of `overlayInnerClass` popover's class property to later.
By default class is `ignore-click-outside` (so looking for `domElement.closest('.ignore-click-outside')` to determine whether handler should be skipped should be fine).

## Demo

<iframe src="/storybook-static/iframe.html?id=components-information-card--default"></iframe>

## API

| Property                    | Description                                                                                                                                                                          | Type                                                | Default |     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- | ------- | --- |
| actionButton                | custom jsx element for rendering in action button (bottom-right)                                                                                                                     | `boolean` &#124; `(() => ReactNode)`                | -       |
| actionButtonCallback        | default action button callback method                                                                                                                                                | `() => void`                                        | -       |
| actionButtonTooltipText     | default action button tooltip                                                                                                                                                        | `string`                                            | -       |
| asTooltip                   | adjusts the styles to be displayed as a tooltip                                                                                                                                      | `boolean`                                           | -       |
| avatarTooltipText           | description in a tooltip shown when user (note renderBadge has to be provided)                                                                                                       | `string`                                            | -       |
| className                   | custom class name for further styling                                                                                                                                                | `string`                                            | -       |
| copyTooltip                 | subtitle's value to be copied when clicking on the copy button                                                                                                                       | `string`                                            | -       |
| copiedTooltip               | feedback to the user once information card's subtitle has been copied                                                                                                                | `string`                                            | -       |
| descriptionConfig           | when information-card's `children` prop is not provided, `defaultTextAreaProps` can be used to parametrize default textarea                                                          | `SubtleTextAreaProps` &#124; `string` &#124; `null` | -       |
| footerText                  | additional feedback info to the user, when set to null - footer is hidden                                                                                                            | `ReactNode` &#124; `null`                           | -       |
| icon                        | icon (note this needs to be pure SVG icon, it relies on `buildBadgeIcon` helper)                                                                                                     | `ReactNode`                                         | -       |
| iconColor                   | icon color to be applied to `icon` element                                                                                                                                           | `string`                                            | -       |
| notice                      | additional information shown between subtitle and description section. Can be used for warnings, errors, destructive actions, notices. See `buildExtraInfo` and alert `level` there. | `ReactNode`                                         | -       |
| renderAdditionalDescription | Render prop for displaying additional content above footer                                                                                                                           | `() => ReactNode`                                   | -       |
| renderBadge                 | Custom render prop for displaying. If set to `null` - badge won't be shown.                                                                                                          | `Function` &#124; `null`                            | -       |
| renderFooter                | render prop for rendering the bottom part of (by default section with a small text and an optional action button on the right)                                                       | `() => JSX.Element`                                 | -       |
| subtitle                    | Second line. Required prop. Can be copied.                                                                                                                                           | `string`                                            | -       |
| title                       | Title of the information-card. Can be copied.                                                                                                                                        | `string`                                            | -       |
| actionsMenu                 | Config for displaying "quick actions" - a button in footer that reveals a menu with links                                                                                            | `ActionsMenuProps`                                  | -       |
| propertyListItems           | an array of object properties to list, can also include dividers                                                                                                                     | `InformationCardPropertyListItem[]`                 | -       |
| summaryItems                | An array of (label + icon + optional tooltip) summary items to display below properties                                                                                              | `InformationCardSummaryItem[]`                      | -       |

### ActionsMenuProps

Quick actions menu

| Property        | Description                         | Type                 | Default         |
| --------------- | ----------------------------------- | -------------------- | --------------- |
| items           | Array of menu items. See ds-menu    | `MenuItemProps[]`    | -               |
| menuProps       | Menu props. See ds-menu             | `Partial<MenuProps>` | -               |
| buttonLabel     | footer button label that shows menu | `ReactNode`          | 'Quick actions' |
| navigationLabel | Back to content navigation label    | `ReactNode`          | 'Quick actions' |

### InformationCardPropertyListItem

Displays a list of properties (label & value)

| Property | Description                      | Type        | Default |
| -------- | -------------------------------- | ----------- | ------- |
| label    | label to display in the list     | `ReactNode` | -       |
| value    | valur to display in the list     | `ReactNode` | -       |
| type     | Back to content navigation label | `divider`   | -       |

### InformationCardSummaryItem

Displays a list of icons with value and optional tooltip

| Property     | Description                    | Type           | Default |
| ------------ | ------------------------------ | -------------- | ------- |
| icon         | Icon to render                 | `ReactNode`    | -       |
| label        | Label to display               | `ReactNode`    | -       |
| tooltip      | Tooltip text                   | `ReactNode`    | -       |
| tooltipProps | Tooltip config, see ds-tooltip | `TooltipProps` | -       |

### InformationCardTooltip

Displays InformationCard as a tooltip with `children` node as trigger

| Property             | Description                             | Type                                                               | Default |
| -------------------- | --------------------------------------- | ------------------------------------------------------------------ | ------- |
| informationCardProps | Props for rendering the InformationCard | `InformationCardProps`                                             | -       |
| triggerProps         | Trigger props. See rc-trigger           | `Partial<TriggerProps> & { ref?: React.LegacyRef<TriggerHandle> }` | -       |
| children             | trigger element                         | `ReactNode`                                                        | -       |
