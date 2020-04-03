# DS Button


```js noeditor
import {version} from './../package.json';
    `v. ${version}`
```
![Avatar](button/avatar.png)

```
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
<div>
    <Button mode="split" type="custom-color" color="green">
        Click
        <Icon component={<AngleDownS />} />
    </Button>
</div>
```
