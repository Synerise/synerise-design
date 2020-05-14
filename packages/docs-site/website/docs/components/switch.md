---
id: switch
title: Switch
---

Switch UI Component

Based on [Ant Design Switch](https://ant.design/components/switch/)

## Demo

<iframe src="/storybook-static/iframe.html?id=components-switch--default"></iframe>

## API

### Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| label | switch label | string | -
| errorText | Error message, when provided changes switch style | string | -
| description | Switch description | string | -
| autoFocus | get focus when component mounted | boolean | false
| checked | determine whether the Switch is checked | boolean | false	
| checkedChildren | content to be shown when the state is checked | string&#124;ReactNode | -
| defaultChecked | to set the initial state | boolean | false	
| disabled | Disable switch | boolean | false	
| loading | loading state of switch | boolean | false	
| size | the size of the Switch, options: default small | string | default	
| unCheckedChildren | content to be shown when the state is unchecked | string&#124;ReactNode | -		
| onChange | trigger when the checked state is changing | Function(checked: boolean, event: Event) | -		
| onClick | trigger when clicked | Function(checked: boolean, event: Event) | -
| className | additional class to Switch | string | -

### Methods

| Name | Description |
| --- | --- |
| blur() | remove focus
| focus() | get focus
