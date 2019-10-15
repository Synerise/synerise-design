import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { DSProvider } from '@synerise/ds-core';

import CardTabs from '@synerise/ds-card-tabs';

storiesOf('Components|CardTabs', module)
.add('default', () => (
    <DSProvider code="en_GB">
        <CardTabs />
    </DSProvider>
));