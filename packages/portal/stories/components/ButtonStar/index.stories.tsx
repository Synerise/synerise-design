import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
import Button from '@synerise/ds-button';
import { boolean } from '@storybook/addon-knobs';

const stories = {
  default: withState({ isActive: false })(({ store }) => (
    <Button.Star
        active={boolean('active', undefined) || store.state.isActive}
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
