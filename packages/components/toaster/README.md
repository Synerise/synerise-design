---
id: toaster
title: Toaster
---

Toaster UI Component

## Installation
```
npm i @synerise/ds-toaster
or
yarn add @synerise/ds-toaster
```

## Usage

Toaster is by default rendered inside DSProvider. 
There should only be a single <Toaster /> rendered in your application. 
If you wish to opt out of rendering the default Toaster then pass `false` as toasterProps to `DSProvider` and render the Toaster wherever in your app is suitable.

```
import Toaster from '@synerise/ds-toaster'

const MyCustomisedToaster = () => {

    return <Toaster containerStyle={{ position: 'static'}} />
}

<DSProvider toasterProps={false}>
    {children}
    <MyCustomisedToaster />
</DSProvider>

```

To change Toaster props from within your application you can use the useToaster hook
```
import { useToaster } from '@synerise/ds-toaster';

const { setOptions } = useToaster();
setOptions({ position: 'top-center'});

```


## Demo

<iframe src="/storybook-static/iframe.html?id=components-toaster--default"></iframe>

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
