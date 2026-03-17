---
id: pagination
title: Pagination
---

Pagination UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-pagination--default"></iframe>

## API

All [Ant Design Pagination props](https://4x.ant.design/components/pagination/#API) are supported. The component spreads all props onto the underlying `antd` Pagination. The following prop has custom handling:

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `locale` | Pagination locale. Merged with `{ page: '' }` so the Ant default page label is suppressed. Consumer-supplied keys take precedence. | `PaginationLocale` | `{ page: '' }` |

> **Note:** `itemRender` is always overridden internally to render DS-styled ghost icon buttons for prev, next, jump-prev, and jump-next controls. Passing a custom `itemRender` has no effect.
