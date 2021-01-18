import * as React from 'react';

import StepCard from '@synerise/ds-step-card';
import Button from '@synerise/ds-button';

const stories = {
  default: () => {
    const [matching, setMatching] = React.useState(false);
    const [name, setName] = React.useState('funnel');
    return (
      <StepCard
        matching={matching}
        onChangeMatching={setMatching}
        name={name}
        onChangeName={setName}
        footer={
          <>
            <Button type={'secondary'}>Button 1</Button>
            <Button type={'secondary'}>Button 2</Button>
          </>
        }
      >
        <div>Content</div>
      </StepCard>
    );
  },
};

export default {
  name: 'Components/StepCard',
  config: {},
  stories,
  Component: StepCard,
};
