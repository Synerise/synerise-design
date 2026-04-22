# Component Audit TODOs

Gaps found during `/component-claude-md` runs. Add new entries here as more packages are documented.

---

## divider

- [ ] **Bug** — `Line.tsx` concatenates `className` unsafely: if `className` is `undefined`, the string `"undefined"` is appended to the element's class list (template literal in `Line.tsx`)
- [ ] **Tests** — No coverage for `dashed`, `type="vertical"`, `hiddenLine`, or `withSideMargin` props; only render, label, and margin are tested in `__specs__/Divider.spec.tsx`

---

## tray

- [ ] **Types** — `TrayData` is not exported from `index.ts`; consumers can't import the type for `open()` without a fragile deep import
- [ ] **Docs** — `id` prop is typed as `string` only, but the Storybook overview MDX (`Tray.overview.mdx`) still says `string | number`
- [ ] **Runtime** — No runtime guard for missing required `TrayData` fields (`content`, `title`); TypeScript-only enforcement
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## flag

- [ ] **Docs** — `countryCodes` named export is missing from the README API section
- [ ] **Tests** — Very thin coverage: no test for unknown country code (graceful empty fragment), `size` prop, or sub-national codes (`GB-ENG`, etc.)
- [ ] **Migration** — Uses Jest, not yet migrated to Vitest

---

## field-set

- [ ] **Types** — `FieldSetProps` and `TriggerType` are not exported from `index.ts`; consumers must use `React.ComponentProps<typeof FieldSet>` or a deep import
- [ ] **Deep import** — Storybook imports `ExpanderWrapper` from `@synerise/ds-field-set/dist/FieldSet.styles`; fragile internal path that breaks on dist changes
- [ ] **Migration** — Uses Jest, not yet migrated to Vitest

---

## column-manager

- [ ] **Typo** — `ColumnManagerItem/ColumManagerItem.types.ts` has a missing `n` in the filename (`Colum` vs `Column`); fix filename and all imports
- [ ] **Naming** — `ColumnManagerList/ColumnManager.style.ts` is inconsistently named (no `List` suffix, no trailing `s`) compared to every other styles file in the package

---

## form _(deprecated — prefer `@synerise/ds-editable-items-list`)_

- [ ] **Tests** — `EditableList.__spec__/EditableList.spec.ts` contains only `it.todo()` entries; no real tests exist for the component
- [ ] **Bug** — `FieldSet.styles.ts` exports `Description = 'div'` (a plain string, not a styled component); inconsistent with the rest of the styled-components pattern and cannot receive theme props
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## format-picker

- [ ] **Typo** — Types file is named `FomartPicker.types.ts` (missing `t`); rename to `FormatPicker.types.ts` and update all imports
- [ ] **Deep import** — `FormatSettings.styles.ts` imports `SuffixWrapper` from `@synerise/ds-list-item/dist/components/Text/Text.styles`; fragile internal path that breaks if `ds-list-item` restructures its dist output
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## date-range-picker

- [ ] **Docs** — `startAlwaysOnTheLeft` prop was in README but no longer exists in `DateRangePickerProps`; verify if removed or renamed (check `RangePicker` sub-component props)
- [ ] **Docs** — `disableAbsoluteTimepickerInRelative` prop exists in types but is missing from the README API table
- [ ] **Types** — `RawDateRangePicker` has no explicit prop type file; props are inferred from `DateRangePickerProps`; consider extracting a dedicated `RawDateRangePickerProps` type
- [ ] **Docs** — Deprecated `intl` and `format` props have no migration note in the README pointing to `valueFormatOptions`
- [ ] **Types** — `renderPopoverTrigger` typed as `(...args: any) => JSX.Element`; replace `any` with `{ setPopupVisible: (v: boolean) => void }`
- [ ] **Docs** — `MonthlyFilter`'s undocumented `min` prop (noted at bottom of README) has no type annotation or JSDoc in source

---

## dropdown

- [ ] **Docs** — `TextTrigger` is exported from `index.ts` and attached as `Dropdown.TextTrigger` but has no API section in the README
- [ ] **Docs** — `DropdownMenu` is exported from `index.ts` but has no API section in the README (missing `dataSource`, `withSearch`, `virtualised`, `maxVisibleItems`, `texts`, etc.)
- [ ] **Docs** — `Dropdown.SearchInput` is a re-export of `@synerise/ds-search-bar`; README props (`onSearchChange`, `placeholder`, `autofocus`) should be verified against SearchBar's actual API
- [ ] **Cleanup** — Old Ant Design `visible`/`onVisibleChange` naming may still appear in other files/stories; audit and update to `open`/`onOpenChange`

---

## flex-box

- [ ] **Docs** — README API table is empty; add rows for the key `styled-system` props (space, layout, flexbox)
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## footer

- [ ] **Types** — `FooterProps` is defined inline in `Footer.tsx` but not exported from `index.ts`; export it for consumer use
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## alert

- [ ] **Docs** — `AlertSemanticColor` is not exported from `index.ts` but is documented in README as `Alert.AlertSemanticColor`; clarify access path or remove from README
- [ ] **Docs** — README documents `Alert.SectionMessage`, `Alert.Toast`, `Alert.BroadcastBar`, `Alert.IconAlert` as sub-components of `Alert` but they are standalone exports, not attached to the `Alert` object; correct the section headers
- [ ] **Deprecation** — `Toast` in this package is a full standalone implementation, not a re-export of `@synerise/ds-toast`; audit for API/behaviour parity before removing
- [ ] **Deprecation** — `InlineAlert` has its own styled wrapper on top of `@synerise/ds-inline-alert`; styles may have diverged; audit before removing

---

## drawer

- [ ] **Bug** — `closable` prop is typed as `string` in `DrawerProps` but should be `boolean` (Ant Design expects `boolean`)
- [ ] **Bug** — `DrawerBody` uses hardcoded `background-color: white` instead of `theme.palette.white` token
- [ ] **Cleanup** — `title` prop is destructured but never rendered; remove from `DrawerProps` or document the intent
- [ ] **Cleanup** — Stories still use deprecated `visible` prop; update to `open`
- [ ] **Refactor** — Class component (`React.PureComponent`); convert to functional component per codebase standards

---

## typography

- [ ] **Bug** — `Text` className bug: `` `ds-text ${!ellipsis && className}` `` evaluates to `"ds-text false"` when `ellipsis` is provided
- [ ] **API** — `Paragraph` is missing `className`, `style`, and `ellipsis` props that `Text` has — API inconsistency
- [ ] **Migration** — Uses Jest, not yet migrated to Vitest
- [ ] **Tests** — Spec only covers `Typography.Title` (antd default); no tests for DS `Title`, `Text`, `Paragraph`, `Ellipsis`, `Description`, `ErrorText`, `Label`

---

## emoji-picker

- [ ] **Bug** — All 9 category `FormattedMessage` IDs are identical (`DS.ICON-PICKER.SMILEYS`); i18n overrides via message ID affect all categories at once; each should have a unique ID
- [ ] **Bug** — `dropdownProps` `Omit` list has typo `'onOpenChage'` (missing `n`); `onOpenChange` is not actually excluded from the type
- [ ] **Migration** — Uses Jest, not yet migrated to Vitest

---

## grid

- [ ] **Bug** — `Grid.context.ts` calls `window.innerWidth`/`window.innerHeight` in `createContext(...)` default; throws in SSR/Node environments
- [ ] **Bug** — `contentWrapper` centering formula `(maxColumns - columns) / 2 + 1` produces non-integer `grid-column-start` when the difference is odd
- [ ] **Migration** — Uses Jest, not yet migrated to Vitest

---

## color-picker

- [ ] **API** — `ColorHookType` is not exported from `index.tsx`; consumers can't type the `infix` callback without a deep import
- [ ] **Bug** — `savedColors` state is only initialised from `colors` prop on mount; prop changes after mount are silently ignored
- [ ] **Bug** — `SwatchSectionWrapper` has CSS typo: `alignitems: center` instead of `align-items: center`; flex alignment is silently ignored
- [ ] **Cleanup** — `@ts-ignore` on `Tags` `selected` prop mapping (line 168); replace with a proper type cast
- [ ] **SSR** — `standardizeColor` and `isValidTextColor` use browser-only APIs (`canvas`, `new Option()`); will crash in Node/SSR

---

## icon-picker

- [ ] **Bug** — `useIconSourceLoader` calls `loadedItems()` directly in the hook body on every render; should be inside `useEffect`
- [ ] **Types** — `button` prop is typed as required `ReactElement` but has a runtime fallback; should be `button?: ReactElement`
- [ ] **Bug** — `ListItem.tsx` uses `(element.item as any).type.name === 'Avatar'` to detect Avatar items; fragile — breaks under minification or component renaming
- [ ] **Deep import** — `import * as medium from '@synerise/ds-icon/dist/icons/M'` in `useIconSourceLoader.tsx`; fragile path that breaks if `ds-icon` restructures its dist output
- [ ] **Migration** — Uses Jest, not yet migrated to Vitest

---

## description

- [ ] **Bug** — `numbered-list` is a valid `DescriptionType` value but has no CSS branch in `Description.styles.tsx`; falls through to `inlineStyles` silently
- [ ] **Deprecation** — `DescriptionCopyable` (`Copy.tsx`) is exported from `index.ts` but marked `@deprecated`; schedule removal

---

## utils

- [ ] **Export gap** — `getInitials` exists in `src/getInitials/` with tests but is not exported from `index.ts`; add to exports or document intentional omission
- [ ] **Bug** — `useTraceUpdate` calls `console.log` unconditionally; should be guarded with `process.env.NODE_ENV !== 'production'` or removed from production builds
- [ ] **Bug** — `useElementInView` `useEffect` has no dependency array — the `IntersectionObserver` is recreated on every render
- [ ] **Types** — `useResize` uses `RefObject<any>` instead of `RefObject<HTMLElement>`
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## empty-states

- [ ] **Bug** — `mode='absolute'` sets `top: 50%; left: 50%` but omits `transform: translate(-50%, -50%)`; component is not truly centred
- [ ] **Bug** — `textAlign='justify'` maps `justify-content` to `'center'` instead of `'justify'`
- [ ] **Cleanup** — `mapSizeToPx` in `EmptyStates.tsx` duplicates the exported `IconSize` constant; use `IconSize` directly
- [ ] **Deprecation** — `labelPosition` prop is accepted but fully ignored in rendering; remove from types or add `@deprecated` JSDoc
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## file-uploader

- [ ] **Bug** — `FileViewAvatar` calls `URL.createObjectURL(data.file)` on every render without a corresponding `URL.revokeObjectURL` — memory leak for long-lived file lists
- [ ] **UX** — `AvatarUploader` and `ItemUploader` render a hardcoded "Add file" button label that cannot be overridden via `texts`
- [ ] **Export gap** — `FileViewAvatarTexts` type is not exported from `index.ts`; consumers must use a deep import
- [ ] **Typo** — Error message reads `'To many files uploaded'`; should be `'Too many files uploaded'`
- [ ] **Dead code** — `ItemUploader` passes `description` to `FileViewItem` but `FileViewItem` doesn't render it
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## editable-items-list

No gaps found.

---

## icon

- [ ] **Cleanup** — `index.ts` comment notes XL icon set contains duplicates: "consider removing it before uploading new version"
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## wizard

- [ ] **Docs** — README usage example uses deprecated `footer` prop; replace with `footerLeft`
- [ ] **Types** — `WizardOnModal` accesses `modalProps.prefix`, `modalProps.infix`, `modalProps.suffix` but these are not in `ModalProps` type; verify type safety or extend the type
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest
- [ ] **Docs** — `OnModalProps` is exported from `index.ts` but not documented in README
- [ ] **Tests** — No tests for `navigationInFooter`, `headerInlineEdit`, or `Wizard.OnModal` variant

---

## estimation

- [ ] **Export gap** — `EstimationProgressValue` and `EstimationTexts` types are not exported from `index.ts`; consumers can't import them without a deep/dist path
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest
- [ ] **Bug** — `EstimationProgressBarLegendItem` elements in `EstimationProgressBar.tsx` are rendered without a React `key` prop

---

## filter

- [ ] **Types** — `// @ts-expect-error` in `ExpressionItem.tsx` suppresses a real type mismatch between `StepCardProps` and `LogicProps`; needs proper fix
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest
- [ ] **Export gap** — `FilterTexts` type is not exported from `index.ts`; consumers can't import it without a deep/dist path
- [ ] **Tests** — Only 4 real tests (3 are skipped `todo`); no coverage for `readOnly`, `maxConditionsLimit`, drag interactions, or `visibilityConfig`

---

## factors

- [ ] **Deprecation** — `InputProps` is exported as a `@deprecated` alias for `FactorValueComponentProps`; should be removed in the next major version
- [ ] **Deprecation** — `parameters.showAllGroup` is `@deprecated` in types but still accepted; remove in next major version
- [ ] **Types** — `ExtraPropsMapping` has a `// TODO REMAINING COMPONENTS` comment; only `text` and `dynamicKey` have extra props support
- [ ] **Deep import** — `Factors.types.ts` imports from `@synerise/ds-date-range-picker/dist/DateRangePicker.types` and `/dist/date.types`; fragile dist-path imports that break on package restructuring

---

## information-card

- [ ] **Types** — `renderBadge` typed as `Function | null`; replace with a concrete render function signature
- [ ] **Deep import** — `@synerise/ds-avatar/dist/Avatar.types` is a fragile internal path; request Avatar to export types from package root
- [ ] **Deep import** — `@synerise/ds-subtle-form/dist/Elements/TextArea/TextArea.types` is a fragile internal path; request SubtleForm to export `SubtleTextAreaProps` from package root
- [ ] **Tests** — Several tests skipped with `xit`/`it.todo` (description editing, actions menu); re-enable or remove
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## logic

- [ ] **Export gap** — `PlaceholderType` is defined in `Placeholder.types.ts` but not exported from `index.ts`; consumers can't import it without a deep path
- [ ] **Docs** — `Placeholder` component is exported but has no section in the README
- [ ] **Bug** — `Matching` sentence interpolation uses `String.prototype.search` (returns index, `-1` when absent); passing a sentence without `#MATCHING_TOGGLE#` will silently produce garbled output
- [ ] **Bug** — `Placeholder` uses a static `import { theme }` from `@synerise/ds-core` for icon colour instead of styled-components `ThemeProvider`; colour won't update with runtime theme switching
- [ ] **Tests** — No tests for `readOnly` behaviour in `Logic.spec.tsx` or `Matching.spec.tsx`; no `Placeholder.spec.tsx` (only `.gitkeep` in `__specs__/`)
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## loader

- [ ] **Bug** — `className` concatenation `` `ds-loader ${className}` `` produces `"ds-loader undefined"` when `className` is not passed
- [ ] **Bug** — `mode="absolute"` uses `top: 50%; left: 50%` without `transform: translate(-50%, -50%)`; loader is not truly centred
- [ ] **Export gap** — `LoaderSize` and `FontSize` enums are not exported from `index.ts`; consumers can't import them without a deep path
- [ ] **Docs** — `percent` prop is inert without `percentFormatter`; no fallback rendering; this is undocumented
- [ ] **Tests** — Only 2 smoke tests; no coverage for `color`, `mode`, `text`, `fontSize`, `percentFormatter`, or `labelPosition`
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## item-picker

- [ ] **Docs** — README describes only the deprecated `ItemPickerLegacy` API; `ItemPickerNew` (the current recommended component) is entirely undocumented in README
- [ ] **Deprecation** — `ItemPickerLegacy` is `@deprecated` but README has no deprecation notice; consumers are led to use the deprecated API
- [ ] **Deprecation** — `errorMessage` prop on `ItemPickerNew` is `@deprecated` with no migration guidance beyond a JSDoc comment
- [ ] **Deprecation** — Several `ItemPickerTriggerProps` fields are `@deprecated` (`clear`, `changeButtonLabel`, `clearConfirmTitle`, `yesText`, `noText`) with no migration path documented
- [ ] **Docs** — `dropdownProps` type in README is described as Ant Design `DropdownProps` but actual type is `Partial<Omit<DropdownSharedProps, ...>>` from `@synerise/ds-dropdown`
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## item-filter

- [ ] **Dead prop** — `maxToShowItems` is declared in `ItemFilterProps` but never read in `ItemFilter.tsx`; it has zero effect
- [ ] **Filename typo** — `ItemFIlter.styles.ts` (capital "I" in "FIlter") is baked into imports and dist; rename requires coordinated find-and-replace
- [ ] **Deep import** — `ItemFIlter.styles.ts` imports `ItemContainer` from `@synerise/ds-manageable-list/dist/Item/ContentItem/ContentItem.styles`; fragile path that breaks on manageable-list restructure
- [ ] **Export gap** — `Item` type not re-exported from `index.ts`; consumers can't type item arrays without importing from `@synerise/ds-manageable-list` directly
- [ ] **Docs** — `@deprecated` JSDoc on the component and `ItemFilterProps` gives no migration guidance
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## layout

- [ ] **Bug** — `SidebarProps.onChange` is typed as required (`onChange: (isOpened: boolean) => void`) but called with optional chaining inside `Sidebar`; should be `onChange?: ...`
- [ ] **Bug** — `Page` component injects a `top` prop into `appMenu` via `cloneElement` but `appMenu` is typed as `ReactElement` with no enforcement that the element accepts `top`
- [ ] **Hardcoded colours** — `LayoutSidebar` uses `background-color: #fff` and `Page.PageContainer` uses `background-color: rgb(243, 245, 246)` instead of design tokens
- [ ] **Tests** — 3 `it.todo` stubs in `Layout.spec.tsx` (sidebar controls hidden/visible/render-function) are untested
- [ ] **Docs** — `Page` component is exported from `index.ts` but has no section in the README
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## popconfirm

- [ ] **Bug** — `hideButtons` typed as `ReactNode` but semantically a boolean flag; `0` (falsy) would hide buttons unexpectedly — type should be `boolean`
- [ ] **Bug** — Controlled `open` prop cannot close the popconfirm programmatically; `useEffect` only sets `isOpen` when `open` is truthy; fully controlled usage is broken
- [ ] **Bug** — `getTransitionConfig` uses `placement.indexOf('top')` which returns `0` (falsy) when placement starts with `'top'`; `transformOrigin` is wrong for `placement="top"`; use `placement.includes('top')` or `startsWith`
- [ ] **Hardcoded colour** — `ConfirmMessageTitle` uses `color: #404c5a` instead of a design token
- [ ] **Deprecation** — `Popconfirm.ConfirmMessage` static property is `@deprecated` but still wired up with no removal timeline
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## input-number

- [ ] **Docs** — `formatter` and `parser` Ant Design props are documented in README as user-configurable but are always overridden internally; add a warning note (already fixed in README)
- [ ] **Bug** — `keypress` `useEffect` has no dependency array — event listener is removed and re-added on every render
- [ ] **Deep import** — `InputNumber.styles.tsx` imports `autoresizeConfObjToCss` from `@synerise/ds-input/dist/Input.styles`; fragile path that breaks on package restructuring
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## input

- [ ] **Bug** — `InputMultivalue` `selectedValues` state is initialised from `values` prop on mount only; external changes to `values` after mount do not update internal state (semi-controlled pattern)
- [ ] **Deprecation** — `Props` and `EnhancedProps` types are exported as `@deprecated`; should be removed in the next major version
- [ ] **Deprecation** — `TextAreaProps` in `Textarea/Textarea.types.ts` is a `@deprecated` alias for `RawTextAreaProps`; should be removed in the next major version
- [ ] **Deprecation** — `Label` re-export is `@deprecated`; consumers should import `FormFieldLabel` from `@synerise/ds-form-field` directly
- [ ] **Cleanup** — `@ts-expect-error` in `ExpandableWrapper.tsx` for setting `.value` on `TextAreaRef`; needs a proper type-safe approach
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## items-roll

- [ ] **Deep import** — `Header.tsx` imports `SearchInput` from `@synerise/ds-search/dist/Elements`; fragile internal path that breaks if `ds-search` restructures its dist output
- [ ] **Deprecated props** — `useVirtualizedList`, `virtualizedRowHeight`, `virtualizedRowWidth` remain in `ListProps` type but are never read in `List.tsx`; remove or add `@deprecated` JSDoc + strip from `ListProps`
- [ ] **Deprecated prop** — `intl` prop is accepted at top level but never used anywhere (component uses `useIntl()` hook directly); remove from `ItemsRollProps`
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## inline-alert

- [ ] **Deprecation** — `iconAlert` prop is accepted (no TS error) but does nothing in the current implementation; should be removed in the next major version
- [ ] **Docs** — `alert` and `warning` types both render `WarningFillM` icon (only colour differs); this shared-icon behaviour is undocumented
- [ ] **Migration** — Uses Jest, not yet migrated to Vitest

---

## navbar

- [ ] **Export gap** — `NavbarProps` is not exported from `index.ts`; consumers must use `React.ComponentProps<typeof Navbar>` or a local type alias
- [ ] **Bug** — `additionalNodes` map renders each node without a `key` prop, causing React key warnings when the array has more than one element
- [ ] **Hardcoded colour** — `NavbarDivider` and text colour use hardcoded `#fff` instead of a design token (`theme.palette.white`)
- [ ] **Migration** — Uses Jest, not yet migrated to Vitest

---

## operators

- [ ] **Docs** — README documented `error: boolean` prop that does not exist; real prop is `errorText: ReactNode` (now fixed)
- [ ] **Docs** — `onChange` type in README was wrong (`OperatorsItem | OperatorsGroup | undefined`); actual type is `OperatorsItem | undefined` (now fixed)
- [ ] **Docs** — `onActivate` type in README was `(fieldType: string) => void`; actual type is `() => void` (now fixed)
- [ ] **Docs** — `readOnly`, `errorText`, `dropdownDimensionsConfig` props were missing from README (now added)
- [ ] **Bug** — `ItemsList` styled component has CSS typo: `backgorund` instead of `background`; silently ignored by browsers
- [ ] **Migration** — Uses Jest, not yet migrated to Vitest

---

## menu

- [ ] **Class component** — `Menu` is a `React.Component`; `toggleItems` uses `setState`; should be converted to functional component per codebase standards
- [ ] **Deprecation** — `copyValue`, `copyHint`, `copyTooltip`, `timeToHideTooltip`, `tooltipProps` on `MenuItemProps` are all `@deprecated`; schedule removal
- [ ] **Docs** — `MenuStyles` namespace export and `MenuItemGroup`, `Menu.SubMenu` sub-components are not documented in README
- [ ] **Docs** — `showTextTooltip`, `asInfoCardContainer`, `popoverDelay` props on `AntdMenuProps` are missing from README
- [ ] **Migration** — Uses Jest, not yet migrated to Vitest

---

## metric-card

- [ ] **Docs** — `texts` type in README was `CopyTooltipTexts`; actual exported type is `CopyTexts` (now fixed)
- [ ] **Docs** — README API table had a broken first row (missing leading `|`); now fixed
- [ ] **Migration** — Uses Jest, not yet migrated to Vitest

---

## mapping

- [ ] **Docs** — `texts: Partial<MappingTexts>` prop was missing from the README API table (now added)
- [ ] **Migration** — Uses Jest, not yet migrated to Vitest

---

## manageable-list

- [ ] **Docs** — README example used `listType={ListType.default}` (wrong prop name and wrong enum casing); fixed to `type={ListType.DEFAULT}`
- [ ] **Docs** — `type` column in README was missing `blank` and `content-large` variants; now fixed
- [ ] **Docs** — `styles` prop in README is wrong; actual prop is `style`; now fixed
- [ ] **Docs** — `activateItem` text key in README is wrong; actual key is `activateItemTitle`; now fixed
- [ ] **Docs** — `deleteConfirmationTitle` row appeared twice; second row should be `deleteConfirmationDescription`; now fixed
- [ ] **Docs** — `visibleItemsLimit` prop (replacement for deprecated `maxToShowItems`) was missing from README; now added
- [ ] **Docs** — Many `ItemProps` fields missing from README: `tags`, `headerPrefix`, `uniqueKey`, `user`, `created`, `dropdown`, `disabled`, `changeOrderDisabled`, `disableExpanding`, `disableHeaderClick`, `description`, `nameWrapperClassNames`
- [ ] **Migration** — Uses Jest, not yet migrated to Vitest

---

## result

- [ ] **Bug** — `closable` and `onClose` props are documented in the README but do not exist in `ResultProps` or the component implementation; they are silently dropped — either implement or remove from docs
- [ ] **Bug** — Icon size expression `size={mapTypeToStatus['no-results'] ? 48 : 24}` always evaluates to `48` because `mapTypeToStatus['no-results']` is always a truthy object; should be `type === 'no-results' ? 48 : 24`
- [ ] **Deprecation** — `noSearchResults` prop is `@deprecated` in types; schedule removal (use `type="no-results"` instead)
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## popover

- [ ] **API gap** — `usePopover` and `usePopoverContext` hooks are not exported from `index.ts`; consumers building custom popovers must use deep paths or fork the component
- [ ] **Bug** — `arrowRef.current` is `null` on first render, so the `arrow` middleware is inactive until `PopoverArrow` mounts; can cause a one-frame arrow position glitch
- [ ] **Docs** — `onDismiss` fires even when `dismissConfig.enabled` is `false` (guard checks `!== false` not `=== true`); behaviour is non-obvious and should be documented
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## inline-edit

- [ ] **Dead prop** — `tooltipTitle` is declared in `InlineSelectProps` but never used in `InlineSelect.tsx`
- [ ] **Bug** — Input `id` falls back to literal `'id'` when `input.name` is not provided — multiple instances without `name` all share `id="id"` (accessibility/form collision)
- [ ] **API** — `InlineSelect` silently replaces `input.onChange` with `NOOP`; only `onValueChange` is called; consumers passing `onChange` receive no calls
- [ ] **Deprecation** — `customIcon` in `InlineEdit` uses deprecated `component` prop on `<Icon>`; should use `iconName` or render icon directly
- [ ] **Cleanup** — `InlineSelect.style.ts` has `// todo: set type` comment on font size for `normal`/`small` — unresolved
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## radio

- [ ] **Cleanup** — `AdditionalData` styled-component is marked `@deprecated` in source but is still the active wrapper for `Description`; comment is misleading
- [ ] **Docs** — `Radio.Button` (direct re-export of `AntdRadio.Button`) is not documented in README
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## scrollbar

- [ ] **Bug** — `classes` prop renders as `` `${classes}` `` without null guard — evaluates to string `"undefined"` when `classes` is unset
- [ ] **Bug** — `transitionend`/`animationend` `useEffect` in `VirtualScrollbar` has no dependency array — re-registers listeners on every render
- [ ] **Bug** — `confineScroll` behaviour is inconsistent: `VirtualScrollbar` calls `preventDefault()`, `DnDScrollbar` calls `stopPropagation()` only
- [ ] **Bug** — `DnDScrollbar` silently receives `scrollbarOptions` via props spread but ignores it — may cause React unknown-prop warning
- [ ] **Dead code** — `DnDScrollbar.styles` `Loader` and `spinnerAnimation` exports are dead — loader is rendered by parent `Scrollbar` component
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## search

- [ ] **Deprecation** — `renderInMenu` on `SearchItemListProps` is `@deprecated` but no removal schedule is documented (existing JSDoc gates removal on consumer adoption — needs an explicit version target)

---

## search-bar

- [ ] **Bug** — `VALUE_PREFIX_WRAPPER_LEFT_VALUE` always reserves 52 px for icon space even when no `iconLeft` is provided — prefix appears misaligned
- [ ] **Tests** — No coverage for clear button, `iconLeft`, `valuePrefix`, `disabled`, `borderRadius`, `clearTooltipProps`, `handleInputRef`
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## section-message

- [ ] **Dead code** — `NumberWrapper`, `OrderWrapper`, `IconOrderWrapper`, `Wrapper` in `SectionMessage.styles.tsx` are unused
- [ ] **API** — `withClose` is typed `ReactNode` but only its truthiness is checked — consider typing as `boolean`
- [ ] **Docs** — `icon` vs `customIcon` distinction not documented: `icon` wraps via `<Icon component>`, `customIcon` bypasses the wrapper
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## select

- [ ] **Bug** — `it.only` in `Select.spec.tsx` silently skips all other tests when the file runs in isolation — almost certainly unintentional
- [ ] **Docs** — `clearIcon` and `removeIcon` props are always overridden internally; consumer-passed values have no effect
- [ ] **Docs** — `getPopupContainer` return type is documented as `() => void` but actually returns `HTMLElement`
- [ ] **Docs** — `firstActiveValue` row in README is stale — this prop does not exist in Antd 4 `SelectProps`
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## table

- [ ] **Bug** — `onListRefChange` in `VirtualTable` fires on every render (no dependency array in `useEffect`); internally documented as deprecated but still in the public type
- [ ] **Bug** — `VirtualTable` uses `JSON.stringify` for row identity when `rowKey` is undefined — fragile and a performance hazard with large row objects
- [ ] **Types** — Multiple `@ts-expect-error` suppressions in `DefaultTable.tsx`, `VirtualTable.tsx`, `GroupTable.tsx`, `TreeTable.tsx` indicating genuine type mismatches suppressed rather than fixed
- [ ] **Deprecation** — Every cell type file exports a `Props` alias marked `@deprecated`; old aliases still exported alongside current names
- [ ] **Deprecation** — `AvatarLabelCell.textSize` prop is `@deprecated` but still accepted with no replacement documented
- [ ] **Deprecation** — `StarCell.theme` prop is `@deprecated` but still present in the type
- [ ] **Export gap** — `FilterTrigger` is used internally in the title bar but not exported; consumers building custom headers cannot reuse it
- [ ] **Tests** — No test coverage for most cell components, `DefaultTable`, `GroupTable`, `TreeTable`, or `TableHeader`
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## tooltip

- [ ] **Bug** — `open` prop is applied via `useEffect` rather than passed directly — one-render delay; fully controlled behaviour (parent owns open state) is not supported
- [ ] **Bug** — `shortCuts` only renders inside the `title` block; silently dropped when `title` is falsy
- [ ] **Docs** — `description` is silently ignored on `type="default"`; no warning emitted
- [ ] **API** — `trigger: 'focus'` appears in Storybook argTypes but `PopoverTriggerType` only allows `'click' | 'hover'`; focus support does not exist
- [ ] **API** — Internal `testId="tooltip"` is hardcoded; consumers cannot override it
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## toolbar

- [ ] **Bug** — `type` prop on `ToolbarButtonProps` is typed as `'ghost-primary' | 'ghost' | 'custom-color-ghost'` but always ignored — `ToolbarButton` unconditionally passes `type="ghost"` to `Button`
- [ ] **Export gap** — `ToolbarLabelProps`, `ToolbarGroupProps`, `ToolbarDividerProps`, `ToolbarButtonProps` are not exported from `index.ts`; consumers can't import sub-component prop types
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## toast

- [ ] **Docs** — `toastId` prop missing from README API table
- [ ] **Docs** — `show` prop (default `true`, drives enter/exit animation) missing from README API table
- [ ] **Deep import** — `FirstButtonWrapper` and `Wrapper` styled-components used in Storybook via direct `dist/Toast.styles` import; fragile undocumented internal coupling
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## time-picker

- [ ] **Bug** — `debounce` in `Unit.tsx` creates a new debounced function on every render (inside component body, not inside `useMemo`/`useCallback`)
- [ ] **Bug** — `onChange` fires twice per user interaction (on cell click and again on dropdown close); undocumented side-effect
- [ ] **Export gap** — `MINUTE` and `SECOND` constants defined in constants file are not re-exported from `index.ts`
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## tags

- [ ] **Dead field** — `manageLinkLabel` in `TagTexts` is never rendered by `Tags` or `AddTags`; appears to be a leftover from a removed "manage" link feature
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## tag

- [ ] **Bug** — `dashed` prop is accepted in `TagProps` and forwarded to the styled component but no CSS rule reads it; the prop is a no-op
- [ ] **Bug** — `shape` default expression `TagShape.DEFAULT_ROUND && TagShape.DEFAULT_SQUARE` always evaluates to `TagShape.DEFAULT_SQUARE`; the intent was likely to default to round
- [ ] **Docs** — `onRemove` silently no-ops when `id` is not set; this dependency is undocumented
- [ ] **Docs** — Most `TagTexts` fields (`addButtonLabel`, `searchPlaceholder`, `manageLinkLabel`, etc.) are irrelevant to the single `Tag` component; they belong to `Tags` (multi-tag selector)
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## tabs

- [ ] **Bug** — `activeTab` is typed as `number` in `TabsProps` but accepts `undefined` at runtime (the `NoActiveTab` story passes `undefined`); type should be `number | undefined`
- [ ] **Deprecation** — `visible` prop is deprecated but still in the `TabItem` type signature with no removal timeline
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## switch

- [ ] **Bug** — `forwardRef` ref is attached to the outer wrapper `<div>`, not the underlying `<button>` inside Ant Design Switch; consumers expecting a button ref will get a div
- [ ] **Docs** — `tooltipConfig` wiring is opaque: tooltip rendering is delegated to `FormFieldLabel` from `@synerise/ds-form-field`; which `TooltipProps` fields are actually honoured is undocumented
- [ ] **Tests** — `RawSwitch` has no test coverage; only the wrapped `Switch` is tested
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## slider

- [ ] **Docs** — README referenced Ant Design Slider; component uses `@tanstack/react-ranger` (now fixed)
- [ ] **Docs** — `included`, `vertical`, `tooltipPlacement`, `tooltipVisible`, `getTooltipPopupContainer`, `useColorPalette` props removed from README (were Ant Design remnants, not in actual types)
- [ ] **Docs** — `OnChange` typo in README usage example (capital O); fixed to `onChange`
- [ ] **Docs** — `defaultValue` prop in README does not exist in `BaseSliderProps` or `DefaultSliderProps`; verify if it's supported
- [ ] **Docs** — Duplicate `### AllocationConfig` section was in README; now deduplicated

---

## skeleton

- [ ] **Docs** — README API table had `shape` and `inline` props listed under `Skeleton` — these do not exist in `SkeletonProps`; they belong to `SkeletonAvatar` (now fixed)
- [ ] **Docs** — README only documented `Skeleton`; `CheckboxSkeleton`, `DropdownSkeleton`, `OrderedListSkeleton`, `SkeletonAvatar` sections added
- [ ] **Docs** — `SkeletonAvatar` `size` prop omitted `XL` from README (now fixed)
- [ ] **Types** — `OrderedListSkeleton` has no dedicated exported props type; reuses `CheckboxSkeletonProps` without re-exporting it
- [ ] **Bug** — `Skeleton.tsx` wraps tiles in empty `<>` fragment without a `key`; key should be on the fragment

---

## sortable

- [ ] **Docs** — README API table was completely empty; now populated with `Sortable` and `SortableContainer` props

---

## sidebar

- [ ] **Docs** — `activeKey`, `onChange` props missing from README Sidebar table (now added)
- [ ] **Docs** — Component was listed as `SidebarButton` in README; actual export is `SidebarWithButton` with `dataSource: MenuItemProps[]` (now fixed)
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## sidebar-object

- [ ] **Bug** — `onScrollbar` in README was wrong; actual prop is `withScrollbar: boolean` (now fixed)
- [ ] **Docs** — `inputObjectId` in README was wrong key name; actual prop is `inputObjectIdKey` (now fixed)
- [ ] **Docs** — Missing props in README: `name`, `activeTab`, `onRename`, `onCancelClick`, `onApplyClick`, `inputObjectIdKey`, `withScrollbar` (now added)
- [ ] **Deep import** — `ButtonVariant` and `HeaderType` enums are not exported from `index.ts`; consumers must pass string literals or use deep imports
- [ ] **Deep import** — `Content.types.ts` imports `SubtleTextAreaProps` from `@synerise/ds-subtle-form/dist/Elements/TextArea/TextArea.types`; fragile dist path
- [ ] **Cleanup** — `@ts-expect-error` in `SidebarObject.tsx` for Scrollbar `options.suppressScrollY`
- [ ] **Cleanup** — `// TODO: fix handler type` with `any` cast in `Content.tsx` for `SubtleForm.TextArea onChange`
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## status

- [ ] **Docs** — README `Default` column showed `primary / custom` ambiguously; fixed to `primary` (now fixed)

---

## step-card

- [ ] **Bug** — `matching` prop typed as `: MatchingProps` in README; actual type is `boolean` (now fixed)
- [ ] **Bug** — `readonly` in README should be `readOnly` (now fixed)
- [ ] **Docs** — `onChangeName` in README usage example and API table — this handler does not exist in `StepCardProps` (now removed)
- [ ] **Docs** — Many props missing from README: `onMove`, `expressionIndex`, `expressionCount`, `isHeaderVisible`, `isDraggable`, `readOnly`, `singleStepCondition`, `renderHeaderRightSide`, `getMoveByLabel`, `dropLabel`, `additionalFields`, `expressionMoved`, `dragHandleProps`, `isDragged`, `isDragOverlay`, `dragIndex` (now added)
- [ ] **Docs** — `StepCardTexts` defaults in README were wrong (`'Matching'`/`'Not matching'`); actual react-intl defaults are `'Performed'`/`'Not performed'` (now fixed)
- [ ] **Docs** — `conditionType`, `notConditionType`, `moveUpTooltip`, `moveDownTooltip` keys missing from README StepCardTexts table (now added)
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## unordered-list

- [ ] **Docs** — README API table was listing `UnorderedListItem` fields as top-level component props; entire table replaced with correct `UnorderedListProps` + separate `UnorderedListItem` table (now fixed)
- [ ] **Types** — `ListProps` is a deprecated alias for `UnorderedListProps` — exported from `index.ts`; consider removing in a future major version
- [ ] **Bug** — `index` field in `UnorderedListItem` is stripped and overridden by the array index in `Unordered-list.tsx` (`data.map(({ index, ...item }, i) => ... index={i})`); the `index` field on items is effectively unused
- [ ] **Tests** — Spec file is misnamed `__specs__/Ordered-list.spec.tsx` — rename to `UnorderedList.spec.tsx`
- [ ] **Migration** — Uses Jest, not yet migrated to Vitest

---

## stepper

- [ ] **Types** — `StepProps` is not exported from `index.ts`; consumers cannot type-check `Stepper.Step` props without a deep import
- [ ] **Bug** — `Stepper.tsx` uses `@ts-expect-error` to access `children.length` — fragile; should use `React.Children.count(children)` instead
- [ ] **Docs** — README `stepNumber` usage example passes string (`stepNumber="1"`) but type requires `number`; example updated
- [ ] **Docs** — README Stepper table was missing `size`, `style`, `children` props (now added); Step table missing `children` prop (now added)
- [ ] **Migration** — Uses Jest, not yet migrated to Vitest

---

## subtle-form

- [ ] **Docs** — README only documented `TextArea`; missing `Input`, `Select`, `DatePicker`, `Field` sub-components (now added)
- [ ] **Docs** — `maxRows` default in README was `0`; no default in source (`undefined`) (now fixed)
- [ ] **Docs** — `suffixTooltip` type in README was `string / React.ReactNode`; actual type is `ReactNode` (now fixed)
- [ ] **Docs** — `error` and `errorText` props were missing from TextArea table (now added)
- [ ] **API** — `inputProps` is required (not optional) in `SubtleInputProps` — unexpected given all other sub-components make their wrapper props optional
- [ ] **Fragile import** — Storybook story imports `@synerise/ds-subtle-form/dist/Elements/DatePicker/utils` directly — fragile deep path not in public exports; `getFormattingString`/`replaceLettersWithUnderscore` should be exported from `index.ts`
- [ ] **Tests** — Only `TextArea.spec.tsx` exists; `Input`, `Select`, `DatePicker`, `Field` have no tests
- [ ] **Types** — No type exports from `index.ts`; `SubtleTextAreaProps`, `SubtleInputProps`, etc. are not accessible without deep imports
- [ ] **Migration** — Uses Jest, not yet migrated to Vitest

---

## short-cuts

- [ ] **Docs** — README API table was malformed (missing separator row); fixed
- [ ] **Docs** — `color` type in README was `string`; actual type is `'light' | 'dark'` (now fixed)
- [ ] **Types** — `ShortCutsProps` is not exported from `index.ts`; consumers cannot type-check without deep import
- [ ] **Migration** — Uses Jest, not yet migrated to Vitest

---

## list-item

- [ ] **Bug** — `Select.tsx` calls `uuid()` as the React `key` prop on every render; each render generates a new key causing full unmount/remount (`// TODO uuid` comment acknowledges the issue)
- [ ] **Bug** — `useTemporaryLabel.ts` `useEffect` has no dependency array; a new `setTimeout` is created on every render, not only when `temporaryLabel` changes
- [ ] **Deprecation** — `copyValue`, `copyHint`, `copyTooltip`, `timeToHideTooltip`, `tooltipProps` are all `@deprecated` but still accepted with no runtime warning and no migration guide
- [ ] **Docs** — `description` prop is silently ignored when `size !== 'large'`; undocumented
- [ ] **Tests** — Only 2 smoke tests; well below the 80% coverage requirement; uses Jest, not Vitest

---

## list

- [ ] **Docs** — `footer` prop is explicitly `Omit`-ted from `ListPropsType` but the README makes no mention of this limitation
- [ ] **Docs** — `List.ItemWrapper` sub-component is not documented in the README
- [ ] **Bug** — README `dashed` default says `true` but the prop has no default in `ListPropsType`; the `true` default only applies inside `ListDivider` itself
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## ordered-list

- [ ] **Dead dependency** — `@synerise/ds-icon` is listed in `package.json` `dependencies` but is never imported in any source file; likely a leftover from a prior refactor
- [ ] **Export gap** — `ListProps` (deprecated alias for `OrderedListProps`) is defined in `Ordered-list.types.ts` but not re-exported from `index.ts`
- [ ] **Bug** — `index` field on `OrderedListItem` is silently ignored at the root level; the component uses the map iteration index `i` instead; no documentation or comment explains this
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## page-header

- [ ] **Dead props** — `PageHeaderRightSide` declares `title`, `tooltipIcon`, and `handleTooltipClick` in its internal prop type but never uses them in the render
- [ ] **Hardcoded colour** — `MainContainer` uses `background-color: #fff` instead of a design token
- [ ] **Types** — `inlineEdit.style` accepts `{ [key: string]: string | number }` — untyped CSS-in-JS bag that bypasses the design system token system
- [ ] **DX** — No `data-testid` on root element or major slots; integration tests must rely on CSS class selectors (`.page-header__back`, `.page-header__close`)
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## pagination

- [ ] **Bug** — `itemRender` is always overridden internally; consumer-passed values are silently discarded with no warning
- [ ] **Dead dependency** — `@synerise/ds-select` is listed as a runtime dependency but has zero runtime usage (only a Less mixin import); should be a dev/build dependency
- [ ] **Bug** — Storybook `Default` story passes `default: 1` instead of `defaultCurrent: 1`; initial page arg is silently ignored
- [ ] **Export gap** — No named TypeScript exports; consumers who need to type props must import `PaginationProps` directly from `antd`
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## panel

- [ ] **Bug** — `greyBackground` prop is not prefixed with `$`; styled-components forwards it to the DOM `<div>`, triggering an unknown-prop React warning
- [ ] **Docs** — README demo iframe references `components-panel--default` but no `default` story exists; only `PanelWithListItem` is exported
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## panels-resizer

- [ ] **Bug** — Horizontal mode base unit is `50vh` (viewport height) rather than `50%` of the container height; initial split is viewport-relative, not container-relative
- [ ] **Bug** — No minimum panel size enforcement; `vector` is unbounded so panels can be dragged to zero or negative sizes
- [ ] **Bug** — `initial` prop is only applied on mount (empty `useEffect` dependency array); changes to `initial` after mount are silently ignored
- [ ] **API** — `scrollable` applies to both panels together; no per-panel scrollable control
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest

---

## core

- [ ] **Docs** — README `includeToaster: boolean` prop does not exist in `DSProviderProps`; actual prop is `toasterProps: false | Partial<ToasterProps>` (now fixed)
- [ ] **Docs** — `onErrorIntl` prop missing from README API table (now added)
- [ ] **Docs** — README says "react-i18n" in Features; actual library is `react-intl`
- [ ] **Cleanup** — `useDataFormat.ts` uses `eslint-disable @typescript-eslint/no-explicit-any` for overload dispatch; type the overloads properly to remove the `any`
- [ ] **Migration** — Uses Jest (`jest.config.js`), not yet migrated to Vitest
