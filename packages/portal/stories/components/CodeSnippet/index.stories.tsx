import React from 'react';
import * as he from 'he';
import { text, select, boolean, number} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import CodeSnippet from '@synerise/ds-code-snippet';
import { CodeSnippetType } from '@synerise/ds-code-snippet/dist/CodeSnippet.types';
import Button from '@synerise/ds-button';

const exampleContent =`const registerButton = document.getElementById("registerButton");
const emailInput = document.querySekector(".email-input");
registerButton.addEventListener('click',()=>{
  alert('Invalid data');
  alert(emailInput.value);
  console.log('Something went wrong');
})`

const getPropsMulti = () => ({
  children:text("Content",exampleContent),
  rows:number('Number of lines to be shown before expanded',6),
  tooltipTitleHover:text("Tooltip hint on hover",'Copy'),
  tooltipTitleClick:text("Tooltip hint on click",'Copied!'),
  colorSyntax:boolean('Color syntax',false),
  labelBeforeExpanded:text('Label before expand', 'Show more'),
  labelAfterExpanded:text('Label after expand', 'Show less'),
  wrap:boolean('Wrap text',false),
  timeToHideTooltip:number("Time to hide tooltip(ms)",3000),
  onCopy:action('onCopy action'),
  onExpand:action('onExpand action'),
  renderButton:boolean('render button',false),
});

const getPropsSingle = () => ({
  children:text("Content","Some code text style"),
  tooltipTitleHover:text("Tooltip hint on hover",'Copy'),
  tooltipTitleClick:text("Tooltip hint on click",'Copied!'),
  fontSize: select('Set size', fontSizeOptions, fontSizeOptions.small),
  onCopy:action('onCopy action'),
  renderButton:boolean('render button',false),
});

const getPropsInline = () => ({
  children:text("Content","Some code text style")
});

const fontSizeOptions = {
  small:12,
  medium:14,
};


const stories = {
    inline: () => {
      const defaultProps = getPropsInline();
      const props = {
        ...defaultProps
      } as object;
      return (
        <div>
          <CodeSnippet {...props}/>
        </div>
      );
    },
    'single-line': () => {
      const defaultProps = getPropsSingle();
      const props = {
        ...defaultProps
      } as object;
      return (
        <div>
        <CodeSnippet customTriggerComponent={props.renderButton ? <Button type={'custom-color'} color="green">Copy code</Button> : null} type={CodeSnippetType.SINGLE_LINE} {...props}/>
      </div>
    );
  },
  'multi-line': () => {
    const defaultProps = getPropsMulti();
    const props = {
      ...defaultProps,
      children:he.decode(defaultProps.children),
      languages:['javascript','typescript','json']
    } as object;
    return (
      <div style={{maxWidth:'600px'}}>
        <CodeSnippet customTriggerComponent={props.renderButton ? <Button type={'custom-color'} color="green">Copy code</Button> : null} type={CodeSnippetType.MULTI_LINE} {...props} />
      </div>
    );
  },
};
  
export default {
  name: 'Components/CodeSnippet',
  config: {},
  stories,
  Component: CodeSnippet,
}
