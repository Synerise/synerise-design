---
id: design-system
title: DesignSystem
---

DesignSystem All Components Package.

This package contains no code, only references all existing DS components as dependencies.
Install it to have all available DS components installed in your application, instead of installing them one by one.

**Not included:** `@synerise/ds-menu` and `@synerise/ds-alert` (deprecated) and `@synerise/ds-table`
(excluded from the antd removal). They are the only packages that still require `antd` — install them,
and `antd` itself, explicitly if you still use them.

## Installation

```
npm i @synerise/design-system
or
yarn add @synerise/design-system
```

## Usage

```
import Button from '@synerise/ds-button'

<Button />

```
