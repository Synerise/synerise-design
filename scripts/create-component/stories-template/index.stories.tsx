import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { DSProvider } from '@synerise/ds-core';

import {{componentName}} from '@synerise/ds-{{name}}';

storiesOf('Components|{{componentName}}', module)
.add('default', () => (
    <DSProvider code="en_GB">
        <{{componentName}} />
    </DSProvider>
));