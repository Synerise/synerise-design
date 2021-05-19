import * as React from 'react';
import CodeArea from '@synerise/ds-code-area';
import { text, boolean, select } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';

const stories = {
  default: withState({
    value: 'Test',
  })(({store}) => {
    const handleOnChange = (value) => {
      store.set({
        value,
      });
    };

    const label = text('Set label', '');
    const description = text('Set description', '');
    const error = boolean('Set error', false);
    const errorText = text('Set error text', 'Error text');
    const tooltip = text('Set tooltip description', 'Full screen');
    const language = select('Select editor language', ['html', 'css', 'javascript'], 'html');

    return (
      <CodeArea
        onChange={handleOnChange}
        value={store.state.value}
        label={label}
        description={description}
        error={error}
        errorText={errorText}
        tooltipText={tooltip}
        language={language}
      />
    )
  }),
  withLabel: withState({
    value: 'Test',
  })(({store}) => {
    const handleOnChange = (value) => {
      store.set({
        value,
      });
    };
    const label = text('Set label', 'Label');
    const description = text('Set description', '');
    const error = boolean('Set error', false);
    const errorText = text('Set error text', 'Error text');
    const tooltip = text('Set tooltip description', 'Full screen');
    const language = select('Select editor language', ['html', 'css', 'javascript'], 'html');

    return (
      <CodeArea
        onChange={handleOnChange}
        value={store.state.value}
        label={label}
        description={description}
        error={error}
        errorText={errorText}
        tooltipText={tooltip}
        language={language}
      />
    )
  }),
  withLabelAndDescription: withState({
    value: 'Test',
  })(({store}) => {
    const handleOnChange = (value) => {
      store.set({
        value,
      });
    };

    const label = text('Set label', 'Label');
    const description = text('Set description', 'Description');
    const error = boolean('Set error', false);
    const errorText = text('Set error text', 'Error text');
    const tooltip = text('Set tooltip description', 'Full screen');
    const language = select('Select editor language', ['html', 'css', 'javascript'], 'html');

    return (
      <CodeArea
        onChange={handleOnChange}
        value={store.state.value}
        label={label}
        description={description}
        error={error}
        errorText={errorText}
        tooltipText={tooltip}
        language={language}
      />
    )
  }),
  withErrorAndDescription: withState({
    value: 'Test',
  })(({store}) => {
    const handleOnChange = (value) => {
      store.set({
        value,
      });
    };

    const label = text('Set label', '');
    const description = text('Set description', 'Description');
    const error = boolean('Set error', true);
    const errorText = text('Set error text', 'Error text');
    const tooltip = text('Set tooltip description', 'Full screen');
    const language = select('Select editor language', ['html', 'css', 'javascript'], 'html');

    return (
      <CodeArea
        onChange={handleOnChange}
        value={store.state.value}
        label={label}
        description={description}
        error={error}
        errorText={errorText}
        tooltipText={tooltip}
        language={language}
      />
    )
  })
};

export default {
name: 'Components/CodeArea',
  config: {},
  stories,
  Component: CodeArea,
}
