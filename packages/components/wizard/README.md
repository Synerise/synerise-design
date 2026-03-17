---
id: wizard
title: Wizard
---

Wizard UI Component

## Installation

```
npm i @synerise/ds-wizard
or
yarn add @synerise/ds-wizard
```

## Usage

```
import Wizard from '@synerise/ds-wizard'

<Wizard
  visible={true}
  title={'Wizard title'}
  onClose={handleClose}
  headerAction={<Button onClick={() => {}}>Save and skip wizard</Button>}
  onPrevStep={handlePrevStep}
  onNextStep={handleNextStep}
  contentWidth={'588px'}
  texts={{
    prevButtonLabel: 'Back',
    nextButtonLabel: 'Next step',
  }}
  stepper={
    <Stepper>
      ...
    </Stepper>
  }
  stepButtonProps={{
    prevButtonProps: {
      type: 'primary'
    },
    nextButtonProps: {
      type: 'primary',
      disabled: true
    }
  }}
  footer={
    <>
      <Button mode="icon-label" type="ghost" onClick={() => {}}>
        <Icon component={<AcademyM />} /> AI Search Help
      </Button>
    </>
  }
>
  Content
</Wizard>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-wizard--default"></iframe>

## API

| Property           | Description                                             | Type                     | Default |
| ------------------ | ------------------------------------------------------- | ------------------------ | ------- |
| stepper            | Stepper component                                       | React.ReactNode          | -       |
| footer             | **Deprecated.** Left-side footer content (use `footerLeft`) | React.ReactNode      | -       |
| footerLeft         | Left side of the footer bar                             | React.ReactNode          | -       |
| footerAction       | Right side of the footer bar                            | React.ReactNode          | -       |
| title              | Title of wizard (ignored when `headerInlineEdit` is set) | React.ReactNode         | -       |
| headerAction       | Additional button in header                             | React.ReactNode          | -       |
| onClose            | Function called when user clicks on close wizard button | () => void               | -       |
| visible            | Whether wizard is visible                               | boolean                  | false   |
| contentWidth       | Width of content ex: `500px`                            | string                   | `100%`  |
| onPrevStep         | Function called when user clicks on prev step button    | () => void               | -       |
| onNextStep         | Function called when user clicks on next step button    | () => void               | -       |
| stepButtonProps    | Custom props for prev/next buttons                      | WizardStepButtons        | -       |
| texts              | Translations object for wizard                          | WizardTexts              | -       |
| navigationInFooter | Move prev/next buttons to the footer instead of below content | boolean            | -       |
| headerInlineEdit   | Enable inline title editing in the header               | PageHeaderProps['inlineEdit'] | -  |
| headerAvatar       | Avatar shown alongside inline edit in the header        | PageHeaderProps['avatar'] | -      |
| className          | CSS class added to the wizard wrapper                   | string                   | -       |

### WizardTexts

| Property        | Description          | Type                     | Default |
| --------------- | -------------------- | ------------------------ | ------- |
| prevButtonLabel | Label of prev button | React.ReactNode \ String | -       |
| nextButtonLabel | Label of next button | React.ReactNode \ String | -       |

### WizardStepButtons

| Property        | Description          | Type                                  | Default |
| --------------- | -------------------- | ------------------------------------- | ------- |
| prevButtonProps | Props of prev button | Partial<Omit<ButtonProps, 'onClick'>> | -       |
| nextButtonProps | Props of next button | Partial<Omit<ButtonProps, 'onClick'>> | -       |
