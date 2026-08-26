# Migrating to Design System 2.0.0

**Status:** in preparation · **Epic:** STOR-2321 (antd removal)

Every published `@synerise/ds-*` package moves to `2.0.0` in a single release, including the
`@synerise/design-system` umbrella. The jump marks the completion of the antd removal, not a
rewrite — the vast majority of consumers need nothing but a version bump.

> The DS does not follow strict SemVer. Breaking changes ship as minor or patch releases and
> consumers migrate in lockstep. `2.0.0` is deliberate: it is the marker for "antd is gone",
> and it is the version where the three deprecated packages stop being installed for you.

## 1. The umbrella no longer installs `ds-table`, `ds-alert` or `ds-menu`

`@synerise/design-system` dropped all three from its `dependencies`. They are still published at
`2.0.0` and remain installable — they are simply no longer pulled in for you.

If your app imports any of them, **declare them explicitly**, together with `antd`, which all
three still require:

```jsonc
{
  "dependencies": {
    "@synerise/design-system": "^2.0.0",
    // add only the ones you actually import:
    "@synerise/ds-table": "^2.0.0",
    "@synerise/ds-menu": "^2.0.0",
    "@synerise/ds-alert": "^2.0.0",
    "antd": "4.24.16"
  }
}
```

They were previously **phantom dependencies** in most apps — resolved only because the package
manager hoisted the umbrella's transitive deps to the root. Nothing warned you, and the build
breaks the moment the umbrella stops shipping them.

All three are marked `deprecated` on npm and will be **deleted from the repo** in a later
release. The published `2.0.0` stays installable indefinitely, so nothing is stranded, but they
receive no further work. Replacements:

| Deprecated | Use instead |
|---|---|
| `@synerise/ds-table` | `@synerise/ds-table-new` — see its `MigrationFromTable` Storybook page |
| `@synerise/ds-menu` | `@synerise/ds-list-item` (`ListItem` / `ListWrapper`) |
| `@synerise/ds-alert` | `@synerise/ds-inline-alert`, `ds-toast`, `ds-section-message`, `ds-broadcast-bar` |

## 2. `antd` is no longer a peer dependency

Both `@synerise/design-system` and `@synerise/ds-core` dropped `antd` from `peerDependencies`.
If your app does not import antd itself and does not use the three packages above, you can drop
`antd` entirely.

`ds-core` no longer renders antd's `ConfigProvider`, and its antd base stylesheet import is
replaced by a vendored `reset.less` — deliberately byte-equivalent in output, so no visual change
is expected.

## 3. Breaking prop changes

From the `ds-menu` → `ds-list-item` migration. All verified against the shipped types.

**`@synerise/ds-sidebar` — `SidebarWithButton.dataSource`**

```diff
-import { type MenuItemProps } from '@synerise/ds-menu';
+import { type ListItemProps } from '@synerise/ds-list-item';

-const items: MenuItemProps[] = [...]
+const items: ListItemProps[] = [...]
 <SidebarWithButton dataSource={items} />
```

**`@synerise/ds-information-card` — `InformationCardActions.items`**

Same `MenuItemProps[]` → `ListItemProps[]` change. The `actionsMenu.menuProps` escape hatch is
**removed** — style the list through `ListWrapper` instead.

**`@synerise/ds-search` — `renderInMenu` removed**

The prop and its `<Menu>` render branch are gone. `SearchItems` always renders
`ListWrapper` / `ListItem` now. Call sites in `ds-item-picker`, `ds-inline-edit` and
`ds-collector` were updated in the same release.

**Removed dead exports**

| Package | Export |
|---|---|
| `@synerise/ds-table` | `SelectionMenu` |
| `@synerise/ds-column-manager` | `FixedMenu` |

Both were unused internally and had no documented consumer. `DropdownMenu` in
`@synerise/ds-tabs` is **not** affected — it comes from `@synerise/ds-dropdown` and is unchanged.

## 4. Locale regression in the deprecated `ds-table`

`ds-core` no longer wraps its children in antd's `ConfigProvider`, so antd's `LocaleReceiver`
falls back to `en_US` for the strings `ds-table` does not pass itself. This affects **only** the
deprecated `@synerise/ds-table`, and only for `pl` / `es` / `pt` / `fr`:

- column-filter dropdown labels
- pagination — `items_per_page`, `jump_to`, `page`, prev/next `title`
- `SELECTION_ALL` / `SELECTION_INVERT` labels

**Workaround** until you migrate to `ds-table-new` — wrap `DSProvider`'s children in antd's
`ConfigProvider` in your app root:

```tsx
import { ConfigProvider } from 'antd';
import plPL from 'antd/lib/locale/pl_PL';

<DSProvider>
  <ConfigProvider locale={plPL}>{children}</ConfigProvider>
</DSProvider>
```

`ds-table-new` is unaffected — it owns all of its own strings via `react-intl`.

## 5. If you publish a library that depends on the DS

A library declaring `@synerise/ds-*` with a `^1.x` range **cannot unify** with the `^2.x` an app
resolves through the umbrella, so the package manager installs **two copies** of every shared
package. For leaf components that costs bundle size; for `@synerise/ds-core` it is a correctness
bug — ds-core owns the `DSProvider` React context, so two copies mean components resolve a
different context instance and read an empty theme.

Two changes, both required:

1. **Widen every range** to `"^1 || ^2"` (or `>=1`). This lets the app's 2.x resolution and yours
   dedupe into one copy, and keeps working for consumers still on 1.x.
2. **Declare DS packages as `peerDependencies`, not `dependencies`.** A dependency is a copy the
   package manager may install privately; a peer is supplied by the host, which makes duplication
   structurally impossible. This matters most for `ds-core` — no range makes `dependencies` safe
   for a context-owning singleton.

Already done for `@synerise/universal-list`, `@synerise/response-renderer`,
`@synerise/validation`, `@synerise/rsql-filter`, `@synerise/universal-ai-agent` and
`@synerise/ai-assistant-ui`. **Publish those before upgrading an app to DS 2.0.0.**

How to check an app after upgrading — the acceptance test is copy count, not a green build:

```bash
for p in ds-core ds-button ds-icon ds-utils ds-tooltip ds-list-item; do
  echo "$p: $(find node_modules -type d -path "*@synerise/$p" | wc -l)"
done
```

Every count must be `1`. Anything higher means a dependency still holds a 1.x-only range.

## 6. Version map

All published packages are exactly `2.0.0`. Four packages that were pre-`1.0` join the same
line, so their version jump is larger than it looks — no API change is implied:

| Package | 1.x line | 2.0.0 |
|---|---|---|
| `@synerise/ds-image` | `0.2.0` | `2.0.0` |
| `@synerise/ds-rich-text` | `0.1.4` | `2.0.0` |
| `@synerise/ds-rich-text-renderer` | `0.1.4` | `2.0.0` |
| `@synerise/ds-mocks` | `0.4.15` | `2.0.0` |

`@synerise/ds-carousel` is newly added to the umbrella — it was published but unreachable through
`@synerise/design-system` before 2.0.0.
