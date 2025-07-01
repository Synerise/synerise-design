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

| Property        | Description                                             | Type                     | Default |
| --------------- | ------------------------------------------------------- | ------------------------ | ------- |
| stepper         | Stepper component                                       | React.ReactNode          | -       |
| footer          | Content of footer                                       | React.ReactNode          | -       |
| title           | Title of wizard                                         | React.ReactNode \ string | -       |
| headerAction    | Additional button in header                             | React.ReactNode          | -       |
| onClose         | Function called when user clicks on close wizard button | () => void               | -       |
| visible         | Whether wizard is visible                               | boolean                  | false   |
| contentWidth    | Width of content ex: `500px`                            | string                   | `100%`  |
| onPrevStep      | Function called when user clicks on prev step button    | () => void               | -       |
| onNextStep      | Function called when user clicks on next step button    | () => void               | -       |
| stepButtonProps | Custom props for prev/next buttons                      | WizardStepButtons        | -       |
| texts           | Translations object for wizard                          | WizardTexts              | -       |

### WizardTexts

| Property        | Description          | Type                     | Default |
| --------------- | -------------------- | ------------------------ | ------- |
| prevButtonLabel | Label of prev button | React.ReactNode \ String | -       |
| nextButtonLabel | Label of next button | React.ReactNode \ String | -       |

### WizardStepButtons

| Property        | Description          | Type                                  | Default |
| --------------- | -------------------- | ------------------------------------- | ------- |
| prevButtonProps | Props of prev button | Partial<Omit<ButtonProps, 'onClick'>> | -       |
| nextButtonLabel | Props of next button | Partial<Omit<ButtonProps, 'onClick'>> | -       |
