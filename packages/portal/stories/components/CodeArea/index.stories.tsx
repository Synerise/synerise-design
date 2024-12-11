import React from 'react';
import { boolean, number, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import CodeArea from '@synerise/ds-code-area';
import markdown from '@/code-area/README.md';
import Alert from '@synerise/ds-alert';
import Switch from '@synerise/ds-switch';
import Button from '@synerise/ds-button';
import Icon, { Add3M } from '@synerise/ds-icon';
import { withState } from '@dump247/storybook-state';

const decorator = storyFn => <div style={{ width: '588px' }}>{storyFn()}</div>;

type Props = {
  isFullscreen?: boolean;
  count?: number;
  isValid?: boolean;
};

const languages = ['json' , 'javascript' , 'css' , 'html'] as const;
type AvailableSyntaxes = typeof languages[number];

const stories = {
  default: withState({
    content: '',
    syntax: languages[1]
  })(({ store }) => {
    const handleChange = (newContent) => {
      store.set({
        content: newContent,
      });
    };

    const handleChangeSyntax = (newSyntax) => {
      store.set({
        syntax: newSyntax,
      });
    };
    
    const renderAdditionalDescription = boolean('Render syntax validation?', true) ? ({ isValid }: Props) => (
      isValid ? 
      <Alert.InlineAlert type="success" message="Valid Syntax" /> :
      <Alert.InlineAlert type="alert" message="Invalid Syntax" /> 
    ) : undefined

    const renderFooterContent = boolean('Render custom footer content?', true) ? (_props: Props) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Switch
          label="Code Preview"
          defaultChecked
        />
        <Button type="ghost-primary" mode="icon-label" icon={<Icon component={<Add3M />} />}>
          Insert
        </Button>
      </div>
    ) : undefined

    const isCounterEnabled = boolean('Show counter?', true);
    let counterProp;
    if (isCounterEnabled) {
      counterProp = {
        limit: number('Counter limit', 500),
        placement: select('Counter placement', ['bottom', 'top'], 'top')
      }
    }
    
    const isTooltipEnabled = boolean('With tooltip?', true);
    const tooltip = isTooltipEnabled ? text('Tooltip text', 'Tooltip text') : undefined
    
    const availableSyntaxes = languages.map( (language: AvailableSyntaxes) => ({
      language,
      label: language === 'javascript' ? 'Javascript' : language.toUpperCase()
    }));
    
    const syntaxSelection = boolean('Show multiple syntaxes?', true);

    return (
        <CodeArea
          value={store.state.content}
          defaultValue="// Enter code"
          onChange={ (updatedContent) => { action('onChange')(updatedContent); handleChange(updatedContent)} }
          label={text('Label', 'Label')}
          tooltip={tooltip}
          readOnly={boolean('readOnly', false)}
          description={text('Description', 'Description')}
          texts={{
            fullscreen: 'Fullscreen mode',
          }}
          counter={counterProp}
          errorText={text('Error message', '')}
          syntaxOptions={syntaxSelection ? availableSyntaxes : [ availableSyntaxes[1] ]}
          currentSyntax={store.state.syntax}
          onSyntaxChange={(newSyntax) => {action('onSyntaxChange')(newSyntax); handleChangeSyntax(newSyntax) } }
          renderFooterContent={renderFooterContent}
          renderAdditionalDescription={renderAdditionalDescription}
          allowFullscreen={boolean('Allow fullscreen? ', true)}
        />
    );
  }),
};

export default {
  name: 'Components/CodeArea',
  stories,
  decorator,
  config: {
    notes: {
      markdown,
    },
  },
  component: CodeArea,
};
