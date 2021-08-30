import * as React from 'react';
import * as he from 'he';
import { text, select, boolean, number} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import CodeSnippet from '@synerise/ds-code-snippet';

const tempJson2 = `{SR.event.track("Add to favourites", {SR.event.track("Add to favourites", {SR.event.track("Add to favourites", {SR.event.track("Add to favourites", {
  SR.event.track("Add to favourites", {
    "eventLabel": "homePageFav",
    "name": "iPhone XR 128GB",}}`
 
const getPropsMulti = () => ({
  children:text("Content",tempJson2),
  rows:number('Number of lines to be shown before expanded',6),
  tooltipHint:text("Tooltip hint",'Copy'),
  colorSynatax:boolean('Color syntax',false),
  labelBeforeExpanded:text('Label before expand', 'Show more'),
  labelAfterExpanded:text('Label after expand', 'Show less'),
  wrap:boolean('Wrap text',false),
  onButtonClick: action('onClick Button CLICK'),
  onIconClick: action('onClick ICON CLICK'),
});
const getPropsSingle = () => ({
  children:text("Content","Some code text style"),
  tooltipHint:text("Tooltip hint",'Copy'),
  fontSize: select('Set size', fontSizeOptions, fontSizeOptions.small),
  onIconClick: action('onClick ICON CLICK')
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
          <CodeSnippet type="inline" {...props}/>
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
        <CodeSnippet type="single-line" {...props}/>
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
        <CodeSnippet type="multi-line" {...props} />
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
