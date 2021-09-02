import * as React from 'react';
import * as he from 'he';
import { text, select, boolean, number} from '@storybook/addon-knobs';
import CodeSnippet from '@synerise/ds-code-snippet';
import { CodeSnippetType } from '@synerise/ds-code-snippet/dist/CodeSnippet.types';

const tempJson2 = `{SR.event.track("Add to favourites", {SR.event.track("Add to favourites", {SR.event.track("Add to favourites", {SR.event.track("Add to favourites", {
  SR.event.track("Add to favourites", {
    "eventLabel": "homePageFav",
    "name": "iPhone XR 128GB",}}`
 
const getPropsMulti = () => ({
  children:text("Content",tempJson2),
  rows:number('Number of lines to be shown before expanded',6),
  tooltipTitleHover:text("Tooltip hint on hover",'Copy'),
  tooltipTitleClick:text("Tooltip hint on click",'Copied!'),
  colorSyntax:boolean('Color syntax',false),
  labelBeforeExpanded:text('Label before expand', 'Show more'),
  labelAfterExpanded:text('Label after expand', 'Show less'),
  wrap:boolean('Wrap text',false)
});
const getPropsSingle = () => ({
  children:text("Content","Some code text style"),
  tooltipTitleHover:text("Tooltip hint on hover",'Copy'),
  tooltipTitleClick:text("Tooltip hint on click",'Copied!'),
  fontSize: select('Set size', fontSizeOptions, fontSizeOptions.small),
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
        <CodeSnippet type={CodeSnippetType.SINGLE_LINE} {...props}/>
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
        <CodeSnippet type={CodeSnippetType.MULTI_LINE} {...props} />
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
