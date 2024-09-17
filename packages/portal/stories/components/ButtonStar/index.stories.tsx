import React from 'react';
import { withState } from '@dump247/storybook-state';
import Button from '@synerise/ds-button';
import { boolean, select } from '@storybook/addon-knobs';
import { typeOptions } from '../Button/index.stories'


const stories = {
  default: withState({ isActive: false })(({ store }) => (
    <Button.Star
        active={boolean('active', undefined) || store.state.isActive}
        type={ select('Set type', typeOptions, 'ghost')}
        disabled={boolean('disabled', undefined)}
        hasError={boolean('hasError', undefined)}
        onClick={() => { store.set({ isActive: !store.state.isActive})}}
    />
  )),
};

export default {
  name: 'Components/Button/ButtonWithSymbols/WithStar',
  stories,
  Component: Button,
};
