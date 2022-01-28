import React from 'react';
import { simpleText } from '../dataset';
import Menu from '@synerise/ds-menu';
import {
  attachKnobsToDataSource,
  getDefaultProps,
  getSuffixElement,
  getSuffixTrigger,
} from '../index.stories';
import Text from '@synerise/ds-menu/dist/Elements/Item/Text/Text';
import InformationCard from '@synerise/ds-information-card'
import { boolean } from '@storybook/addon-knobs';
import { SegmentM, VarTypeBooleanM } from '@synerise/ds-icon';

const withLabel = () => {
  const defaultProps = getDefaultProps();
  let options = [{ text: 'First option' }, ...simpleText]
  if (boolean('Enable overwriting knobs', false)) {
    options = attachKnobsToDataSource(options);
  }
  const props = {
    dataSource: options,
    suffixel: getSuffixElement(),
    suffixVisibilityTrigger: getSuffixTrigger(),
    selectable: false,
    ...defaultProps,
  };
  const {dataSource, ...rest} = props;
  return <div style={{ background: 'rgba(0,0,0,0)', width: '200px' }}>
    <Menu {...props}>
      {props.dataSource.map((item, i) => (
        <Text tooltipProps={{}} theme={{palette: {}}} {...rest} {...item}
          renderInformationCard = {() => <InformationCard title={item.text} subtitle="key" icon={i%2 ? <VarTypeBooleanM/> : <SegmentM/>} iconColor={i%2 ? "mars" : "grey" }/>}
          >{item.text}</Text>
      ))}
    </Menu>
  </div>
};

export default withLabel;
