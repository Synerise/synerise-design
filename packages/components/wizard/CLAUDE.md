# Wizard (`@synerise/ds-wizard`)

> A full-page, step-by-step guided workflow component with a fixed header, scrollable content area, optional stepper, and navigation buttons. Also available as a modal variant via `Wizard.OnModal`.

## Package structure

```
src/
  Wizard.tsx            — main full-page component; attaches Wizard.OnModal
  Wizard.types.ts       — WizardProps interface
  Wizard.styles.ts      — all styled-components (shared between Wizard and OnModal)
  index.ts              — public exports
  onModal/
    onModal.tsx         — modal-based wizard variant
    onModal.types.ts    — OnModalProps (extends WizardProps)
  __specs__/
    Wizard.spec.tsx     — Jest tests (not Vitest — package still uses jest.config.js)
```

## Public exports

### `Wizard` (default export)

Full-page overlay wizard. Returns `null` when `visible` is `false` — component is unmounted, not hidden.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | — | **Required.** Whether the wizard is rendered |
| `title` | `ReactNode` | — | **Required.** Header title. Ignored when `headerInlineEdit` is set |
| `onClose` | `() => void` | — | **Required.** Called when the close button is clicked |
| `children` | `ReactNode` | — | Main content rendered in the content area |
| `stepper` | `ReactNode` | — | Rendered in the header, left of the close button area |
| `headerAction` | `ReactNode` | — | Rendered in the header alongside the stepper |
| `footerLeft` | `ReactNode` | — | Left side of the fixed footer bar |
| `footerAction` | `ReactNode` | — | Right side of the fixed footer bar |
| `footer` | `ReactNode` | — | **@deprecated.** Use `footerLeft` instead |
| `contentWidth` | `string` | `'100%'` | CSS width of the content column (e.g. `'588px'`) |
| `onPrevStep` | `() => void` | — | When provided, renders the Back button |
| `onNextStep` | `() => void` | — | When provided, renders the Next step button |
| `texts` | `{ prevButtonLabel: ReactNode; nextButtonLabel: ReactNode }` | — | Overrides i18n labels for nav buttons |
| `stepButtonProps` | `{ prevButtonProps?: Partial<Omit<ButtonProps, 'onClick'>>; nextButtonProps?: Partial<Omit<ButtonProps, 'onClick'>> }` | — | Overrides default button variant/mode/disabled/etc. |
| `navigationInFooter` | `boolean` | — | Moves prev/next buttons to the right side of the footer instead of below content |
| `headerInlineEdit` | `PageHeaderProps['inlineEdit']` | — | Enables inline title editing in the header; when set, `title` is not rendered |
| `headerAvatar` | `PageHeaderProps['avatar']` | — | Avatar shown in the header alongside `headerInlineEdit` |
| `className` | `string` | — | Added to the outermost `.ds-wizard` wrapper |

No `forwardRef`.

### `Wizard.OnModal`

Modal-based wizard variant, attached as a static property on `Wizard`. Same props as `WizardProps` minus `footer` and `contentWidth`, plus a required `modalProps`.

| Prop | Type | Description |
|------|------|-------------|
| `modalProps` | `ModalProps` | **Required.** Passed directly to `@synerise/ds-modal`. Also accepts `prefix`, `infix`, `suffix` (`ReactNode`) for custom footer slots |

### `WizardProps`

TypeScript type re-exported for consumers.

### `OnModalProps`

TypeScript type for `Wizard.OnModal` props: `Omit<WizardProps, 'footer' | 'contentWidth'> & { modalProps: ModalProps }`.

## Usage patterns

```tsx
import Wizard from '@synerise/ds-wizard';

// Full-page wizard
<Wizard
  visible={isVisible}
  title="Setup"
  onClose={handleClose}
  onPrevStep={step > 0 ? handlePrev : undefined}
  onNextStep={step < 3 ? handleNext : undefined}
  stepper={<Stepper>...</Stepper>}
  contentWidth="588px"
>
  <StepContent />
</Wizard>

// With footer navigation
<Wizard
  visible={isVisible}
  title="Setup"
  onClose={handleClose}
  navigationInFooter
  footerLeft={<Button>Help</Button>}
  footerAction={<Button>Skip</Button>}
  onPrevStep={handlePrev}
  onNextStep={handleNext}
>
  <StepContent />
</Wizard>

// Modal variant
<Wizard.OnModal
  visible={isVisible}
  title="Setup"
  onClose={handleClose}
  onPrevStep={handlePrev}
  onNextStep={handleNext}
  modalProps={{ size: 'medium' }}
>
  <StepContent />
</Wizard.OnModal>
```

## Styling

All styles are in `Wizard.styles.ts` and shared between `Wizard` and `WizardOnModal`. Uses `@synerise/ds-core` theme palette tokens throughout. Key layout values:

- Wizard wrapper: `position: fixed; z-index: 1500; width: 100vw; height: 100vh`
- Content area: `padding-top: 122px`, `padding-bottom: 100px` when footer is present
- Footer: `position: fixed; bottom: 0; padding: 24px`

## Key dependencies

- `@synerise/ds-layout` — provides the `Layout` with full-page header slot
- `@synerise/ds-page-header` — header bar with title, close button, inline edit, avatar
- `@synerise/ds-modal` — used by `Wizard.OnModal`
- `@synerise/ds-button` — nav buttons
- `@synerise/ds-icon` — `ArrowLeftCircleM` icon on Back button
- `react-intl` — i18n for default button labels (`DS.WIZARD.PREV-BUTTON`, `DS.WIZARD.NEXT-BUTTON`)

## Implementation notes

- **`visible=false` unmounts**: The component returns `null` rather than hiding — no DOM is rendered when invisible.
- **Nav buttons are conditional**: Buttons only appear when `onPrevStep`/`onNextStep` are provided. If only `onNextStep` is provided, a `ButtonPlaceholder` renders in place of Back to preserve the flex space-between layout.
- **`navigationInFooter` changes button style**: When `true`, the Back button default type changes from `'ghost'` to `'secondary'`. Overridable via `stepButtonProps`.
- **`headerInlineEdit` replaces `title`**: When `headerInlineEdit` is set, the `title` prop is silently ignored. The `headerAvatar` prop is only rendered when `headerInlineEdit` is also set.
- **`footer` is deprecated**: Use `footerLeft` for left-side footer content. Both work simultaneously but `footer` maps to the same `FooterLeftSide` slot.
- **`WizardOnModal` accesses non-standard `modalProps` keys**: The `prefix`, `infix`, and `suffix` keys on `modalProps` are extra fields used by `WizardOnModal`'s own footer layout — they are not standard `ModalProps` fields.
- **Tests use Jest** (not Vitest): The package has `jest.config.js` and a `"test": "jest"` script — it has not been migrated to Vitest yet.
- **`react-intl` is a peer dependency** (≥3.12.0 ≤6.8) — the component will throw at runtime without an IntlProvider in the tree.
