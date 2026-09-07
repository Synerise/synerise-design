---
id: design-system
title: DesignSystem
---

DesignSystem All Components Package.

This package contains no code, only references all existing DS components as dependencies.
Install it to have all available DS components installed in your application, instead of installing them one by one.

**Not included:** `@synerise/ds-menu`, `@synerise/ds-alert` and `@synerise/ds-table`. All three are
retired — deprecated on npm, removed from this repo, and never migrated off `antd`. Their final
published versions (`ds-table@2.0.2`, `ds-menu@2.0.1`, `ds-alert@2.0.1`) stay installable but receive
no further work: pin them exactly and install `antd@4.24.16` yourself if you still depend on them.
See `docs/migration-v2.md` for the replacements.

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
